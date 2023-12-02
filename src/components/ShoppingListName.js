import { Typography, Dropdown, Menu, IconButton, MenuButton, MenuItem } from '@mui/joy';
import Box from '@mui/joy/Box';
import { usePreferences } from '../contexts/PreferencesContext';
import MoreVert from '@mui/icons-material/MoreVert';

function ShoppingListName() {
    const { shoppingListsPrefs } = usePreferences();

    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    const deleteList = () => {
        console.log('Delete list'); // TODO
    };

    const renameList = () => {
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
        </Box>
    );
}
export default ShoppingListName;
