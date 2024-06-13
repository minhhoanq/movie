import publicClient from "../client/public.client";

const personalEndpoints = {
    detail: ({ personId }) => `person/${personId}`,
    medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
    detail: async ({ personId }) => {
        try {
            const response = await publicClient.get(
                personalEndpoints.detail({
                    personId,
                })
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },

    medias: async ({ personId }) => {
        try {
            const response = await publicClient.get(
                personalEndpoints.medias({
                    personId,
                })
            );

            return { response };
        } catch (error) {
            return { error };
        }
    },
};

export default personApi;
