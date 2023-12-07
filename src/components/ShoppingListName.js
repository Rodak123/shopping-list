import MoreVert from '@mui/icons-material/MoreVert';
import { Dropdown, IconButton, Input, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import axios from 'axios';
import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';

function ShoppingListName() {
    const { api } = useApi();
    const { shoppingListsPrefs } = usePreferences();

    const [renamingShoppingList, setRenamingShoppingList] = useState(false);
    const [newShoppingListName, setNewShoppingListName] = useState('');

    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    const deleteList = () => {
        if (!isSelectedShoppingList) return;
        axios
            .delete(
                api.url + '/user/' + api.id + '/list/' + shoppingListsPrefs.selectedId + '/delete'
            )
            .then(function (res) {
                if (res.status === 200) shoppingListsPrefs.setSelectedId(-1);
            });
    };

    const renameList = () => {
        if (!isSelectedShoppingList) return;
        axios
            .put(
                api.url + '/user/' + api.id + '/list/' + shoppingListsPrefs.selectedId + '/rename',
                {
                    name: newShoppingListName,
                }
            )
            .then(function (res) {
                if (res.status === 200) {
                    shoppingListsPrefs.refreshSelected();
                    setNewShoppingListName('');
                    setRenamingShoppingList(false);
                }
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                borderRadius: '6px',
                backgroundColor: 'lightgrey',
                padding: '10.5px',
                alignContent: 'center',
            }}
        >
            {renamingShoppingList ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        renameList();
                    }}
                >
                    <Input
                        value={newShoppingListName}
                        onChange={(e) => setNewShoppingListName(e.target.value)}
                        disabled={false}
                        placeholder={shoppingListsPrefs.selected.name}
                        variant="plain"
                        color="neutral"
                    />
                </form>
            ) : (
                <>
                    <Typography
                        sx={{
                            marginY: '8px',
                        }}
                    >
                        {isSelectedShoppingList
                            ? shoppingListsPrefs.selected.name
                            : 'Není vybrán žádný list'}
                    </Typography>
                    {isSelectedShoppingList && (
                        <Dropdown>
                            <MenuButton slots={{ root: IconButton }} size="sm">
                                <MoreVert />
                            </MenuButton>
                            <Menu>
                                <MenuItem onClick={deleteList}>Smazat</MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setRenamingShoppingList(true);
                                    }}
                                >
                                    Přejmenovat
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </>
            )}
        </Box>
    );
}
export default ShoppingListName;
