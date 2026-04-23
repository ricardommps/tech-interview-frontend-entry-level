import getProducts, { DEFAULT_API_URL } from './product.service';

describe('product.service', () => {
  const originalFetch = global.fetch;
  const originalConsoleError = console.error;
  const originalApiUrl = process.env.REACT_APP_API_URL;

  beforeEach(() => {
    global.fetch = jest.fn();
    console.error = jest.fn();
    delete process.env.REACT_APP_API_URL;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.error = originalConsoleError;
    if (originalApiUrl === undefined) {
      delete process.env.REACT_APP_API_URL;
    } else {
      process.env.REACT_APP_API_URL = originalApiUrl;
    }
    jest.clearAllMocks();
  });

  test('retorna a lista de produtos quando a requisicao tem sucesso', async () => {
    const mockResponse = [{ id: 1, name: 'RD Station CRM' }];

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    await expect(getProducts()).resolves.toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`${DEFAULT_API_URL}/products`, {});
  });

  test('usa REACT_APP_API_URL quando a variavel estiver configurada', async () => {
    process.env.REACT_APP_API_URL = 'http://localhost:4000/';

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    await getProducts();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/products', {});
  });

  test('encaminha opcoes da requisicao para o fetch', async () => {
    const signal = new AbortController().signal;

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    await getProducts({ signal });

    expect(global.fetch).toHaveBeenCalledWith(`${DEFAULT_API_URL}/products`, {
      signal,
    });
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
