import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import useProducts from './hooks/useProducts';
import mockProducts from './mocks/mockProducts';

jest.mock('./hooks/useProducts');

describe('App', () => {
  beforeEach(() => {
    useProducts.mockReturnValue({
      error: '',
      features: [
        'Chat ao vivo e mensagens automatizadas',
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      isLoading: false,
      preferences: [
        'Integração com chatbots',
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      products: mockProducts,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Atualiza a lista de recomendacoes ao enviar o formulario', async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText(/Integração com chatbots/i));
    userEvent.click(
      screen.getByLabelText(/Chat ao vivo e mensagens automatizadas/i)
    );
    userEvent.click(screen.getByRole('radio', { name: /Produto unico/i }));
    userEvent.click(
      screen.getByRole('button', { name: /Gerar recomendacao/i })
    );

    await waitFor(() => {
      expect(screen.getByText('RD Conversas')).toBeInTheDocument();
      expect(screen.getByText('2 criterio(s) em comum')).toBeInTheDocument();
    });
  });

  test('Atualiza a lista de recomendacoes para MultipleProducts em ordem de score', async () => {
    render(<App />);

    userEvent.click(
      screen.getByLabelText(/Integração fácil com ferramentas de e-mail/i)
    );
    userEvent.click(
      screen.getByLabelText(/Personalização de funis de vendas/i)
    );
    userEvent.click(screen.getByLabelText(/Automação de marketing/i));
    userEvent.click(
      screen.getByLabelText(/Rastreamento de interações com clientes/i)
    );
    userEvent.click(
      screen.getByLabelText(/Rastreamento de comportamento do usuário/i)
    );
    userEvent.click(screen.getByRole('radio', { name: /Lista priorizada/i }));
    userEvent.click(
      screen.getByRole('button', { name: /Gerar recomendacao/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText('RD Station CRM', {
          selector: 'h3',
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText('RD Station Marketing', {
          selector: 'h3',
        })
      ).toBeInTheDocument();

      expect(
        screen
          .getAllByRole('heading', { level: 3 })
          .map((element) => element.textContent)
      ).toEqual(['RD Station CRM', 'RD Station Marketing']);
    });
  });

  test('Recalcula a recomendacao automaticamente apos o primeiro envio', async () => {
    render(<App />);

    userEvent.click(screen.getByLabelText(/Automação de marketing/i));
    userEvent.click(screen.getByRole('radio', { name: /Produto unico/i }));
    userEvent.click(
      screen.getByRole('button', { name: /Gerar recomendacao/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText('RD Station Marketing', { selector: 'h3' })
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByLabelText(/Integração com chatbots/i));

    await waitFor(() => {
      expect(
        screen.getByText('RD Conversas', { selector: 'h3' })
      ).toBeInTheDocument();
    });
  });
});
