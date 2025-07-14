const USER_KEY = '__auth__';

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getCurrentUser = () => localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY)) : null;
export const removeUser = () => localStorage.removeItem(USER_KEY);
