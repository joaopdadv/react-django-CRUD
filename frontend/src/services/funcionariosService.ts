import type { Funcionario, FuncionarioRequest } from '@/types/funcionario';
import api from './api';
import type { Page } from '@/types/pagination';
import type { FuncionariosFilters } from '@/types/filters';

export const funcionariosService = {
    getAll: async (page: number, pageSize: number, ordering: string, filters: FuncionariosFilters): Promise<Page<Funcionario>> => {
        const response = await api.get<Page<Funcionario>>('/funcionarios/', {
            params: {
                page,
                page_size: pageSize,
                ordering,
                ...filters,
            },
        });
        return response.data;
    },

    getById: async (id: number): Promise<Funcionario> => {
        const response = await api.get<Funcionario>(`/funcionarios/${id}/`);
        return response.data;
    },

    create: async (data: FuncionarioRequest): Promise<Funcionario> => {
        const response = await api.post<Funcionario>('/funcionarios/', data);
        return response.data;
    },

    update: async (id: number, data: FuncionarioRequest): Promise<Funcionario> => {
        const response = await api.put<Funcionario>(`/funcionarios/${id}/`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/funcionarios/${id}/`);
    }
};