import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);
    //const [loggedUser, setLoggedUser] = useState(null);

    const createApiInstance = () => {
        return axios.create({
            baseURL: 'http://localhost:3100',
            headers: { Authorization: 'foobar' },
        });
    };

    const loadApi = () => {
        if (api === null) return;
        const apiInstance = api.createApiInstance();
        apiInstance
            .get('/user/' + api.id)
            .then(function (res) {
                if (res.data) {
                    setApiLoaded(true);
                    api.id = res.data.id;
                    //setLoggedUser(res.data);
                }
            })
            .catch(function (error) {
                setApiLoaded(false);
                setTimeout(loadApi, 5000);
            });
    };

    useEffect(() => {
        if (api === null) {
            const id = 1;
            const api = {
                createApiInstance: createApiInstance,
                id: id,
            };
            setApi(api);
        }
    }, [api]);

    useEffect(() => {
        if (apiLoaded === false) {
            loadApi();
        }
    }, [apiLoaded, api, loadApi]);

    return <ApiContext.Provider value={{ api, apiLoaded }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    return useContext(ApiContext);
};
