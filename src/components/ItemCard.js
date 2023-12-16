import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import Loading from './Loading';

function ItemCard({ item, refreshItems }) {
    const { api, apiSession } = useApi();
    const [itemType, setItemType] = useState(null);
    const { shoppingListsPrefs } = usePreferences();
    const [open, setOpen] = useState(false);

    const onCheckboxToggled = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .put(
                    '/user/list/' + shoppingListsPrefs.selectedId + '/item/' + item.id + '/update',
                    {
                        checked: !item.checked,
                    }
                )
                .then(function (res) {
                    if (res.status === 201) {
                        refreshItems();
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };

    useEffect(() => {
        if (api !== null && item !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .get('/item/type/' + item.item_type_id)
                .then(function (res) {
                    if (res.data) {
                        setItemType(res.data);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    }, [api]);

    const updateItemSubtract = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .put(
                    '/user/list/' + shoppingListsPrefs.selectedId + '/item/' + item.id + '/update',
                    {
                        delta_quantity: -1,
                    }
                )
                .then(function (res) {
                    if (res.data) {
                        refreshItems();
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };

    const updateItemAdd = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .put(
                    '/user/list/' + shoppingListsPrefs.selectedId + '/item/' + item.id + '/update',
                    {
                        delta_quantity: +1,
                    }
                )
                .then(function (res) {
                    if (res.data) {
                        refreshItems();
                        console.log(res.data);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };

    const openWebsite = () => {
        setOpen(false);
        window.open(
            'https://www.google.com/search?q=' +
                itemType.name +
                ' ' +
                item.note +
                '&tbm=shop&hl=cs',
            '_blank'
        );
    };

    const cardStyle = {
        variant: item.checked ? 'soft' : 'outlined',
        color: 'neutral',
    };

    if (itemType === null) {
        return (
            <Card {...cardStyle}>
                <CardContent>
                    <Loading />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card {...cardStyle}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={item.checked}
                                    onChange={onCheckboxToggled}
                                    size="lg"
                                    color="neutral"
                                    variant="outlined"
                                />
                            </Box>
                            <Stack direction="column" justifyContent="flex-start">
                                <Typography level="title-md">
                                    <Link overlay></Link>
                                    <Link underline="none" onClick={() => setOpen(true)}>
                                        {itemType.name}
                                    </Link>
                                </Typography>
                                <Typography level="body-sm">{item.note}</Typography>
                            </Stack>
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
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Upozornění
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Opravdu chcete otevřít webovou stránku s produktem?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" onClick={openWebsite}>
                            Pokračovat
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Zrušit
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default ItemCard;
