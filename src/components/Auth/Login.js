import InfoOutlined from '@mui/icons-material/InfoOutlined';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Stack,
    Typography,
} from '@mui/joy';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';

function Login({ toRegister }) {
    const { api } = useApi();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const login = () => {
        setError(null);
        api.loginUser(username, password, setError);
    };

    useEffect(() => {
        setPassword('');
    }, [error]);

    return (
        <>
            <Typography
                level="h2"
                color="primary"
                variant="soft"
                sx={{ width: 150, textAlign: 'center' }}
            >
                Přihlášení
            </Typography>
            <Card>
                <CardContent
                    sx={{
                        gap: 1.5,
                    }}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            login();
                        }}
                    >
                        <Stack direction="column" spacing={2} alignItems="stretch">
                            <FormControl error={error !== null}>
                                <FormLabel>Uživatelksé jméno</FormLabel>
                                <Input
                                    placeholder="Uživatelské jméno"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required={true}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl error={error !== null}>
                                <FormLabel>Heslo</FormLabel>
                                <Input
                                    placeholder="Heslo"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    type="password"
                                    required={true}
                                />
                                {error && (
                                    <FormHelperText color="danger">
                                        <InfoOutlined />
                                        {error}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                        <input type="submit" hidden />
                    </form>
                    <CardActions>
                        <Button variant="solid" color="primary" onClick={login}>
                            Přihlásit se
                        </Button>
                    </CardActions>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        {/* <Button variant="plain" color="neutral">
                        Zapomenuté heslo
                    </Button> */}
                        <Button variant="plain" color="neutral" onClick={toRegister}>
                            Registrovat se
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
export default Login;
