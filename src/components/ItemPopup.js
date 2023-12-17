import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Input,
    ModalClose,
    Typography,
} from '@mui/joy';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import Loading from './Loading';

function ItemPopup({ onClose }) {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const [types, setTypes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [itemNote, setItemNote] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    useEffect(() => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .get('/item/type')
                .then(function (res) {
                    if (res.data) {
                        setTypes(res.data);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    }, [api]);

    const addItem = () => {
        if (api !== null && selectedItem !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .put('/user/list/' + shoppingListsPrefs.selectedId + '/item/create', {
                    type_id: selectedItem.id,
                    note: itemNote === '' ? 'Bez popisu' : itemNote,
                    quantity: itemQuantity,
                })
                .then(function (res) {
                    if (res.data) {
                        console.log(res.data);
                        console.log(itemNote);
                        onClose();
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };
    const cardStyle = {
        variant: 'plain',
        color: 'primary',
    };

    if (types.length === 0) {
        return (
            <Card {...cardStyle}>
                <CardContent>
                    <Loading />
                </CardContent>
            </Card>
        );
    }
    const selectTypes = [];

    for (const type of types) {
        selectTypes.push({
            label: type.name,
            id: type.id,
        });
    }

    selectTypes.sort((a, b) => (a.label > b.label ? 1 : -1));

    return (
        <Card {...cardStyle}>
            <Typography level="title-lg">Přidat položku</Typography>
            <ModalClose variant="plain" />
            <Divider inset="none" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <FormControl>
                            <FormLabel>Název položky</FormLabel>
                            <Autocomplete
                                options={selectTypes}
                                placeholder="Název položky"
                                onChange={(event, newValue) => {
                                    setSelectedItem(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Popis položky</FormLabel>
                            <Input
                                placeholder="Popis položky"
                                value={itemNote}
                                onChange={(event) => setItemNote(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <FormControl>
                            <FormLabel>Počet položky</FormLabel>
                            <Input
                                placeholder="Počet položky"
                                type="number"
                                value={itemQuantity}
                                onChange={(event) => setItemQuantity(event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <CardActions>
                    <Button variant="solid" color="primary" onClick={addItem}>
                        Přidat
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default ItemPopup;
