import api from "./api";

export async function runReview(id) {
    const response = await api.post(`/api/review/run/${id}`);
    return response.data;
}