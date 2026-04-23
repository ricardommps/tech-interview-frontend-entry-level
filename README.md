# Recomendador de Produtos RD Station

Implementacao do desafio tecnico de frontend da RD Station com foco em legibilidade, previsibilidade da regra de negocio e usabilidade da interface.

## Stack

- React 18
- json-server
- Tailwind CSS
- Testing Library + Jest

## Requisitos de ambiente

- Node.js `18.3` ou superior
- Yarn `1.x`

## Configuracao da API

Por padrao, o frontend consulta o backend em `http://localhost:3001`.

Se quiser apontar para outra URL, defina a variavel `REACT_APP_API_URL` antes de iniciar o frontend. Exemplo:

```bash
cd frontend
REACT_APP_API_URL=http://localhost:3001 yarn start
```

Se preferir, tambem pode criar um arquivo `frontend/.env` com:

```bash
REACT_APP_API_URL=http://localhost:3001
```

Existe um exemplo versionado em [frontend/.env.example](frontend/.env.example). Se quiser, basta usá-lo como base para criar o `frontend/.env`.

Essa configuracao e usada pelo service em [frontend/src/services/product.service.js](frontend/src/services/product.service.js).

## Como executar

1. Instale as dependencias:

```bash
./install.sh
```

2. Inicie frontend e backend juntos:

```bash
yarn start
```

3. Se preferir, rode cada parte separadamente:

```bash
yarn start:frontend
yarn start:backend
```

## Testes

Para executar a suite do frontend:

```bash
cd frontend
CI=true yarn test --watchAll=false
```

Para gerar o relatorio de cobertura:

```bash
yarn test:coverage
```

## O que foi implementado

- Regra de recomendacao deterministica com suporte a `SingleProduct` e `MultipleProducts`
- Desempate em `SingleProduct` retornando o ultimo produto valido
- Ranking por score de aderencia com detalhamento de preferencias e funcionalidades atendidas
- Formulario controlado e reutilizavel com `PropTypes`
- Layout responsivo com Tailwind CSS e estados de loading, erro e vazio
- Coleta de preferencias e funcionalidades de forma estavel, sem aleatoriedade
- Testes cobrindo fluxo da UI e cenarios centrais do servico
- Configuracao da API via `REACT_APP_API_URL`
- Carga de produtos com cancelamento seguro da requisicao ao desmontar a tela
- Melhor feedback visual para navegacao por teclado nos cards de selecao

## Informacoes para avaliacao

### Arquivos principais

- `frontend/src/services/recommendation.service.js`
  Concentra a regra de negocio da recomendacao.

- `frontend/src/components/Form/Form.js`
  Controla o formulario e dispara a geracao do resultado.

- `frontend/src/components/RecommendationList/RecommendationList.js`
  Renderiza os produtos recomendados e os detalhes do match.

- `frontend/src/hooks/useProducts.js`
  Busca os produtos na API e deriva as opcoes de preferencias e funcionalidades.

- `frontend/src/services/product.service.js`
  Faz a chamada ao `json-server` usando `fetch`.

### Decisoes de implementacao

- A recomendacao so muda quando o usuario clica em `Gerar recomendacao`.
  Isso deixa o comportamento mais previsivel e coerente com a presenca do botao no fluxo.

- A regra foi mantida separada da interface.
  A UI coleta os dados e exibe o resultado; a decisao fica centralizada no service.

- A lista de preferencias e funcionalidades nao ficou hardcoded.
  As opcoes sao derivadas do catalogo retornado pela API.

- A URL da API pode ser configurada com `REACT_APP_API_URL`.
  O projeto tambem inclui o arquivo `frontend/.env.example`.

### Interface

- O layout foi ajustado para funcionar melhor em larguras intermediarias.
- Os cards de selecao receberam refinamentos de espacamento e foco visivel.
- O resumo do formulario foi reorganizado para evitar textos espremidos.
- O formato exibido na interface ficou com rotulos mais amigaveis: `Produto unico` e `Lista priorizada`.

### Testes e validacao

Foram adicionados testes para:

- `recommendation.service`
- `product.service`
- `useProducts`
- fluxo principal da aplicacao em `App.test.js`

Cenarios cobertos:

- `SingleProduct`
- `MultipleProducts`
- desempate
- ausencia de criterios
- tipo invalido
- erro no carregamento dos produtos
- manutencao do resultado atual ate um novo submit
- troca de formato sem alterar o resultado antes de novo clique em `Gerar recomendacao`

Validacoes executadas:

```bash
cd frontend
yarn test --watchAll=false
yarn build
```

## Regras de negocio adotadas

- Cada preferencia selecionada e cada funcionalidade selecionada valem `1 ponto`
- Produtos com `score = 0` nao entram na recomendacao
- `MultipleProducts` retorna todos os produtos validos ordenados por score descrescente
- Empates em `MultipleProducts` preservam a ordem original do catalogo
- Empates em `SingleProduct` retornam o ultimo produto entre os empatados
- Sem tipo de recomendacao ou sem criterios selecionados, o retorno e vazio

## Estrutura principal

- `frontend/src/services/recommendation.service.js`: regra de recomendacao
- `frontend/src/components/Form/Form.js`: fluxo do formulario e integracao com a lista
- `frontend/src/components/RecommendationList/RecommendationList.js`: apresentacao das recomendacoes
- `frontend/src/hooks/useProducts.js`: carga e normalizacao dos dados do catalogo

## Observacoes

- O projeto foi mantido com foco em clareza de leitura e extensibilidade da regra de negocio.
- A interface utiliza classes utilitarias do Tailwind para todo o styling novo adicionado.

## Licenca

Este projeto esta licenciado sob a [Licenca MIT](LICENSE).
