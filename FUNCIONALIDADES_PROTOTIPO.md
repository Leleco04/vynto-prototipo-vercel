# Vynto - Funcionalidades do Protótipo

Este documento descreve as funcionalidades disponíveis no protótipo estático do sistema Vynto, indicando o que está funcionando com dados mockados, o que é apenas visual e o que ainda depende de backend, banco de dados ou integrações reais.

## Status Geral

O sistema está implementado como um protótipo navegável com frontend funcional e dados mockados em memória.

| Área | Status | Observação |
| --- | --- | --- |
| Navegação principal | Funcionando | Rotas e menu lateral operacionais. |
| Layout administrativo | Funcionando | Sidebar, header, cards, tabelas e abas renderizados. |
| Dados exibidos | Funcionando com mock | Dados vêm de `src/lib/mock-data.ts`. |
| Criação de registros | Parcial com mock | Alguns formulários adicionam dados em memória durante a sessão. |
| Persistência real | Não implementado | Ao recarregar a página, dados criados em memória são perdidos. |
| Banco de dados | Não implementado | Ainda não há modelagem, migrations ou conexão. |
| Backend/API real | Não implementado | `src/lib/api/index.ts` simula chamadas assíncronas. |
| Autenticação | Não implementado | Usuário exibido é mockado. |
| Permissões | Não implementado | Perfis e cargos são apenas demonstrativos. |
| Relatórios/PDF | Visual/simulado | Geração de receita apenas mostra toast informativo. |

## Fonte dos Dados Mockados

Os dados do protótipo ficam centralizados em:

- `src/lib/mock-data.ts`

Esse arquivo contém:

- Veterinários
- Tutores
- Pacientes
- Agendamentos
- Consultas/prontuários
- Vacinas
- Itens de estoque
- Lançamentos financeiros
- Usuários
- Dados da clínica

A camada `src/lib/api/index.ts` consome esses dados e simula chamadas assíncronas com pequeno atraso.

## Funcionalidades por Módulo

### 1. Dashboard

Rota: `/`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Cards de indicadores | Funcionando com mock | Exibe consultas do dia, faturamento, animais cadastrados e vacinas a vencer. |
| Gráfico de consultas por dia | Funcionando com mock | Dados fixos por dia da semana. |
| Gráfico de distribuição por espécie | Funcionando com mock | Calculado a partir dos pacientes mockados. |
| Lista de próximos agendamentos | Funcionando com mock | Mostra os primeiros agendamentos mockados. |
| Saudação personalizada | Mock visual | Exibe `Dr. Carlos` como usuário fixo. |

### 2. Agenda

Rota: `/agenda`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Visualização semanal | Funcionando com mock | Grade por dias e horários. |
| Listagem de agendamentos | Funcionando com mock | Usa agendamentos mockados. |
| Status do agendamento | Funcionando com mock | Exibe Confirmado, Pendente ou Cancelado. |
| Modal de novo agendamento | Funcionando parcialmente | Formulário abre e valida campos. |
| Criar agendamento | Funcionando em memória | Adiciona à lista atual, mas não persiste após reload. |
| Seleção de pet | Funcionando com mock | Lista pacientes mockados. |
| Seleção de veterinário | Funcionando com mock | Lista veterinários mockados. |

### 3. Pacientes

Rota: `/pacientes`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Lista de pacientes | Funcionando com mock | Tabela preenchida com pacientes mockados. |
| Busca por pet ou tutor | Funcionando no frontend | Filtra dados mockados localmente. |
| Filtro por espécie | Funcionando no frontend | Filtra Cão, Gato ou Outro. |
| Navegação para perfil | Funcionando | Clique na linha abre `/pacientes/$id`. |
| Botão Ver perfil | Visual/navegação por linha | O clique da linha realiza a navegação. |
| Cadastro de paciente | Não implementado | Não há formulário de criação nesta tela. |

### 4. Perfil do Paciente

Rota: `/pacientes/$id`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Dados do pet | Funcionando com mock | Exibe espécie, raça, idade, peso, cor e microchip. |
| Dados do tutor | Funcionando com mock | Exibe nome, telefone e email. |
| Histórico de consultas | Funcionando com mock | Lista consultas vinculadas ao paciente. |
| Vacinas | Funcionando com mock | Lista vacinas vinculadas ao paciente. |
| Aba Exames | Visual estático | Mostra estado vazio. |
| Aba Documentos | Visual estático | Mostra estado vazio. |
| Botão Nova consulta | Visual | Não executa ação real. |

### 5. Prontuário

