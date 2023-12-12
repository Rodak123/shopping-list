import { Grid, Stack, Typography } from '@mui/joy';
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

    const refreshItems = () => {
        if (api === null || !isSelectedShoppingList) return;
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .get('/user/' + api.id + '/list/' + shoppingListsPrefs.selectedId + '/item')
            .then(function (res) {
                if (res.data) {
                    setItems(res.data);
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

    if (items === null) {
        setItems([]);
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

    let itemsDisplay = null;
    if (isSelectedShoppingList) {
        if (items.length === 0) {
            itemsDisplay = <Typography textAlign="center">Nejsou zde žádné položky</Typography>;
        } else {
            itemsDisplay = (
                <Grid container spacing={2}>
                    {domItems}
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
            {itemsDisplay}
        </>
    );
}

export default ShoppingListDisplay;
