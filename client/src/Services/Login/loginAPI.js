import { api } from "../api";

const loginAPI = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                query: ({ emailAddress, password, accessToken }) => ({
                    url: "tourists/login",
                    method: "POST",
                    // credentials: "include",
                    body: { emailAddress, password },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }),
            }),
        };
    },
});

const agencyLoginApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            agencyLogin: builder.mutation({
                query: ({ companyEmail, password, accessToken }) => ({
                    url: "agencies/login",
                    method: "POST",
                    // credentials: "include",
                    body: { companyEmail, password },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }),
            }),
        };
    },
});

const adminLoginApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            adminLogin: builder.mutation({
                query: ({ email, password, accessToken }) => ({
                    url: "admin/login",
                    method: "POST",
                    // credentials: "include",
                    body: { email, password },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }),
            }),
        };
    },
});

const adminRefreshTokenApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            adminRefreshToken: builder.mutation({
                query: ({ refreshToken }) => ({
                    url: "admin/refresh-token",
                    method: "POST",
                    // credentials: "include",
                    body: { refreshToken },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            }),
        };
    },
});

const agencyRefreshTokenApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            agencyRefreshToken: builder.mutation({
                query: ({ refreshToken }) => ({
                    url: "agencies/refresh-token",
                    method: "POST",
                    body: { refreshToken },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            }),
        };
    },
});

const touristRefreshTokenApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            touristRefreshToken: builder.mutation({
                query: ({ refreshToken }) => ({
                    url: "tourists/refresh-token",
                    method: "POST",
                    // credentials: "include",s
                    body: { refreshToken },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            }),
        };
    },
});

const googleSignInApi = api.injectEndpoints({
    endpoints: (builder) => {
        return {
            googleSignIn: builder.mutation({
                query: () => ({
                    url: "request",
                    method: "POST",
                    // credentials: "include",
                    body: {},
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            }),
        };
    },
});
export const { useLoginMutation } = loginAPI;
export const { useAgencyLoginMutation } = agencyLoginApi;
export const { useAdminLoginMutation } = adminLoginApi;
export const { useAdminRefreshTokenMutation } = adminRefreshTokenApi;
export const { useTouristRefreshTokenMutation } = touristRefreshTokenApi;
export const { useAgencyRefreshTokenMutation } = agencyRefreshTokenApi;
export const { useGoogleSignInMutation } = googleSignInApi;
