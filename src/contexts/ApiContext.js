import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    const loadApi = () => {
        axios
            .get(api.url + '/user/' + api.id)
            .then(function (res) {
                if (res.data) {
                    setApiLoaded(true);
                    api.id = res.data.id;
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
                url: 'http://localhost:3100',
                id: id,
            };
            setApi(api);
        }
    }, [api]);

    useEffect(() => {
        if (apiLoaded === false && api !== null) {
            loadApi();
        }
    }, [apiLoaded, api, loadApi]);

    return <ApiContext.Provider value={{ api, apiLoaded }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
    return useContext(ApiContext);
};
