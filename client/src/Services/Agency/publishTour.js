import { api } from "../api";

const tourApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      tourPublish: builder.mutation({
        query: (payload) => {
          return {
            url: "agencies/current-agency/publish-tour/" + payload.id,
            method: "POST",
            body: payload.tourInfo,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${payload.accessToken}`,
            },
          };
        },
      }),
    };
  },
});

export const { useTourPublishMutation } = tourApi;
