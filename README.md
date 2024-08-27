# TravelPlanner.io

**Descrição:** Sistema para auxiliar usuários a organizar viagens à trabalho ou lazer, permitindo o planejamento de atividades, adicionar membros e compartilhamento de links e informações.

## Requisitos Funcionais

### Gerenciamento de Viagens

- **Cadastrar Viagem:** Permite ao usuário criar uma nova viagem com informações como local de destino, data de início, data de término, e-mails dos convidados, nome completo e endereço de e-mail.
- **Atualizar Viagem:** Permite ao usuário atualizar as informações de uma viagem existente.
- **Deletar Viagem:** Permite ao usuário remover uma viagem que não é mais necessária.
- **Listar Viagens:** Permite ao usuário visualizar todas as viagens que criou ou nas quais está participando.

### Gerenciamento de Participantes

- **Confirmar Presença:** Os convidados confirmam sua presença através de um e-mail com um link de confirmação.
- **Adicionar Novo Participante:** Permite ao usuário adicionar novos participantes à viagem enviando convites por e-mail.
- **Atualizar Participante:** Permite ao usuário atualizar as informações de um participante, como nome e e-mail.
- **Deletar Participante:** Permite ao usuário remover um participante de uma viagem.

### Gerenciamento de Atividades

- **Adicionar Atividade:** Permite ao usuário adicionar atividades à página do evento, incluindo título, data e horário.
- **Atualizar Atividade:** Permite ao usuário atualizar as informações de uma atividade existente.
- **Deletar Atividade:** Permite ao usuário remover uma atividade da página do evento.
- **Listar Atividades:** Permite ao usuário visualizar todas as atividades programadas para a viagem.

### Gerenciamento de Links

- **Adicionar Link:** Permite ao usuário adicionar links importantes relacionados à viagem, como reservas de hotel, locais para visitar, etc.
- **Atualizar Link:** Permite ao usuário atualizar as informações de um link existente.
- **Deletar Link:** Permite ao usuário remover um link da página do evento.
- **Listar Links:** Permite ao usuário visualizar todos os links adicionados à viagem.

## Tecnologias Utilizadas

- **Linguagem:** Typescript v5.5.4
- **Back-End**: Node.js v20.14.0 
- **Front-End**: React
- **ORM**: Prisma v5.18.0
- **Banco de Dados:** SQLite
- **Testes:** Jest

## Regras de Programação Utilizadas

### 1. Padrão de Notação de Código CamelCase
A nomenclatura CamelCase foi utilizada para nomear variáveis e funções presentes no código, facilitando o entendimento e a pesquisa. Este padrão é comum no mundo do Desenvolvimento, garantindo consistência e clareza na estruturação dos nomes. Assim os nomes dos métodos refletem claramente as operações executadas. Por exemplo, `criarViagem()` é utilizado para criar uma nova viagem, tornando o código mais intuitivo e fácil de seguir.

### 2. Gerenciamento de Erros
Implementamos um sistema global de tratamento de erros no back-end, capturando exceções e retornando mensagens de erro significativas. O tratamento de erros foi cuidadosamente executado para garantir a robustez do sistema.

### 3. Clean Code
O código foi escrito seguindo os princípios do Clean Code, com foco em manter as funções curtas e focadas em uma única tarefa. Evitamos a duplicação de código e garantimos que variáveis, métodos e classes fossem nomeados de maneira descritiva e clara. O objetivo é que o código seja autoexplicativo e fácil de entender.

### 4. Princípios SOLID
Adotamos os princípios SOLID para criar um código mais manutenível, escalável e compreensível. Por exemplo, garantimos que cada classe tenha uma única responsabilidade, conforme o Princípio da Responsabilidade Única (Single Responsibility Principle), melhorando a organização e a estrutura do projeto.

### 5. Metodologia DRY (Don't Repeat Yourself): 
Evita a duplicação de código e Garante que a mesma lógica seja aplicada em todos os lugares, evitando comportamentos inconsistentes.

### 6. YAGNI (You Ain't Gonna Need It): 
Não implemente funcionalidades que não são necessárias no momento e que não apresentam utilidade comprovada no momento.


## Arquitetura do Projeto

Este projeto está em transição para uma **Clean Architecture**, com o objetivo de melhorar a separação de responsabilidades, facilitar a manutenção, testes e a escalabilidade do código.

