import InfoOutlined from '@mui/icons-material/InfoOutlined';
import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormHelperText,
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

function ItemAddPopup({ onClose }) {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const [types, setTypes] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [options, setOptions] = useState([]);
    const [itemNote, setItemNote] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);
    const [error, setError] = useState(null);

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
    }, [api, apiSession]);

    useEffect(() => {
        if (api === null) return;
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .get('/user/type_used')
            .then((res) => {
                if (res.data) {
                    setUserTypes(res.data);
                }
            })
            .catch((error) => {
                api.apiFailed(error);
            });
    }, [api, apiSession]);

    const addItem = () => {
        setError(null);
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
                        onClose();
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                    if (error.response.status === 422) {
                        switch (error.response.data.field) {
                            case 'quantity':
                                setError('Počet nesmí být menší než 1');
                                break;
                            default:
                                setError('Nepodařilo se přidat položku');
                                break;
                        }
                    }
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

    let userFavoriteTypes = [];
    for (const type of userTypes) {
        userFavoriteTypes.push({
            id: type.item_type_id,
            count: type.count_used,
        });
    }
    userFavoriteTypes.sort((a, b) => (a.count > b.count ? 1 : -1));
    userFavoriteTypes = userFavoriteTypes.slice(0, 5);

    for (let i = selectTypes.length - 1; i >= 0; i--) {
        const type = selectTypes[i];
        for (const favType of userFavoriteTypes) {
            if (type.id === favType.id) {
                favType.label = type.label;
                selectTypes.splice(i, 1);
            }
        }
    }

    selectTypes.sort((a, b) => (a.label > b.label ? 1 : -1));

    const typesByFirstLetter = {};
    for (const type of selectTypes) {
        const firstLetter = type.label.charAt(0).toLowerCase();
        if (!typesByFirstLetter[firstLetter]) {
            typesByFirstLetter[firstLetter] = [];
        }
        typesByFirstLetter[firstLetter].push(type);
    }
    const inputChange = (event, value) => {
        const firstLetter = value.charAt(0).toLowerCase();
        if (firstLetter == '*') {
            const newOptions = selectTypes;
            setOptions(newOptions);
            console.log(options);
            return;
        } else {
            const newOptions = typesByFirstLetter[firstLetter] || [];
            setOptions(newOptions);
        }
    };

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
                                autoFocus
                                options={options}
                                placeholder="Název položky"
                                groupBy={(options) =>
                                    options.count ? 'Nedávno přidané' : 'Všechny položky'
                                }
                                onInputChange={(event, newValue) => {
                                    inputChange(event, newValue);
                                }}
                                onChange={(event, newValue) => {
                                    setSelectedItem(newValue);
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === '*' || option.id === value.id
                                }
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
                        <FormControl error={error !== null}>
                            <FormLabel>Počet položky</FormLabel>
                            <Input
                                placeholder="Počet položky"
                                type="number"
                                value={itemQuantity}
                                onChange={(event) => setItemQuantity(event.target.value)}
                                min={1}
                            />
                            {error && (
                                <FormHelperText color="danger">
                                    <InfoOutlined />
                                    {error}
                                </FormHelperText>
                            )}
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

export default ItemAddPopup;
