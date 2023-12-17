import { Box, Button, Card, Modal, ModalDialog, Typography } from '@mui/joy';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../contexts/ApiContext';
import LoginPopup from './LoginPopup';

function Auth() {
    // TODO: Login + Register
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const onCloseModal = () => {
        setOpenModal(false);
    };
    const { isRegistering } = useContext(AlertContext);

    useEffect(() => {
        if (isRegistering) {
            setOpenModal(true);
            console.log('Registered');
        }
    }, [isRegistering]);

    return (
        <Card variant="soft" color="primary" sx={{ width: 200 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    level="h2"
                    color="primary"
                    variant="soft"
                    sx={{ width: 150, textAlign: 'center' }}
                >
                    Přihlášení
                </Typography>
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
                <Modal open={openModal} onClose={onCloseModal}>
                    <ModalDialog variant="sof" color="success" role="alertdialog">
                        <Typography level="h3" color="success" sx={{ mb: 1 }}>
                            Byli jste úspěšně zaregistrovaní!
                        </Typography>
                    </ModalDialog>
                </Modal>
            </Box>
        </Card>
    );
}

export default Auth;
