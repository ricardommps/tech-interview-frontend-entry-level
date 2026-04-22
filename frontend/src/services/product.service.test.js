import getProducts from './product.service';

describe('product.service', () => {
  const originalFetch = global.fetch;
  const originalConsoleError = console.error;

  beforeEach(() => {
    global.fetch = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  test('retorna a lista de produtos quando a requisicao tem sucesso', async () => {
    const mockResponse = [{ id: 1, name: 'RD Station CRM' }];

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    await expect(getProducts()).resolves.toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/products');
  });

  test('lanca erro quando a resposta nao e bem sucedida', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getProducts()).rejects.toThrow(
      'Erro ao obter os produtos: 500'
    );
    expect(console.error).toHaveBeenCalled();
  });

  test('propaga erro quando a requisicao falha', async () => {
    const error = new Error('Network error');

    global.fetch.mockRejectedValue(error);

    await expect(getProducts()).rejects.toThrow('Network error');
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao obter os produtos:',
      error
    );
  });
});
