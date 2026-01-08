
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
    _id: string; // MongoDB ID
    emailId: string; // Changed from email to emailId to match backend
    status: 'pending' | 'success'; // Backend only returns these for now
    createdAt: string;
}

export const phishingService = {
    getAttempts: async (): Promise<PhishingAttempt[]> => {
        const response = await api.get('/phishing');
        return response.data;
    },

    triggerAttempt: async (email: string): Promise<PhishingAttempt> => {
        const response = await api.post('/phishing', { email });
        // The backend trigger returns the result of the simulation service call, 
        // which might not be the full attempt object yet if it's async or minimal return.
        // Actually my phishinService.sendPhishingEmail returns response.data from simulation service.
        // Simulation service returns { status: 'sent' }.
        // So I might need to re-fetch or just mock the return for UI optimistically, 
        // OR update backend to return the created attempt.

        // Wait, PhishingService backend:
        // sendPhishingEmail calling simulation service.
        // Simulation service creates the attempt and returns { status: 'sent' }.
        // So the management service doesn't actually see the new attempt unless it queries the DB.

        // CORRECTION: The Simulation Service creates the attempt in the DB.
        // The Management service triggers it.
        // If I want the newly created attempt, the simulation service should return it 
        // OR the management service should query it.

        // Simulation service code:
        // @Post('send') async send(...) { await service.sendPhishingEmail(email); return { status: 'sent' }; }

        // Start simple: just return void or status, and caller will refresh list.
        return response.data;
    }
};