Rota: `/prontuario`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Formulário de nova consulta | Funcionando parcialmente | Valida campos e envia para API mockada. |
| Seleção de pet | Funcionando com mock | Usa pacientes mockados. |
| Seleção de veterinário | Funcionando com mock | Usa veterinários mockados. |
| Salvar prontuário | Funcionando em memória | Adiciona consulta à lista durante a sessão. |
| Últimos prontuários | Funcionando com mock | Lista consultas mockadas e criadas em memória. |
| Gerar receita PDF | Simulado | Mostra toast `Receita gerada (mock)`, sem gerar arquivo. |

### 6. Estoque

Rota: `/estoque`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Indicadores de estoque | Funcionando com mock | Total, itens em baixa e itens críticos. |
| Tabela de produtos | Funcionando com mock | Lista produtos e insumos mockados. |
| Cálculo de status | Funcionando no frontend | Classifica como OK, Baixo ou Crítico. |
| Modal de novo item | Funcionando parcialmente | Formulário abre e valida campos. |
| Adicionar item | Funcionando em memória | Adiciona item durante a sessão, sem persistência real. |

### 7. Financeiro

Rota: `/financeiro`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Indicadores financeiros | Funcionando com mock | Receita do mês, a receber e inadimplência. |
| Tabela de lançamentos | Funcionando com mock | Exibe lançamentos financeiros mockados. |
| Filtro por status | Funcionando no frontend | Filtra Todos, Pagos, Pendentes e Atrasados. |
| Cadastro de lançamento | Não implementado | Não há formulário de criação. |
| Integração de pagamentos | Não implementado | Sem gateway, boletos, PIX ou emissão fiscal. |

### 8. Configurações

Rota: `/configuracoes`

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Aba Clínica | Funcionando visualmente | Campos preenchidos com dados mockados da clínica. |
| Salvar alterações | Simulado | Mostra toast de sucesso, mas não persiste. |
| Aba Usuários | Funcionando com mock | Lista usuários mockados. |
| Status de usuário | Funcionando com mock | Exibe ativo/inativo. |
| Editar usuário | Visual | Botão não executa edição real. |
| Aba Notificações | Visual/interativa | Switches funcionam visualmente, sem persistência. |
| Alertas automáticos | Não implementado | Sem envio real de email, SMS, WhatsApp ou push. |

### 9. Layout e Navegação

| Funcionalidade | Status | Observação |
| --- | --- | --- |
| Menu lateral | Funcionando | Navega entre os módulos principais. |
| Estado ativo do menu | Funcionando | Destaca rota atual. |
| Header com nome da clínica | Funcionando com mock | Usa dados mockados da clínica. |
| Sino de notificações | Visual | Ícone exibido com indicador, sem painel ou notificações reais. |
| Usuário no rodapé da sidebar | Mock visual | Exibe `Dr. Carlos Silva` fixo. |

## O que está funcionando de fato no protótipo

- Navegação entre páginas.
- Renderização das telas principais.
- Listagens com dados mockados.
- Filtros locais em pacientes e financeiro.
- Gráficos e indicadores baseados em mocks.
- Criação em memória de:
  - Agendamentos
  - Consultas/prontuários
  - Itens de estoque
- Feedback visual com toasts.
- Estados de status com badges.

## O que não está implementado ainda

- Banco de dados real.
- Backend real.
- Autenticação e sessão.
- Controle de permissões por cargo.
- Persistência permanente de cadastros.
- CRUD completo de pacientes, tutores, veterinários, usuários e lançamentos financeiros.
- Upload real de logo, documentos, exames ou anexos.
- Geração real de PDF.
- Notificações automáticas.
- Integrações externas.
- Auditoria, logs e histórico de alterações.
- Validações de regra de negócio no servidor.

## Observações para Apresentação

Este protótipo deve ser apresentado como uma visão estática/interativa do produto, adequada para demonstrar fluxo, layout, módulos e experiência geral.

Durante a apresentação, é importante deixar claro que:

- Os dados são fictícios.
- As telas representam a experiência planejada.
- Algumas ações funcionam apenas durante a sessão atual.
- Não existe persistência real.
- A próxima etapa técnica é implementar backend, banco de dados e autenticação.

## Próximas Etapas Recomendadas

1. Definir banco de dados e modelo relacional.
2. Criar entidades principais: clínicas, usuários, tutores, pacientes, consultas, agendamentos, estoque e financeiro.
3. Implementar autenticação.
4. Substituir `src/lib/api/index.ts` por chamadas reais ao backend.
5. Transformar os formulários mockados em CRUDs completos.
6. Implementar uploads, documentos e geração de PDFs.
7. Implementar permissões por perfil.
8. Adicionar testes e validações de regras de negócio.
