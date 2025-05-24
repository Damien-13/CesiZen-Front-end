// src/api/request.ts
import api from './apiConfiguration';

const handleError = (error: unknown) => {
    console.error('API Error:', error);
};

export const get = async <T>(path: string): Promise<T | null> => {
    try {
        const response = await api.get<T>(path);
        return response.data;
    } catch (err) {
        handleError(err);
        return null;
    }
};

export const post = async <TRequest, TResponse>(path: string, data: TRequest): Promise<TResponse | null> => {
    try {
        const response = await api.post<TResponse>(path, data);
        return response.data;
    } catch (err) {
        handleError(err);
        return null;
    }
};

export const put = async <TRequest, TResponse>(path: string, data: TRequest): Promise<TResponse | null> => {
    try {
        const response = await api.put<TResponse>(path, data);
        return response.data;
    } catch (err) {
        handleError(err);
        return null;
    }
};

export const del = async <T>(path: string): Promise<T | null> => {
    try {
        const response = await api.delete<T>(path);
        return response.data;
    } catch (err) {
        handleError(err);
        return null;
    }
};
