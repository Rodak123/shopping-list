import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    List,
    ListItemButton,
    ModalClose,
    Stack,
    Typography,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import { usePreferences } from '../../contexts/PreferencesContext';
import Loading from '../Loading';
import AccountDisplay from './AccountDisplay';

function SidebarContent({ setOpen }) {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs, userPrefs } = usePreferences();

    const [shoppingLists, setShoppingLists] = useState([]);

    const user = userPrefs.user;

    useEffect(() => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .get('/user/list')
                .then(function (res) {
                    if (res.data) {
                        setShoppingLists(res.data);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    }, [api, shoppingListsPrefs.selected, apiSession]);

    if (user === null) {
        return (
            <Stack
                sx={{ minHeight: '100%', minWidth: '100%' }}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Loading />
                <Typography textAlign="center">Načítání...</Typography>
            </Stack>
        );
    }

    const addNewList = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance
                .put('/user/list/create', {
                    name: 'Nový List ' + (shoppingLists.length + 1),
                })
                .then(function (res) {
                    if (res.data) {
                        setShoppingLists([...shoppingLists, res.data]);
                        selectShoppingList(res.data.id);
                    }
                })
                .catch((error) => {
                    api.apiFailed(error);
                });
        }
    };

    const selectShoppingList = (id) => {
        shoppingListsPrefs.setSelectedId(id);
        setOpen(false);
    };

    const selectedList = shoppingListsPrefs.selectedId;
    const shoppingListsDom = shoppingLists.map((shoppingList) => {
        return (
            <ListItemButton
                key={shoppingList.id}
                sx={{ fontWeight: shoppingList.id === selectedList ? 'bold' : 'normal' }}
                onClick={() => selectShoppingList(shoppingList.id)}
            >
                {shoppingList.name}
            </ListItemButton>
        );
    });

    return (
        <>
            <DialogTitle sx={{ mb: '12px' }}>
                <ModalClose />
                Nákupní listy
            </DialogTitle>
            <DialogContent>
                <Button
                    onClick={addNewList}
                    variant="solid"
                    size="md"
                    sx={{
                        borderRadius: '0',
                    }}
                >
                    Nový list
                </Button>
                <List
                    size="lg"
                    component="nav"
                    sx={{
                        flex: 'none',
                        fontSize: 'xl',
                        '& > div': { justifyContent: 'left' },
                    }}
                >
                    {shoppingListsDom}
                    {shoppingLists.length === 0 && (
                        <ListItemButton>Žádné nákupní listy</ListItemButton>
                    )}
                </List>
            </DialogContent>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    alignItems: 'center',
                }}
            >
                <AccountDisplay user={user} />
            </Box>
        </>
    );
}

export default SidebarContent;
