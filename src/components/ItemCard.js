import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { Button } from '@mui/joy';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { useApi } from '../contexts/ApiContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/joy/IconButton';
import Switch from '@mui/joy/Switch';

function ItemCard({ item }) {
    const { api } = useApi();
    const [itemType, setItemType] = useState(null);

    useEffect(() => {
        if (api !== null && item !== null) {
            axios.get(api.url + '/item/type/' + item.item_type_id).then(function (res) {
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
                <Typography level="title-md">{itemType.name}</Typography>
                <Typography level="body-sm">{item.note}</Typography>
                <IconButton variant="solid">
                    <FavoriteBorder />
                </IconButton>
            </CardContent>
        </Card>
    );
}

export default ItemCard;
