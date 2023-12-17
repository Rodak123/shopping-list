import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/joy';
import { useApi } from '../../contexts/ApiContext';
import DateFormatter from '../DateFormatter';

function AccountDisplay({ user }) {
    const { logout } = useApi();

    //console.log(user.uid);

    const copyUID = () => {
        navigator.clipboard.writeText(user.uid);
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
                    <Tooltip placement="top" variant="soft" title="Kopirovat Vaše UID?">
                        <Button variant="plain" color="neutral" onClick={copyUID}>
                            <Typography level="title-md">{username}</Typography>
                        </Button>
                    </Tooltip>
                    <Typography level="body-sm">
                        od <DateFormatter date={dateJoined} />
                    </Typography>
                </Box>
                <Button variant="outlined" onClick={logout}>
                    Odhlasit se
                </Button>
            </Stack>
        </>
    );
}

export default AccountDisplay;
