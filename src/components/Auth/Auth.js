import { useApi } from '../../contexts/ApiContext';
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import LoginPopup from './LoginPopup';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AlertContext } from '../../contexts/ApiContext';
import { Divider } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

function Auth() {
    // TODO: Login + Register
    const { api } = useApi();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const { isRegistering, setIsRegistering } = useContext(AlertContext);

    useEffect(() => {
        if (isRegistering) {
            setOpenModal(true);
            console.log('Registered');
        }
    }, [isRegistering]);

    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
            >
                Přihlaš se
            </Button>
            <Modal open={open} onClose={onClose}>
                <ModalDialog
                    layout="center"
                    size="lg"
                    sx={{
                        padding: 0,
                    }}
                >
                    <LoginPopup onClose={onClose} />
                </ModalDialog>
            </Modal>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <ModalDialog variant="sof" color="success" role="alertdialog">
                    <Typography level="h3" color="success" sx={{ mb: 1 }}>
                        Byli jste úspěšně zaregistrovaní!
                    </Typography>
                </ModalDialog>
            </Modal>
            ;
        </>
    );
}

export default Auth;
