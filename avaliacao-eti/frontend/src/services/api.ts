import axios from 'axios';
import { Receita, CreateReceitaDto, UpdateReceitaDto, CreateIngredienteDto, UpdateIngredienteDto } from '../types';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const receitaService = {
  getAll: async (): Promise<Receita[]> => {
    const response = await api.get('/receitas');
    return response.data;
  },

  getById: async (id: number): Promise<Receita> => {
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  },

  create: async (data: CreateReceitaDto): Promise<Receita> => {
    const response = await api.post('/receitas', data);
    return response.data;
  },

  update: async (id: number, data: UpdateReceitaDto): Promise<Receita> => {
    const response = await api.put(`/receitas/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/receitas/${id}`);
  },
};

export const ingredienteService = {
  addToReceita: async (receitaId: number, data: CreateIngredienteDto): Promise<Receita> => {
    const response = await api.post(`/receitas/${receitaId}/ingredientes`, data);
    return response.data;
  },

  update: async (receitaId: number, ingredienteId: number, data: UpdateIngredienteDto): Promise<Receita> => {
    const response = await api.put(`/receitas/${receitaId}/ingredientes/${ingredienteId}`, data);
    return response.data;
  },

  remove: async (receitaId: number, ingredienteId: number): Promise<Receita> => {
    const response = await api.delete(`/receitas/${receitaId}/ingredientes/${ingredienteId}`);
    return response.data;
  },
};

export default api;
