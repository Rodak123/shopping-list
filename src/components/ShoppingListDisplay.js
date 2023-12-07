import ShoppingListName from './ShoppingListName';
import ItemAdd from './ItemAdd';
import { Stack, Typography } from '@mui/joy';
import CardDemo from './CardDemo';
import ItemCard from './ItemCard';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ShoppingListDisplay() {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    useEffect(() => {
        if (api !== null && isSelectedShoppingList) {
            axios
                .get(
                    api.url + '/user/' + api.id + '/list/' + shoppingListsPrefs.selectedId + '/item'
                )
                .then(function (res) {
                    if (res.data) {
                        setItems(res.data);
                        console.log(res.data);
                    }
                });
        }
    }, [api, shoppingListsPrefs.selectedId]);

    const [items, setItems] = useState([]);
    const domItems = items.map((item) => {
        return <ItemCard item={item}></ItemCard>;
    });

    if (isSelectedShoppingList === false) {
        return <Typography>Není vybraný žádny nákupní list</Typography>;
    }

    if (items.length === 0) {
        return <Typography>Nejsou zde žádné položky, přidejte nějaké</Typography>;
    }

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
            <Stack direction={'column'}>{domItems.slice(0, domItems.length / 2)}</Stack>
            <Stack direction={'column'}>{domItems.slice(domItems.length / 2)}</Stack>
        </Stack>
    );
}

export default ShoppingListDisplay;
