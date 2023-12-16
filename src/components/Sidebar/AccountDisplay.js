import { Avatar, Button, Stack, Typography } from '@mui/joy';
import { useApi } from '../../contexts/ApiContext';
import DateFormatter from '../DateFormatter';

function AccountDisplay({ user }) {
    const { logout } = useApi();

    console.log(user.uid);

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
                <div>
                    <Typography level="title-md">{username}</Typography>
                    <Typography level="body-sm">
                        od <DateFormatter date={dateJoined} />
                    </Typography>
                </div>
                <Button variant="outlined" onClick={logout}>
                    Odhlasit se{' '}
                </Button>
            </Stack>
        </>
    );
}

export default AccountDisplay;
