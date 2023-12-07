import { Box, Button, Modal, ModalDialog } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import ItemPopup from './ItemPopup';

function ItemAdd({ refreshItems }) {
    const { shoppingListsPrefs } = usePreferences();

    const [open, setOpen] = useState(false);

    const onClose = () => {
        refreshItems();
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
                disabled={shoppingListsPrefs.selected === null}
                variant="solid"
                size="lg"
                onClick={() => setOpen(true)}
            >
                Nová položka
            </Button>
            <Modal open={open} onClose={onClose}>
                <ModalDialog
                    layout="center"
                    size="lg"
                    sx={{
                        padding: 0,
                    }}
                >
                    <ItemPopup onClose={onClose} />
                </ModalDialog>
            </Modal>
        </Box>
    );
}

export default ItemAdd;
