import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ItemPopup from './ItemPopup';
import { ModalDialog } from '@mui/joy';
import { useState } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';

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
