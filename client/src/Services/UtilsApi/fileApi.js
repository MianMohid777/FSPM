import { api } from "../api";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      upload: builder.mutation({
        query: (file) => {
          return {
            url: "Static/upload",
            method: "POST",
            body: file,
          };
        },
      }),
    };
  },
});

const uploadGalleryApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      uploadGallery: builder.mutation({
        query: (files) => {
          return {
            url: "Static/upload-gallery",
            method: "POST",
            body: files,
          };
        },
      }),
    };
  },
});

export const { useUploadMutation } = uploadApi;
export const { useUploadGalleryMutation } = uploadGalleryApi;
