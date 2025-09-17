export interface Ingrediente {
  id?: number;
  nome: string;
}

export interface Receita {
  id?: number;
  nome: string;
  tempoPreparo: number;
  custoAproximado: number;
  ingredientes: Ingrediente[];
}

export interface CreateReceitaDto {
  nome: string;
  tempoPreparo: number;
  custoAproximado: number;
  ingredientes: Ingrediente[];
}

export interface UpdateReceitaDto {
  nome?: string;
  tempoPreparo?: number;
  custoAproximado?: number;
  ingredientes?: Ingrediente[];
}

export interface CreateIngredienteDto {
  nome: string;
}

export interface UpdateIngredienteDto {
  nome?: string;
}
