import MoreVert from '@mui/icons-material/MoreVert';
import {
    Dropdown,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    Modal,
    ModalDialog,
    Typography,
} from '@mui/joy';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';
import SharePopup from './SharePopup';

function ShoppingListName() {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs, userPrefs } = usePreferences();

    const [renamingShoppingList, setRenamingShoppingList] = useState(false);
    const [sharingPopupOpen, setSharingPopupOpen] = useState(false);

    const [newShoppingListName, setNewShoppingListName] = useState('');

    const isSelectedShoppingList = shoppingListsPrefs.selected !== null;

    const deleteList = () => {
        if (!isSelectedShoppingList) return;
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .delete('/user/list/' + shoppingListsPrefs.selectedId + '/delete')
            .then(function (res) {
                if (res.status === 200) shoppingListsPrefs.setSelectedId(-1);
            })
            .catch((error) => {
                api.apiFailed(error);
            });
    };

    const renameList = () => {
        if (!isSelectedShoppingList) return;
        if (newShoppingListName === '') {
            setRenamingShoppingList(false);
            return;
        }

        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .put('/user/list/' + shoppingListsPrefs.selectedId + '/rename', {
                name: newShoppingListName,
            })
            .then(function (res) {
                if (res.status === 200) {
                    shoppingListsPrefs.refreshSelected();
                    setNewShoppingListName('');
                    setRenamingShoppingList(false);
                }
            })
            .catch((error) => {
                api.apiFailed(error);
            });
    };

    const shareList = () => {
        setSharingPopupOpen(true);
        // if (!isSelectedShoppingList) return;
        // const userUID = 'key';
        // const apiInstance = api.createApiInstance(apiSession);
        // apiInstance.post('/user/list/' + shoppingListsPrefs.selectedId + '/share', {
        //     with: userUID,
        // });
    };

    const onSharePopupClose = () => {
        setSharingPopupOpen(false);
    };

    const userNotOwner = !(
        isSelectedShoppingList && shoppingListsPrefs.selected.owner === userPrefs.user.id
    );

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
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setRenamingShoppingList(false);
                                setNewShoppingListName('');
                            }
                        }}
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
                                <MenuItem disabled={userNotOwner} onClick={deleteList}>
                                    Smazat
                                </MenuItem>
                                <MenuItem
                                    disabled={userNotOwner}
                                    onClick={() => {
                                        setRenamingShoppingList(true);
                                    }}
                                >
                                    Přejmenovat
                                </MenuItem>
                                <MenuItem
                                    disabled={userNotOwner}
                                    onClick={() => {
                                        shareList();
                                    }}
                                >
                                    Sdílet
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    )}
                    <Modal open={sharingPopupOpen} onClose={onSharePopupClose}>
                        <ModalDialog
                            layout="center"
                            size="lg"
                            sx={{
                                padding: 0,
                            }}
                        >
                            <SharePopup onClose={onSharePopupClose} />
                        </ModalDialog>
                    </Modal>
                </>
            )}
        </Box>
    );
}
export default ShoppingListName;
