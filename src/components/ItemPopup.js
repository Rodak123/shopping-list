import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
    Add,
    HdrPlusOutlined,
    PlusOneOutlined,
    ShoppingBagOutlined,
    ShoppingBasketOutlined,
} from '@mui/icons-material';
import Autocomplete from '@mui/joy/Autocomplete';
import ModalClose from '@mui/joy/ModalClose';
import { useApi } from '../contexts/ApiContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { usePreferences } from '../contexts/PreferencesContext';
import Loading from './Loading';

function ItemPopup({ onClose }) {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const [types, setTypes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemNote, setItemNote] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    useEffect(() => {
        if (api !== null) {
            axios.get(api.url + '/item/type').then(function (res) {
                if (res.data) {
                    setTypes(res.data);
                }
            });
        }
    }, [api]);

    const addItem = () => {
        if (api !== null && selectedItem !== null) {
            axios
                .put(
                    api.url +
                        '/user/' +
                        api.id +
                        '/list/' +
                        shoppingListsPrefs.selectedId +
                        '/item/create',
                    {
                        type_id: selectedItem.id,
                        note: itemNote,
                        quantity: itemQuantity,
                    }
                )
                .then(function (res) {
                    if (res.data) {
                        console.log(res.data);
                        onClose();
                    }
                });
        }
    };

    const cardStyle = {
        variant: 'outlined',
        sx: {
            maxHeight: 'max-content',
            maxWidth: '100%',
            margin: '0 !important',
            mx: 'auto',
            overflow: 'hidden',
        },
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
            <ModalClose variant="plain" sx={{ m: 0 }} />
            <Divider inset="none" />
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
            >
                <FormControl sx={{ gridColumn: '1/-1' }}>
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
                <Stack direction="row" spacing={1} sx={{ gridColumn: '1/-1' }}>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Popis položky</FormLabel>
                        <Input
                            placeholder="Popis položky"
                            value={itemNote}
                            onChange={(event) => setItemNote(event.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Počet položky</FormLabel>
                        <Input
                            placeholder="Počet položky"
                            type="number"
                            value={itemQuantity}
                            onChange={(event) => setItemQuantity(event.target.value)}
                        />
                    </FormControl>
                </Stack>
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary" onClick={addItem}>
                        Přidat
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default ItemPopup;
