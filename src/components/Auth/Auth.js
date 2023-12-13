import { useApi } from '../../contexts/ApiContext';
import { Box, Button, Modal, ModalDialog } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
//import { usePreferences } from '../contexts/PreferencesContext';
import LoginPopup from './LoginPopup';

function Auth() {
    // TODO: Login + Register
    const { api } = useApi();
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true);
                    //api.loginUser('user', 'password');
                }}
            >
                Přihlaš se
            </Button>
            {/* <Button onClick={api.registerUser}>Registruj se</Button> */}
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
        </>
    );
}

export default Auth;
