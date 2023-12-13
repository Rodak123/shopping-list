import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    const [apiSession, setApiSession] = useState(null);
    const [apiSessionLoaded, setApiSessionLoaded] = useState(false);

    const createApiInstance = (apiSession) => {
        return axios.create({
            baseURL: 'http://localhost:3100',
            headers: { Authorization: apiSession ? apiSession.token : 'bar' },
        });
    };

    const loadApi = useCallback(() => {
        if (api === null) return;
        const apiInstance = api.createApiInstance(apiSession);
        apiInstance
            .get('/user')
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

    const sessionSaveKey = 'shopping_list_session';
    const saveSession = (session) => {
        localStorage.setItem(sessionSaveKey, session.token);
    };

    const clearSession = () => {
        localStorage.removeItem(sessionSaveKey);
    };

    const loginWithSession = () => {
        const token = localStorage.getItem(sessionSaveKey);

        if (token === null) return false;

        const session = {
            token: token,
        };

        setTimeout(() => {
            setApiSession(session);
        }, 10);

        return false;
    };

    const apiFailed = (error) => {
        // console.log('Api failed:');
        // console.log(error);

        if (error.code === 'ERR_NETWORK') {
            console.log('API is unreachable');
            window.location.reload();
            return;
        }

        const status = error.response.status;
        if (status === 401) {
            // Unauthorized
            setApiSessionLoaded(false);
            setApiSession(null);
            clearSession();
        }
    };

    const logout = () => {
        if (api !== null) {
            const apiInstance = api.createApiInstance(apiSession);
            apiInstance.get('/logout').then(function (res) {
                if (res.status === 200) {
                    setApiSession(null);
                    clearSession();
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

            const registerUser = (user_name, password, password_confirm) => {
                if (api === null) return;
                const apiInstance = api.createApiInstance();
                //console.log('register');
                apiInstance
                    .post('/register', {
                        user_name: user_name,
                        password: password,
                        password_confirm: password_confirm,
                    })
                    .then(function (res) {
                        if (res.status === 201) {
                            //console.log('Registered as ' + res.data.user_name);
                            loginUser(user_name, password);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            const loginUser = (user_name, password) => {
                if (api === null) return;
                const apiInstance = api.createApiInstance();
                //console.log('login');
                apiInstance
                    .post('/login', {
                        user_name: user_name,
                        password: password,
                    })
                    .then(function (res) {
                        console.log('Logged in as ' + user_name);
                        const session = res.data;

                        setApiSession(session);
                        saveSession(session);
                    })
                    .catch(function (error) {
                        console.log(error);
                        if (error.response.status === 404) {
                            registerUser(user_name, password, password);
                            //console.log('User not found');
                        }
                    });
            };

            api.loginUser = loginUser;
            api.registerUser = registerUser;
            api.loginWithSession = loginWithSession;
            api.apiFailed = apiFailed;
            setApi(api);
        }
    }, [api, createApiInstance]);

    useEffect(() => {
        if (apiLoaded === false) {
            loadApi();
        }
    }, [apiLoaded, api, loadApi, apiSession]);

    useEffect(() => {
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
