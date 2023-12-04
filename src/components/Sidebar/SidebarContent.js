import {
    Box,
    List,
    ListItemButton,
    Button,
    Typography,
    ModalClose,
    DialogTitle,
    DialogContent,
    Avatar,
    Stack,
} from '@mui/joy';
import { usePreferences } from '../../contexts/PreferencesContext';
import DateFormatter from '../DateFormatter';
import { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import axios from 'axios';

function SidebarContent({ setOpen }) {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();
    const [user, setUser] = useState(null);
    const [shoppingLists, setShoppingLists] = useState([]);

    useEffect(() => {
        if (api !== null) {
            axios.get(api.url + '/user/' + api.id).then(function (res) {
                if (res.data) {
                    setUser(res.data);
                }
            });

            axios.get(api.url + '/user/' + api.id + '/list').then(function (res) {
                if (res.data) {
                    setShoppingLists(res.data);
                }
            });
        }
    }, [api]);

    if (user === null) {
        return <Typography>Loading...</Typography>;
    }

    const addNewList = () => {
        if (api !== null) {
            axios
                .put(api.url + '/user/' + api.id + '/list/create', {
                    name: 'Nový List ' + (shoppingLists.length + 1),
                })
                .then(function (res) {
                    if (res.data) {
                        setShoppingLists([...shoppingLists, res.data]);
                        selectShoppingList(shoppingLists.length + 1);
                    }
                });
        }
    };

    const selectShoppingList = (id) => {
        shoppingListsPrefs.setSelectedId(id);
        setOpen(false);
    };

    const username = user.user_name;
    const dateJoined = user.createdAt;

    const selectedList = shoppingListsPrefs.selectedId;
    const shoppingListsDom = shoppingLists.map((shoppingList) => {
        return (
            <ListItemButton
                key={shoppingList.id}
                sx={{ fontWeight: shoppingList.id == selectedList ? 'bold' : 'normal' }}
                onClick={() => selectShoppingList(shoppingList.id)}
            >
                {shoppingList.name}
            </ListItemButton>
        );
    });

    return (
        <>
            <DialogTitle>
                <ModalClose size="lg" />
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
                    {shoppingLists.length == 0 && (
                        <ListItemButton>Žádné nákupní listy</ListItemButton>
                    )}
                </List>
            </DialogContent>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: 1.5,
                    pb: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar size="lg" />
                <Stack
                    flexGrow="1"
                    direction="row"
                    justifyContent="space-between"
                    useFlexGap
                    spacing={1}
                >
                    <div>
                        <Typography level="title-md">{username}</Typography>
                        <Typography level="body-sm">
                            od <DateFormatter date={dateJoined} />
                        </Typography>
                    </div>
                    <Button variant="outlined">Odhlasit se </Button>
                </Stack>
            </Box>
        </>
    );
}

export default SidebarContent;
