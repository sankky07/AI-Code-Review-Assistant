import api from "./api";

export async function getHistory(repositoryId) {

    const response = await api.get(`/api/review/history/${repositoryId}`);

    return response.data;

}

export async function getAllHistory() {

    const response = await api.get("/api/review/history");

    return response.data;

}

export async function deleteHistory(id) {

    await api.delete(`/api/review/history/${id}`);

}

export async function deleteAllHistory() {

    await api.delete("/api/review/history");

}