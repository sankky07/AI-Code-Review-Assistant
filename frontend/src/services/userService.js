import api from "./api";

export async function getCurrentUser() {

    const response = await api.get("/api/user/me");

    return response.data;

}