import { api } from "../api";

const tourApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTours: builder.query({
        query: () => ({
          url: "tourists/current-home/all-tours",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    };
  },
});

const tourByIDApi = api.injectEndpoints({
    endpoints: (builder) => {
      return {
        getTourByID: builder.query({
          query: ({id}) => ({
            url: `tourists/current-home/tour/${id}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        }),
      };
    },
  });

export const { useGetToursQuery } = tourApi;
export const { useGetTourByIDQuery } = tourByIDApi;
