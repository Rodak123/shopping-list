import ShoppingListName from './ShoppingListName';
import ItemAdd from './ItemAdd';
import { Stack, Typography } from '@mui/joy';
import ItemCard from './ItemCard';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ShoppingListDisplay() {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;
    const [items, setItems] = useState(null);

    const refreshItems = () => {
        if (api === null || !isSelectedShoppingList) return;
        axios
            .get(api.url + '/user/' + api.id + '/list/' + shoppingListsPrefs.selectedId + '/item')
            .then(function (res) {
                if (res.data) {
                    setItems(res.data);
                    //console.log(res.data);
                }
            });
    };

    useEffect(() => {
        refreshItems();
    }, [api, shoppingListsPrefs.selected]);

    if (items === null) {
        setItems([]);
        refreshItems();
        return <Typography textAlign="center">Načítání položek...</Typography>;
    }

    const domItems = items.map((item, index) => {
        return <ItemCard key={item.id ?? index} item={item}></ItemCard>;
    });

    let itemsDisplay = null;
    if (isSelectedShoppingList) {
        if (items.length === 0) {
            itemsDisplay = <Typography textAlign="center">Nejsou zde žádné položky</Typography>;
        } else {
            itemsDisplay = (
                <Stack
                    direction={'row'}
                    alignItems={'start'}
                    justifyContent={'center'}
                    spacing={2}
                    paddingX={2}
                >
                    {domItems.length > 1 && (
                        <Stack flexGrow={1} direction={'column'} spacing={2}>
                            {domItems.slice(0, domItems.length / 2)}
                        </Stack>
                    )}
                    <Stack flexGrow={1} direction={'column'} spacing={2}>
                        {domItems.slice(domItems.length / 2)}
                    </Stack>
                </Stack>
            );
        }
    }

    return (
        <>
            <Stack direction="row" spacing={2} alignContent={'center'} justifyContent={'center'}>
                <ShoppingListName />
                <ItemAdd refreshItems={refreshItems} />
            </Stack>
            {itemsDisplay}
        </>
    );
}

export default ShoppingListDisplay;
