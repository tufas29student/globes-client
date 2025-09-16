// utils/api.js
export const isDev = () => import.meta.env.VITE_APP_DEV === "true";
export const devApi = () => import.meta.env.VITE_APP_DEV_API;
export const proApi = () => import.meta.env.VITE_APP_PRO_API;
