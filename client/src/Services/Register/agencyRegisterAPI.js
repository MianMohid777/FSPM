import { api } from "../api";

const agencyRegApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      agencyReg: builder.mutation({
        query: ({
          adminName,
          companyName,
          adminCNIC,
          companyEmail,
          companyNTN,
          password,
          license,
          city,
          province,
          officeAddress,
          contactNo,
        }) => ({
          url: "agencies/register",
          method: "POST",
          body: {
            adminName,
            companyName,
            adminCNIC,
            companyEmail,
            companyNTN,
            password,
            license,
            city,
            province,
            officeAddress,
            contactNo,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    };
  },
});

export const { useAgencyRegMutation } = agencyRegApi;
