export const API_IMAGES = {
    UPLOAD: "/api/images/upload",
    GET_ALL: "/api/images",
    UPDATE_TITLE: (id: string) => `/api/images/${id}/title`,
    REPLACE: (id: string) => `/api/images/${id}/replace`,
    DELETE: (id: string) => `/api/images/${id}`,
} as const;
