import { InfoOutlined } from '@mui/icons-material';
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
import { useState } from 'react';
import { useApi } from '../../contexts/ApiContext';

function Register({ toLogin }) {
    const { api } = useApi();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);

    const regiser = () => {
        setError(null);
        api.registerUser(username, password, passwordConfirm, setError);
        setPasswordConfirm('');
    };

    return (
        <>
            <Typography
                level="h2"
                color="primary"
                variant="soft"
                sx={{ width: 150, textAlign: 'center' }}
            >
                Registrace
            </Typography>
            <Card>
                <CardContent
                    sx={{
                        gap: 1.5,
                    }}
                >
                    <Stack direction="column" spacing={2} alignItems="stretch">
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                regiser();
                            }}
                        >
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
                            </FormControl>
                            <FormControl error={error !== null}>
                                <FormLabel>Potvrzení Hesla</FormLabel>
                                <Input
                                    placeholder="Potvezení Hesla"
                                    value={passwordConfirm}
                                    onChange={(event) => setPasswordConfirm(event.target.value)}
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
                            <input type="submit" hidden />
                        </form>
                    </Stack>
                    <CardActions>
                        <Button variant="solid" color="primary" onClick={regiser}>
                            Registrovat se
                        </Button>
                    </CardActions>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Button variant="plain" color="neutral" onClick={toLogin}>
                            Přihlásit se
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}

export default Register;
