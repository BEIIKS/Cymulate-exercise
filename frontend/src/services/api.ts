
import axios from 'axios';

declare global {
    interface Window {
        env: {
            VITE_API_URL: string;
        };
    }
}

const API_URL =
    window.env?.VITE_API_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export const authService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', { email, password, name });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

export interface PhishingAttempt {
    _id: string;
    emailId: string;
    status: 'pending' | 'success';
    createdAt: string;
}

export const phishingService = {
    getAttempts: async (): Promise<PhishingAttempt[]> => {
        const response = await api.get('/phishing');
        return response.data;
    },

    triggerAttempt: async (email: string): Promise<PhishingAttempt> => {
        const response = await api.post('/phishing', { email });
        return response.data;
    }
};
