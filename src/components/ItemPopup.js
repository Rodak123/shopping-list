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

function ItemPopup() {
    const { api } = useApi();
    const [types, setTypes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
            // axios
            //     .put(api.url + '/item/create', {
            //         name: selectedItem,
            //         description: 'Popis nové položky',
            //         type: 1,
            //     })
            //     .then(function (res) {
            //         if (res.data) {
            //             console.log(res.data);
            //         }
            //     });
        }
    };
    console.log(selectedItem);
    if (types.length === 0) {
        return <Typography>Načítání typů...</Typography>;
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
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                margin: '0 !important',
                mx: 'auto',
                overflow: 'hidden',
            }}
        >
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
                    />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                    <FormLabel>Popis položky</FormLabel>
                    <Input placeholder="Popis položky" />
                </FormControl>
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
