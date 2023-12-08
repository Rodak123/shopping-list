import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import Loading from './Loading';

function ItemCard({ item }) {
    const { api } = useApi();
    const [itemType, setItemType] = useState(null);

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
                    <Stack direction="row" justifyContent="flex-end">
                        <IconButton variant="solid">
                            <FavoriteBorder />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ItemCard;
