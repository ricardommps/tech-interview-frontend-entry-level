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
