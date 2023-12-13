import { Box, Divider, Grid, Stack, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import ItemAdd from './ItemAdd';
import ItemCard from './ItemCard';
import ShoppingListName from './ShoppingListName';

function ShoppingListDisplay() {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    const [items, setItems] = useState(null);
    const [checkedItems, setCheckedItems] = useState(null);

    const refreshItems = () => {
        if (api === null || !isSelectedShoppingList) return;
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .get('/user/list/' + shoppingListsPrefs.selectedId + '/item')
            .then(function (res) {
                if (res.data) {
                    const allItems = res.data;

                    const items = allItems.filter((item) => !item.checked);
                    const checkedItems = allItems.filter((item) => item.checked);
                    setItems(items);
                    setCheckedItems(checkedItems);
                    //console.log(res.data);
                }
            })
            .catch((error) => {
                api.apiFailed(error);
            });
    };

    useEffect(() => {
        refreshItems();
    }, [api, shoppingListsPrefs.selected]);

    if (items === null || checkedItems === null) {
        setItems([]);
        setCheckedItems([]);
        refreshItems();
        return <Typography textAlign="center">Načítání položek...</Typography>;
    }

    const domItems = items.map((item, index) => {
        return (
            <Grid key={item.id ?? index} xs={12} md={6}>
                <ItemCard refreshItems={refreshItems} item={item}></ItemCard>
            </Grid>
        );
    });

    const domCheckedItems = checkedItems.map((item, index) => {
        return (
            <Grid key={item.id ?? index} xs={12} md={6}>
                <ItemCard refreshItems={refreshItems} item={item}></ItemCard>
            </Grid>
        );
    });

    let itemsDisplay = [null, null, null]; // first is unchecked items, second is checked items
    if (isSelectedShoppingList) {
        if (items.length + checkedItems.length === 0) {
            itemsDisplay[0] = <Typography textAlign="center">Nejsou zde žádné položky</Typography>;
            itemsDisplay[1] = null;
            itemsDisplay[2] = null;
        } else {
            if (items.length === 0) itemsDisplay[0] = null;
            else
                itemsDisplay[0] = (
                    <Grid container spacing={2}>
                        {domItems}
                    </Grid>
                );

            if (items.length === 0 || checkedItems.length === 0) itemsDisplay[1] = null;
            else
                itemsDisplay[1] = (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Divider sx={{ width: '70%' }} />
                    </Box>
                );

            if (checkedItems.length === 0) itemsDisplay[2] = null;
            else
                itemsDisplay[2] = (
                    <Grid container spacing={2}>
                        {domCheckedItems}
                    </Grid>
                );
        }
    }

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                paddingX={2}
                alignContent={'center'}
                justifyContent={'center'}
            >
                <ShoppingListName />
                <ItemAdd refreshItems={refreshItems} />
            </Stack>
            {itemsDisplay[0]}
            {itemsDisplay[1]}
            {itemsDisplay[2]}
        </>
    );
}

export default ShoppingListDisplay;
