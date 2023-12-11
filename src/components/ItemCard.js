import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import Loading from './Loading';

function ItemCard({ item, refreshItems }) {
    const { api } = useApi();
    const [itemType, setItemType] = useState(null);
    const { shoppingListsPrefs } = usePreferences();

    useEffect(() => {
        if (api !== null && item !== null) {
            const apiInstance = api.createApiInstance();
            apiInstance.get('/item/type/' + item.item_type_id).then(function (res) {
                if (res.data) {
                    setItemType(res.data);
                }
            });
        }
    }, [api]);

    const updateItemSubtract = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance();
            apiInstance
                .put(
                    '/user/' +
                        api.id +
                        '/list/' +
                        shoppingListsPrefs.selectedId +
                        '/item/' +
                        item.id +
                        '/update',
                    {
                        delta_quantity: -1,
                    }
                )
                .then(function (res) {
                    if (res.data) {
                        refreshItems();
                        console.log(res.data);
                    }
                });
        }
    };

    const updateItemAdd = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance();
            apiInstance
                .put(
                    '/user/' +
                        api.id +
                        '/list/' +
                        shoppingListsPrefs.selectedId +
                        '/item/' +
                        item.id +
                        '/update',
                    {
                        delta_quantity: +1,
                    }
                )
                .then(function (res) {
                    if (res.data) {
                        refreshItems();
                        console.log(res.data);
                    }
                });
        }
    };

    if (itemType === null) {
        return (
            <Card variant="outlined">
                <CardContent>
                    <Loading />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="flex-start">
                        <Typography level="title-md">{itemType.name}</Typography>
                        <Typography level="body-sm">{item.note}</Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button size="sm" variant="soft" onClick={updateItemSubtract}>
                            <RemoveIcon />
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography level="h5">{item.quantity}</Typography>
                        </Box>
                        <Button size="sm" variant="soft" onClick={updateItemAdd}>
                            <Add />
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ItemCard;
