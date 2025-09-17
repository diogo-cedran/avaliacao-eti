import React, { useState, useEffect } from 'react';
import { Receita, CreateReceitaDto, Ingrediente } from '../types';
import { receitaService } from '../services/api';
import './ReceitaCRUD.css';

const ReceitaCRUD: React.FC = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingReceita, setEditingReceita] = useState<Receita | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateReceitaDto>({
    nome: '',
    tempoPreparo: 0,
    custoAproximado: 0,
    ingredientes: []
  });

  const loadReceitas = async () => {
    setLoading(true);
    try {
      const data = await receitaService.getAll();
      setReceitas(data);
    } catch (error: any) {
      console.error('Erro ao carregar receitas:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao carregar receitas';
      alert(`Erro ao carregar receitas: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceitas();
  }, []);

  const clearForm = () => {
    setFormData({
      nome: '',
      tempoPreparo: 0,
      custoAproximado: 0,
      ingredientes: []
    });
    setEditingReceita(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    try {
      if (editingReceita) {
        await receitaService.update(editingReceita.id!, formData);
      } else {
        await receitaService.create(formData);
      }
      clearForm();
      loadReceitas();
      alert('Receita salva com sucesso!');
    } catch (error: any) {
      console.error('Erro ao salvar receita:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao salvar receita';
      alert(`Erro ao salvar receita: ${errorMessage}`);
    }
  };

  const handleEdit = (receita: Receita) => {
    setEditingReceita(receita);
    setFormData({
      nome: receita.nome,
      tempoPreparo: Number(receita.tempoPreparo),
      custoAproximado: Number(receita.custoAproximado),
      ingredientes: receita.ingredientes.map(ing => ({
        nome: ing.nome
      }))
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      try {
        await receitaService.delete(id);
        loadReceitas();
        alert('Receita excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir receita:', error);
        alert('Erro ao excluir receita');
      }
    }
  };

  const addIngrediente = () => {
    setFormData({
      ...formData,
      ingredientes: [...formData.ingredientes, { nome: '' }]
    });
  };

  const removeIngrediente = (index: number) => {
    setFormData({
      ...formData,
      ingredientes: formData.ingredientes.filter((_, i) => i !== index)
    });
  };

  const updateIngrediente = (index: number, field: keyof Ingrediente, value: string) => {
    const newIngredientes = [...formData.ingredientes];
    newIngredientes[index] = { ...newIngredientes[index], [field]: value };
    setFormData({ ...formData, ingredientes: newIngredientes });
  };

  return (
    <div className="receita-crud">
      <h1>Gerenciador de Receitas</h1>
      
      <div className="actions">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(true)}
        >
          Nova Receita
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-content">
            <h2>{editingReceita ? 'Editar Receita' : 'Nova Receita'}</h2>
            
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome da receita"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tempo de Preparo (min):</label>
                <input
                  type="number"
                  value={formData.tempoPreparo}
                  onChange={(e) => setFormData({ ...formData, tempoPreparo: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Custo Aproximado (R$):</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.custoAproximado}
                  onChange={(e) => setFormData({ ...formData, custoAproximado: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Ingredientes:</label>
              <button type="button" className="btn btn-small" onClick={addIngrediente}>
                Adicionar Ingrediente
              </button>
              
              {formData.ingredientes.map((ingrediente, index) => (
                <div key={index} className="ingrediente-item">
                  <input
                    type="text"
                    placeholder="Nome do ingrediente"
                    value={ingrediente.nome}
                    onChange={(e) => updateIngrediente(index, 'nome', e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeIngrediente(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                 Salvar
              </button>
              <button className="btn btn-secondary" onClick={clearForm}>
                 Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="receitas-list">
        {loading ? (
          <p>Carregando receitas...</p>
        ) : receitas.length === 0 ? (
          <p>Nenhuma receita encontrada.</p>
        ) : (
          receitas.map((receita) => (
            <div key={receita.id} className="receita-card">
              <div className="receita-header">
                <h3>{receita.nome}</h3>
                <div className="receita-actions">
                  <button 
                    className="btn btn-small btn-primary"
                    onClick={() => handleEdit(receita)}
                  >
                     Editar
                  </button>
                  <button 
                    className="btn btn-small btn-danger"
                    onClick={() => handleDelete(receita.id!)}
                  >
                     Excluir
                  </button>
                </div>
              </div>
              
              <div className="receita-info">
                <span> {receita.tempoPreparo} min</span>
                <span> R$ {Number(receita.custoAproximado).toFixed(2)}</span>
              </div>
              
              <div className="receita-ingredientes">
                <h4>Ingredientes:</h4>
                <ul>
                  {receita.ingredientes.map((ingrediente, index) => (
                    <li key={index}>
                      {ingrediente.nome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReceitaCRUD;
