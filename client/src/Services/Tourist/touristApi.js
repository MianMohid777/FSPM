import { api } from "../api";
const touristRegApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      touristReg: builder.mutation({
        query: ({ firstName, lastName, emailAddress, password }) => ({
          url: "tourists/register",
          method: "POST",
          body: {
            firstName,
            lastName,
            emailAddress,
            password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    };
  },
});

export const { useTouristRegMutation } = touristRegApi;