### Estrutura Atual

O projeto atualmente utiliza duas abordagens de arquitetura:

### 1. Clean Architecture (Em Progresso)

- **Routes**: Responsáveis por definir os endpoints da API e lidar com as requisições HTTP.
- **Controller**: Processa as requisições recebidas pelas rotas e encaminha as chamadas para os serviços correspondentes.
- **Services**: Contêm a lógica de negócio da aplicação, abstraindo as regras de negócio e interações com os repositórios.
- **Repository**: Cuidam da comunicação com o banco de dados, garantindo que a camada de persistência esteja desacoplada das demais camadas.
- **Rotas Migradas**: Até o momento, as seguintes rotas/funções já foram migradas para a Clean Architecture:
  - `POST /viagem` - **Criar Viagem**
  - `GET /viagem/:idViagem/confirm` - **Confirmar Viagem**
  - `GET /membro/:idMembro/confirm` - **Confirmar Membros**

### 2. Arquitetura Monolítica Tradicional

- Partes do código ainda seguem um estilo monolítico, onde a lógica de negócio, validação e acesso ao banco de dados estão juntas dentro das rotas.
- **Rotas Não Migradas**: As rotas que ainda não foram migradas para a Clean Architecture seguem um modelo mais tradicional, com a lógica de validação e manipulação de dados, como a verificação da existência de uma viagem e a validade das datas, está implementada diretamente na função da rota, em vez de estar separada em services e controllers.


### Plano de Migração

O objetivo é migrar todas as funcionalidades para a **Clean Architecture**, seguindo as boas práticas de desenvolvimento de software. A migração será feita de forma incremental, garantindo que o sistema permaneça funcional e que as novas funcionalidades já sejam desenvolvidas dentro dessa nova estrutura.


## Regras de GitHub utilizadas:

### Uso de Commits Significativos
Os commits devem ter mensagens claras e descritivas, que expliquem o motivo das mudanças realizadas. As mensagens de commit devem seguir um formato padrão, como:
- **Tipo de Mudança:** Descrição breve do que foi alterado.
  - Exemplo: `feat: adicionar funcionalidade de autenticação`

### Issues e Milestones
- **Issues**: Use issues para rastrear bugs, solicitações de funcionalidades e tarefas. Cada issue deve ter uma descrição clara e, se necessário, etiquetas para categorizar o tipo de problema ou tarefa.
- **Milestones**: Utilize milestones para agrupar issues e pull requests relacionadas a um objetivo específico ou uma versão do projeto.

### Gitignore e Arquivos Sensíveis
- **.gitignore**: Utilizar um arquivo `.gitignore` para excluir arquivos e diretórios que não devem ser versionados, como arquivos de configuração local, builds e dependências.
- **Segurança**: Não incluir informações sensíveis (como senhas ou chaves de API) nos commits. Utilizar variáveis de ambiente e serviços seguros para gerenciar informações sensíveis.

### Tags e Releases
- **Tags**: Utilizar tags para marcar versões específicas do projeto. As tags devem seguir um esquema de versionamento semântico, como `v1.0.0`, `v1.1.0`, etc.
- **Releases**: Criar releases para anunciar novas versões do projeto. Cada release deve incluir um changelog detalhado com as principais mudanças desde a última versão.

### Branches e Pull Requests
- **Branches**: Utilizar branches para desenvolver novas funcionalidades ou corrigir bugs. Mantendo a branch principal `main` sempre em um estado estável.
- **Pull Requests (PRs)**: Criar pull requests para integrar mudanças ao branch principal. As PRs devem ser revisadas por pelo menos um membro da equipe antes de serem mescladas.

### Regras de Nomeação de Branches
As branches devem ser nomeadas de forma a refletir o propósito da mudança, usando um formato consistente. Exemplos de nomenclatura incluem:
- `feature/descricao-da-funcionalidade`
- `bugfix/descricao-do-bug`
- `hotfix/descricao-do-hotfix`

## Colaboradores

- Guilherme Noronha de Agostini
- Matheus Felipe Godoi Coutinho
- Pedro Otávio C. Nunes

## Como Rodar o Projeto

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/AgostiniGuilherme/Travel-Planner.git
   ```

2. **Executar back-end:**
   ```bash
   npm run dev
   ```
