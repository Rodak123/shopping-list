import { Button } from '@mui/joy';
import { useApi } from '../../contexts/ApiContext';

const Auth = () => {
    // TODO: Login + Register
    const { api } = useApi();

    return (
        <>
            <Button onClick={api.loginUser}>Přihlaš se</Button>
            {/* <Button onClick={api.registerUser}>Registruj se</Button> */}
        </>
    );
};

export default Auth;
