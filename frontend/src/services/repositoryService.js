import api from "./api";

export async function getRepositories() {

    const response = await api.get("/api/github/repositories");

    return response.data;

}

export async function getRepository(id) {

    const response = await api.get(`/api/github/repositories/${id}`);

    return response.data;

}