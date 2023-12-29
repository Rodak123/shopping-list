import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/joy';
import { useState } from 'react';
import { useApi } from '../../contexts/ApiContext';

function AccountDisplay({ user }) {
    const { logout } = useApi();

    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyUID = () => {
        navigator.clipboard.writeText(user.uid);
        setShowCopiedMessage(true);
        setTimeout(() => {
            setShowCopiedMessage(false);
        }, 1000);
    };

    const username = user.user_name;
    const dateJoined = user.createdAt;

    return (
        <>
            <Avatar size="lg" />
            <Stack
                flexGrow="1"
                direction="row"
                justifyContent="space-between"
                useFlexGap
                spacing={1}
            >
                <Box>
                    <Tooltip
                        placement="top"
                        variant="soft"
                        title={showCopiedMessage ? 'UID bylo kopírováno' : 'Kopirovat Vaše UID?'}
                    >
                        <Button variant="plain" color="neutral" onClick={copyUID}>
                            <Typography title={'Připojil se k nám: ' + dateJoined} level="title-md">
                                {username}
                            </Typography>
                        </Button>
                    </Tooltip>
                </Box>
                <Button variant="outlined" onClick={logout}>
                    Odhlasit se
                </Button>
            </Stack>
        </>
    );
}

export default AccountDisplay;
