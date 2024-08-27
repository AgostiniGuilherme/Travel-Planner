# TravelPlanner.io

**Descrição:** Sistema para auxiliar usuários a organizar viagens à trabalho ou lazer, permitindo o planejamento de atividades e compartilhamento de informações.

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
- **Back-End: Node.js v20.14.0 
- **Front-End: React
- **ORM**: Prisma v5.18.0
- **Banco de Dados:** SQLite
- **Testes:** Jest

## Regras de GitHub utilizadas:

- **Trabalho por meio de branches:** Foram criadas novas branchs para cada feature ou correção de Projeto,isolando as mudanças e facilitando o merge.
- **Trabalho por meio de branches:** Escrita de mensagens de commit claras e informativas: As mensagens de commit devem explicar o que foi feito e por quê.

- **Trabalho por meio de branches:** Conflitos resolvidos antes de fazer merge: Conflitos de merge devem ser resolvidos cuidadosamente para evitar introduzir bugs.
  
- **Trabalho por meio de branches:** Manter a branch principal sempre estável: A branch principal deve conter apenas código que esteja pronto para produção.

## Regras de Programação Utilizadas

### 1. Padrão de Notação de Código CamelCase
A nomenclatura CamelCase foi utilizada para nomear variáveis e funções presentes no código, facilitando o entendimento e a pesquisa. Este padrão é comum no mundo do Desenvolvimento, garantindo consistência e clareza na estruturação dos nomes. Assim os nomes dos métodos refletem claramente as operações executadas. Por exemplo, `criarViagem()` é utilizado para criar uma nova viagem, tornando o código mais intuitivo e fácil de seguir.

### 2. Gerenciamento de Erros
Implementamos um sistema global de tratamento de erros no back-end, capturando exceções e retornando mensagens de erro significativas. O tratamento de erros foi cuidadosamente executado para garantir a robustez do sistema.

### 3. Clean Code
O código foi escrito seguindo os princípios do Clean Code, com foco em manter as funções curtas e focadas em uma única tarefa. Evitamos a duplicação de código e garantimos que variáveis, métodos e classes fossem nomeados de maneira descritiva e clara. O objetivo é que o código seja autoexplicativo e fácil de entender.

### 4. Princípios SOLID
Adotamos os princípios SOLID para criar um código mais manutenível, escalável e compreensível. Por exemplo, garantimos que cada classe tenha uma única responsabilidade, conforme o Princípio da Responsabilidade Única (Single Responsibility Principle), melhorando a organização e a estrutura do projeto.

## Colaboradores

- Guilherme Noronha de Agostini
- Matheus Felipe Godoi Coutinho
- Pedro Otávio C. Nunes

## Como Rodar o Projeto

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/AgostiniGuilherme/Travel-Planner.git
   ```

2.  **Executar back-end:**
   ```bash
   npm run dev
   ```
