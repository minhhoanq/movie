import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
    signin: "/user/signin",
    signup: "/user/signup",
    getInfo: "/user/info",
    updatePassword: "/user/update-password",
    getFavorites: "/user/favorites",
    addFavorite: "/user/favorites",
};

const userApi = {
    signin: async ({ username, password }) => {
        try {
            const response = await publicClient.post(userEndpoints.signin, {
                username,
                password,
            });

            return { response };
        } catch (err) {
            console.log("cehcek");
            return { err };
        }
    },
    singup: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(userEndpoints.signup, {
                username,
                password,
                confirmPassword,
                displayName,
            });

            return { response };
        } catch (err) {
            return { err };
        }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo);

            return { response };
        } catch (err) {
            return { err };
        }
    },
    updatePassword: async ({ username, newPassword, confirmPassword }) => {
        try {
            const response = await publicClient.put(
                userEndpoints.updatePassword,
                { username, newPassword, confirmPassword }
            );

            return { response };
        } catch (err) {
            return { err };
        }
    },
    getFavorites: async () => {
        try {
        } catch (err) {
            return { err };
        }
    },
    addFavorite: async () => {
        try {
        } catch (err) {
            return { err };
        }
    },
};

export default userApi;
