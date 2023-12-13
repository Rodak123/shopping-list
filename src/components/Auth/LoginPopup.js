import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormLabel,
    Input,
    ModalClose,
    Stack,
    Typography,
} from '@mui/joy';
import { useApi } from '../../contexts/ApiContext';
import * as React from 'react';
import { useEffect, useState } from 'react';
import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

function LoginPopup({ onClose }) {
    const { api } = useApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const Login = () => {
        api.loginUser(username, password, setError);
    };
    return (
        <Card>
            <Typography variant="h2" sx={{ mb: 2 }}>
                Přihlášení
            </Typography>
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
            >
                <Stack
                    direction="column"
                    spacing={2}
                    alignItems="stretch"
                    sx={{ gridColumn: '1/-1' }}
                >
                    <FormControl sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Uživatelksé jméno</FormLabel>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required={true}
                            type="text"
                        />
                    </FormControl>
                    <FormControl error={error !== null} sx={{ gridColumn: '1/-1' }}>
                        <FormLabel>Heslo</FormLabel>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            required={true}
                        />
                        {error && (
                            <FormHelperText color="danger">
                                <InfoOutlined />
                                Špatné uživatelské jméno nebo heslo
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary" onClick={Login}>
                        Login
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
export default LoginPopup;
