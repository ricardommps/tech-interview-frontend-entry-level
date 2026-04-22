import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service');

describe('useProducts', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  test('carrega produtos e retorna preferencias e funcionalidades unicas ordenadas', async () => {
    getProducts.mockResolvedValue([
      {
        id: 1,
        preferences: ['Automação de marketing', 'Integração com chatbots'],
        features: [
          'Chat ao vivo e mensagens automatizadas',
          'Rastreamento de comportamento do usuário',
        ],
      },
      {
        id: 2,
        preferences: ['Automação de marketing', 'Análise preditiva de dados'],
        features: [
          'Rastreamento de comportamento do usuário',
          'Análise de dados para insights estratégicos',
        ],
      },
    ]);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('');
    expect(result.current.products).toHaveLength(2);
    expect(result.current.preferences).toEqual([
      'Análise preditiva de dados',
      'Automação de marketing',
      'Integração com chatbots',
    ]);
    expect(result.current.features).toEqual([
      'Análise de dados para insights estratégicos',
      'Chat ao vivo e mensagens automatizadas',
      'Rastreamento de comportamento do usuário',
    ]);
  });

  test('retorna mensagem de erro quando a busca dos produtos falha', async () => {
    getProducts.mockRejectedValue(new Error('Falha na API'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.error).toBe(
      'Nao foi possivel carregar os produtos agora. Tente novamente em instantes.'
    );
    expect(console.error).toHaveBeenCalled();
  });
});
