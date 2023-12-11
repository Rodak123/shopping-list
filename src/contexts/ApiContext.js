import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    const [apiSession, setApiSession] = useState(null);
    const [apiSessionLoaded, setApiSessionLoaded] = useState(false);

    const createApiInstance = useCallback(() => {
        return axios.create({
            baseURL: 'http://localhost:3100',
            headers: { Authorization: apiSession ? apiSession.token : 'bar' },
        });
    }, [apiSession]);

    const loadApi = useCallback(() => {
        if (api === null) return;
        const apiInstance = api.createApiInstance();
        apiInstance
            .get('/user/' + api.id)
            .then(function (res) {
                if (res.data) {
                    setApiLoaded(true);
                    api.id = res.data.id;
                }
            })
            .catch(function (error) {
                if (error.code === 'ERR_NETWORK') {
                    setApiLoaded(false);
                    setTimeout(loadApi, 5000);
                } else if (error.response.status === 401) {
                    console.log('Unauthorized');
                    setApiLoaded(true);
                }
            });
    }, [api]);

    const logout = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance.get('/logout').then(function (res) {
                if (res.status === 200) {
                    setApiSession(null);
                    window.location.reload();
                }
            });
        }
    };

    useEffect(() => {
        if (api === null) {
            const api = {
                createApiInstance: createApiInstance,
                id: 1,
            };
            const registerUser = () => {
                if (api === null) return;
                const apiInstance = api.createApiInstance();
                console.log('register');
                apiInstance
                    .post('/register', {
                        user_name: 'user',
                        password: 'password',
                        password_confirm: 'password',
                    })
                    .then(function (res) {
                        if (res.status === 201) {
                            //console.log('Registered as ' + res.data.user_name);
                            loginUser();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            const loginUser = () => {
                if (api === null) return;
                const apiInstance = api.createApiInstance();
                console.log('login');
                apiInstance
                    .post('/login', {
                        user_name: 'user',
                        password: 'password',
                    })
                    .then(function (res) {
                        setApiSession(res.data);
                        console.log("Logged in as 'user'");
                    })
                    .catch(function (error) {
                        console.log(error);
                        if (error.response.status === 404) {
                            registerUser();
                            //console.log('User not found');
                        }
                    });
            };

            api.loginUser = loginUser;
            api.registerUser = registerUser;
            setApi(api);
        }
    }, [api, createApiInstance]);

    useEffect(() => {
        if (apiLoaded === false) {
            loadApi();
        }
    }, [apiLoaded, api, loadApi, apiSession]);

    useEffect(() => {
        console.log('Api session changed', apiSession === null);
        setApiSessionLoaded(apiSession !== null);
    }, [apiSession]);

    return (
        <ApiContext.Provider
            value={{ api, apiLoaded, apiSession, setApiSession, apiSessionLoaded, logout }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    return useContext(ApiContext);
};
