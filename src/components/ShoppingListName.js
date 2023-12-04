import { Typography, Dropdown, Menu, IconButton, MenuButton, MenuItem, Input } from '@mui/joy';
import Box from '@mui/joy/Box';
import { usePreferences } from '../contexts/PreferencesContext';
import MoreVert from '@mui/icons-material/MoreVert';
import { useState } from 'react';

function ShoppingListName() {
    const { shoppingListsPrefs } = usePreferences();

    const [renamingShoppingList, setRenamingShoppingList] = useState(false);
    const [newShoppingListName, setNewShoppingListName] = useState('');

    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    const deleteList = () => {
        console.log('Delete list'); // TODO
    };

    const renameList = () => {
        setRenamingShoppingList(true);
        console.log('Rename list'); // TODO
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
                <form>
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
                                <MenuItem onClick={renameList}>Přejmenovat</MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                </>
            )}
        </Box>
    );
}
export default ShoppingListName;
