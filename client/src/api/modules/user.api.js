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
    sigin: async ({ username, password }) => {
        try {
            const response = await publicClient.post(userEndpoints.signin, {
                username,
                password,
            });

            return { response };
        } catch (error) {
            return { error };
        }
    },
    sigup: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(userEndpoints.signup, {
                username,
                password,
                confirmPassword,
                displayName,
            });

            return { response };
        } catch (error) {
            return { error };
        }
    },
    getInfo: async () => {
        try {
            const response = await publicClient.get(userEndpoints.getInfo);

            return { response };
        } catch (error) {
            return { error };
        }
    },
    updatePassword: async ({ username, newPassword, confirmPassword }) => {
        try {
            const response = await publicClient.put(
                userEndpoints.updatePassword,
                { username, newPassword, confirmPassword }
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
    getFavorites: async () => {
        try {
        } catch (error) {
            return { error };
        }
    },
    addFavorite: async () => {
        try {
        } catch (error) {
            return { error };
        }
    },
};

export default userApi;
