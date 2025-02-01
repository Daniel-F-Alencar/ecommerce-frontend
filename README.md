# Frontend eCommerce

Este projeto é um frontend em Angular para uma API de eCommerce. Ele fornece uma interface moderna e responsiva para gerenciamento de produtos com autenticação.

## Funcionalidades

- Autenticação de Usuário (Login/Registro)
- Gerenciamento de Produtos:
  - Visualização de produtos em grid responsivo
  - Criação de novos produtos
  - Edição de produtos existentes
  - Exclusão de produtos
- Autenticação baseada em JWT
- Interface Material Design
- Layout responsivo
- Validação de formulários
- Tratamento de erros

## Arquitetura do Projeto

### Componentes Principais

1. **Módulo de Autenticação**
   - Componente de Login
   - Componente de Registro
   - Serviço de Autenticação para gerenciamento JWT
   - Interceptor HTTP para manipulação de tokens

2. **Módulo de Produtos**
   - Componente de Lista de Produtos
   - Diálogo de Criação de Produto
   - Diálogo de Edição de Produto
   - Serviço de Produtos

### Stack Tecnológica

- Angular 17
- Angular Material UI
- RxJS para gerenciamento de estado
- TypeScript
- SCSS para estilização

### Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── products/
│   │       ├── product-list/
│   │       ├── create-product-dialog/
│   │       └── edit-product-dialog/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── product.service.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   └── app.routes.ts
└── styles.scss
```

## Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Angular CLI (v17 ou superior)
- Servidor backend Flask em execução

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositório>
   cd eCommerce_frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

4. Abra seu navegador e acesse `http://localhost:4200`

## Configuração da API

O frontend está configurado para se conectar a um backend Flask em `http://127.0.0.1:5000`. Os seguintes endpoints são utilizados:

- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/products` - Obter todos os produtos
- `POST /api/products` - Criar novo produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Excluir produto

## Autenticação

A aplicação utiliza autenticação JWT (JSON Web Token):
1. Tokens são armazenados no localStorage
2. Requisições para endpoints protegidos incluem o token no cabeçalho Authorization
3. O interceptor de autenticação trata respostas 401/422 redirecionando para a página de login

## Componentes de Interface

A aplicação utiliza componentes do Angular Material para uma aparência consistente e moderna:
- MatCard para exibição de produtos
- MatDialog para formulários
- MatSnackBar para notificações
- MatFormField para campos de formulário
- MatButton para ações
- MatIcon para indicadores visuais

## Desenvolvimento

### Estilo de Código

- Componentes standalone
- Formulários reativos para entrada de dados
- Tipagem forte com TypeScript
- SCSS para estilização
- Metodologia BEM para classes CSS

### Gerenciamento de Estado

- Serviços para gerenciamento de dados
- Observables RxJS para operações assíncronas
- Estado local de componente quando apropriado

## Tratamento de Erros

A aplicação inclui tratamento abrangente de erros:
- Validação de formulários com feedback ao usuário
- Mensagens de erro da API exibidas aos usuários
- Tratamento de erros de autenticação
- Tratamento de erros de rede

## Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das suas alterações
4. Faça push para a branch
5. Crie um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT.
