import { Box, Card } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

function Auth() {
    const [inLogin, setInLogin] = useState(true);

    return (
        <Card variant="soft" color="primary">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {inLogin ? (
                    <Login
                        toRegister={() => {
                            setInLogin(false);
                        }}
                    />
                ) : (
                    <Register
                        toLogin={() => {
                            setInLogin(true);
                        }}
                    />
                )}
            </Box>
        </Card>
    );
}

export default Auth;
