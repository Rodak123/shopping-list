import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ItemCard({ item }) {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const [itemType, setItemType] = useState(null);

    useEffect(() => {
        if (api !== null) {
            axios.get(api.url + '/item/type/' + item.item_type_id).then(function (res) {
                if (res.data) {
                    setItemType(res.data);
                }
            });
        }
    }, [api]);

    if (itemType === null) {
        return <Typography>Načítání typu položky...</Typography>;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-md">{itemType.name}</Typography>
                <Typography>{item.note}</Typography>
            </CardContent>
        </Card>
    );
}

export default ItemCard;
