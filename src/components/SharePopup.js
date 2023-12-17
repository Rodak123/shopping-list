import { InfoOutlined } from '@mui/icons-material';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    ModalClose,
    Typography,
} from '@mui/joy';
import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { usePreferences } from '../contexts/PreferencesContext';

function SharePopup({ onClose }) {
    const { api, apiSession } = useApi();
    const { shoppingListsPrefs, userPrefs } = usePreferences();

    const user = userPrefs.user;
    const [sharedUser, setSharedUser] = useState(null);
    const [error, setError] = useState(null);
    const [uid, setUid] = useState('');

    const shareList = () => {
        if (api === null) return;
        setSharedUser(null);
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .post('/user/list/' + shoppingListsPrefs.selectedId + '/share', {
                with: uid,
            })
            .then(function (res) {
                if (res.status === 200) {
                    setSharedUser(res.data);
                }
            })
            .catch(function (error) {
                console.error('Error sharing list:', error);
                if (error.response.status === 400) {
                    setError('Nelze sdílet list sám se sebou');
                } else {
                    setError('Uživatel s tímto UID neexistuje');
                }
            });
    };

    const cardStyle = {
        variant: 'plain',
        color: 'primary',
    };

    if (sharedUser) {
        return (
            <Card {...cardStyle}>
                <Typography level="title-lg">Sdílet nákupní list</Typography>
                <ModalClose variant="plain" />
                <Divider inset="none" />
                <CardContent>
                    <Typography level="title-md">
                        List byl úspěšně sdílen s {sharedUser.user_name}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card {...cardStyle}>
            <Typography level="title-lg">Sdílet nákupní list</Typography>
            <ModalClose variant="plain" />
            <Divider inset="none" />
            <CardContent>
                <FormControl error={error !== null}>
                    <FormLabel>UID uživatele</FormLabel>
                    <Input
                        placeholder={user.uid}
                        value={uid}
                        onChange={(event) => setUid(event.target.value)}
                        autoFocus={true}
                    />
                    {error && (
                        <FormHelperText color="danger">
                            <InfoOutlined />
                            {error}
                        </FormHelperText>
                    )}
                </FormControl>
                <CardActions>
                    <Button variant="solid" color="primary" onClick={shareList}>
                        Sdílet
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default SharePopup;
