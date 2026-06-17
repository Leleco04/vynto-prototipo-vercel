import { addDays, format, startOfWeek } from "date-fns";

export type Status = "Confirmado" | "Pendente" | "Cancelado";
export type Especie = "Cão" | "Gato" | "Outro";

export interface Veterinario {
  id: string;
  nome: string;
  crmv: string;
  especialidade: string;
}

export interface Tutor {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

export interface Paciente {
  id: string;
  nome: string;
  especie: Especie;
  raca: string;
  idade: string;
  peso: string;
  microchip: string;
  sexo: "Macho" | "Fêmea";
  cor: string;
  fotoIniciais: string;
  tutor: Tutor;
  ultimoAtendimento: string;
}

export interface Agendamento {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  tutorNome: string;
  veterinarioId: string;
  veterinarioNome: string;
  tipo: string;
  data: string;
  horario: string;
  status: Status;
}

export interface Consulta {
  id: string;
  pacienteId: string;
  data: string;
  veterinarioNome: string;
  queixa: string;
  diagnostico: string;
  prescricao: string;
  observacoes?: string;
}

export interface Vacina {
  id: string;
  pacienteId: string;
  nome: string;
  data: string;
  proxima: string;
  veterinario: string;
}

export interface ItemEstoque {
  id: string;
  produto: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  minimo: number;
}

export interface Lancamento {
  id: string;
  data: string;
  descricao: string;
  cliente: string;
  valor: number;
  status: "Pago" | "Pendente" | "Atrasado";
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: "Admin" | "Veterinário" | "Recepção";
  ativo: boolean;
}

export const veterinarios: Veterinario[] = [
  { id: "v1", nome: "Dr. Carlos Silva", crmv: "CRMV-SP 12345", especialidade: "Clínica Geral" },
  { id: "v2", nome: "Dra. Ana Souza", crmv: "CRMV-SP 23456", especialidade: "Dermatologia" },
  { id: "v3", nome: "Dr. Pedro Lima", crmv: "CRMV-SP 34567", especialidade: "Cirurgia" },
];

const tutores: Tutor[] = [
  { id: "t1", nome: "Mariana Oliveira", telefone: "(11) 98765-4321", email: "mariana@email.com" },
  { id: "t2", nome: "João Pereira", telefone: "(11) 99876-5432", email: "joao@email.com" },
  { id: "t3", nome: "Camila Santos", telefone: "(11) 97654-3210", email: "camila@email.com" },
  { id: "t4", nome: "Rafael Costa", telefone: "(11) 96543-2109", email: "rafael@email.com" },
  { id: "t5", nome: "Beatriz Almeida", telefone: "(11) 95432-1098", email: "beatriz@email.com" },
  { id: "t6", nome: "Lucas Fernandes", telefone: "(11) 94321-0987", email: "lucas@email.com" },
  { id: "t7", nome: "Patrícia Ramos", telefone: "(11) 93210-9876", email: "patricia@email.com" },
  { id: "t8", nome: "Thiago Martins", telefone: "(11) 92109-8765", email: "thiago@email.com" },
];

export const pacientes: Paciente[] = [
  {
    id: "p1",
    nome: "Rex",
    especie: "Cão",
    raca: "Labrador",
    idade: "5 anos",
    peso: "28 kg",
    microchip: "982000123456789",
    sexo: "Macho",
    cor: "Caramelo",
    fotoIniciais: "RX",
    tutor: tutores[0],
    ultimoAtendimento: "2026-06-10",
  },
  {
    id: "p2",
    nome: "Mimi",
    especie: "Gato",
    raca: "Persa",
    idade: "3 anos",
    peso: "4.2 kg",
    microchip: "982000123456790",
    sexo: "Fêmea",
    cor: "Branco",
    fotoIniciais: "MI",
    tutor: tutores[1],
    ultimoAtendimento: "2026-06-12",
  },
  {
    id: "p3",
    nome: "Bolinha",
    especie: "Cão",
    raca: "Poodle",
    idade: "8 anos",
    peso: "7 kg",
    microchip: "982000123456791",
    sexo: "Macho",
    cor: "Branco",
    fotoIniciais: "BO",
    tutor: tutores[2],
    ultimoAtendimento: "2026-05-28",
  },
  {
    id: "p4",
    nome: "Thor",
    especie: "Cão",
    raca: "Golden Retriever",
    idade: "2 anos",
    peso: "32 kg",
    microchip: "982000123456792",
    sexo: "Macho",
    cor: "Dourado",
    fotoIniciais: "TH",
    tutor: tutores[3],
    ultimoAtendimento: "2026-06-14",
  },
  {
    id: "p5",
    nome: "Luna",
    especie: "Gato",
    raca: "Siamês",
    idade: "4 anos",
    peso: "3.8 kg",
    microchip: "982000123456793",
    sexo: "Fêmea",
    cor: "Cinza",
    fotoIniciais: "LU",
    tutor: tutores[4],
    ultimoAtendimento: "2026-06-09",
  },
  {
    id: "p6",
    nome: "Nina",
    especie: "Cão",
    raca: "Yorkshire",
    idade: "6 anos",
    peso: "3.5 kg",
    microchip: "982000123456794",
    sexo: "Fêmea",
    cor: "Marrom",
    fotoIniciais: "NI",
    tutor: tutores[5],
    ultimoAtendimento: "2026-06-15",
  },
  {
    id: "p7",
    nome: "Simba",
    especie: "Gato",
    raca: "Maine Coon",
    idade: "1 ano",
    peso: "5.5 kg",
    microchip: "982000123456795",
    sexo: "Macho",
    cor: "Laranja",
    fotoIniciais: "SI",
    tutor: tutores[6],
    ultimoAtendimento: "2026-06-05",
  },
  {
    id: "p8",
    nome: "Mel",
    especie: "Outro",
    raca: "Coelho Holandês",
    idade: "2 anos",
    peso: "1.8 kg",
    microchip: "982000123456796",
    sexo: "Fêmea",
    cor: "Preto e branco",
    fotoIniciais: "ME",
    tutor: tutores[7],
    ultimoAtendimento: "2026-06-11",
  },
];

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 1 });
const iso = (d: Date) => format(d, "yyyy-MM-dd");

export const agendamentos: Agendamento[] = [
  {
    id: "a1",
    pacienteId: "p1",
    pacienteNome: "Rex",
    tutorNome: "Mariana Oliveira",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Consulta de rotina",
    data: iso(weekStart),
    horario: "08:00",
    status: "Confirmado",
  },
  {
    id: "a2",
    pacienteId: "p2",
    pacienteNome: "Mimi",
    tutorNome: "João Pereira",
    veterinarioId: "v2",
    veterinarioNome: "Dra. Ana Souza",
    tipo: "Dermatologia",
    data: iso(weekStart),
    horario: "10:30",
    status: "Confirmado",
  },
  {
    id: "a3",
    pacienteId: "p3",
    pacienteNome: "Bolinha",
    tutorNome: "Camila Santos",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Vacinação",
    data: iso(weekStart),
    horario: "14:00",
    status: "Pendente",
  },
  {
    id: "a4",
    pacienteId: "p4",
    pacienteNome: "Thor",
    tutorNome: "Rafael Costa",
    veterinarioId: "v3",
    veterinarioNome: "Dr. Pedro Lima",
    tipo: "Cirurgia castração",
    data: iso(addDays(weekStart, 1)),
    horario: "09:00",
    status: "Confirmado",
  },
  {
    id: "a5",
    pacienteId: "p5",
    pacienteNome: "Luna",
    tutorNome: "Beatriz Almeida",
    veterinarioId: "v2",
    veterinarioNome: "Dra. Ana Souza",
    tipo: "Retorno",
    data: iso(addDays(weekStart, 1)),
    horario: "11:00",
    status: "Confirmado",
  },
  {
    id: "a6",
    pacienteId: "p6",
    pacienteNome: "Nina",
    tutorNome: "Lucas Fernandes",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Banho terapêutico",
    data: iso(addDays(weekStart, 2)),
    horario: "08:30",
    status: "Cancelado",
  },
  {
    id: "a7",
    pacienteId: "p7",
    pacienteNome: "Simba",
    tutorNome: "Patrícia Ramos",
    veterinarioId: "v2",
    veterinarioNome: "Dra. Ana Souza",
    tipo: "Consulta de rotina",
    data: iso(addDays(weekStart, 2)),
    horario: "15:00",
    status: "Confirmado",
  },
  {
    id: "a8",
    pacienteId: "p8",
    pacienteNome: "Mel",
    tutorNome: "Thiago Martins",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Check-up",
    data: iso(addDays(weekStart, 3)),
    horario: "10:00",
    status: "Pendente",
  },
  {
    id: "a9",
    pacienteId: "p1",
    pacienteNome: "Rex",
    tutorNome: "Mariana Oliveira",
    veterinarioId: "v3",
    veterinarioNome: "Dr. Pedro Lima",
    tipo: "Exame de imagem",
    data: iso(addDays(weekStart, 3)),
    horario: "13:00",
    status: "Confirmado",
  },
  {
    id: "a10",
    pacienteId: "p4",
    pacienteNome: "Thor",
    tutorNome: "Rafael Costa",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Retorno",
    data: iso(addDays(weekStart, 4)),
    horario: "09:30",
    status: "Confirmado",
  },
  {
    id: "a11",
    pacienteId: "p2",
    pacienteNome: "Mimi",
    tutorNome: "João Pereira",
    veterinarioId: "v2",
    veterinarioNome: "Dra. Ana Souza",
    tipo: "Vacinação V4",
    data: iso(addDays(weekStart, 4)),
    horario: "11:30",
    status: "Pendente",
  },
  {
    id: "a12",
    pacienteId: "p5",
    pacienteNome: "Luna",
    tutorNome: "Beatriz Almeida",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Consulta",
    data: iso(addDays(weekStart, 4)),
    horario: "16:00",
    status: "Confirmado",
  },
  {
    id: "a13",
    pacienteId: "p6",
    pacienteNome: "Nina",
    tutorNome: "Lucas Fernandes",
    veterinarioId: "v3",
    veterinarioNome: "Dr. Pedro Lima",
    tipo: "Cirurgia dental",
    data: iso(addDays(weekStart, 5)),
    horario: "08:00",
    status: "Confirmado",
  },
  {
    id: "a14",
    pacienteId: "p7",
    pacienteNome: "Simba",
    tutorNome: "Patrícia Ramos",
    veterinarioId: "v1",
    veterinarioNome: "Dr. Carlos Silva",
    tipo: "Retorno",
    data: iso(addDays(weekStart, 5)),
    horario: "14:30",
    status: "Confirmado",
  },
  {
    id: "a15",
    pacienteId: "p8",
    pacienteNome: "Mel",
    tutorNome: "Thiago Martins",
    veterinarioId: "v2",
    veterinarioNome: "Dra. Ana Souza",
    tipo: "Consulta exótico",
    data: iso(addDays(weekStart, 6)),
    horario: "10:00",
    status: "Pendente",
  },
];

export const consultas: Consulta[] = [
  {
    id: "c1",
    pacienteId: "p1",
    data: "2026-06-10",
    veterinarioNome: "Dr. Carlos Silva",
    queixa: "Coceira nas patas",
    diagnostico: "Dermatite alérgica",
    prescricao: "Apoquel 16mg 1x ao dia por 14 dias",
    observacoes: "Reavaliar em 15 dias",
  },
  {
    id: "c2",
    pacienteId: "p1",
    data: "2026-04-22",
    veterinarioNome: "Dr. Carlos Silva",
    queixa: "Check-up anual",
    diagnostico: "Saudável",
    prescricao: "Vacina V10 aplicada",
  },
  {
    id: "c3",
    pacienteId: "p2",
    data: "2026-06-12",
    veterinarioNome: "Dra. Ana Souza",
    queixa: "Perda de pelo",
    diagnostico: "Dermatofitose",
    prescricao: "Itraconazol 50mg 1x ao dia por 30 dias",
  },
  {
    id: "c4",
    pacienteId: "p4",
    data: "2026-06-14",
    veterinarioNome: "Dr. Pedro Lima",
    queixa: "Avaliação pré-cirúrgica",
    diagnostico: "Apto para castração",
    prescricao: "Jejum 12h antes do procedimento",
  },
  {
    id: "c5",
    pacienteId: "p5",
    data: "2026-06-09",
    veterinarioNome: "Dra. Ana Souza",
    queixa: "Vômito recorrente",
    diagnostico: "Gastrite leve",
    prescricao: "Omeprazol 10mg 1x ao dia por 7 dias",
  },
];

export const vacinas: Vacina[] = [
  {
    id: "vc1",
    pacienteId: "p1",
    nome: "V10",
    data: "2026-04-22",
    proxima: "2027-04-22",
    veterinario: "Dr. Carlos Silva",
  },
  {
    id: "vc2",
    pacienteId: "p1",
    nome: "Antirrábica",
    data: "2026-04-22",
    proxima: "2027-04-22",
    veterinario: "Dr. Carlos Silva",
  },
  {
    id: "vc3",
    pacienteId: "p2",
    nome: "V4",
    data: "2025-12-15",
    proxima: "2026-12-15",
    veterinario: "Dra. Ana Souza",
  },
  {
    id: "vc4",
    pacienteId: "p4",
    nome: "V10",
    data: "2025-08-10",
    proxima: "2026-08-10",
    veterinario: "Dr. Carlos Silva",
  },
];

export const itensEstoque: ItemEstoque[] = [
  {
    id: "e1",
    produto: "Vacina V10",
    categoria: "Vacinas",
    quantidade: 45,
    unidade: "doses",
    minimo: 20,
  },
  {
    id: "e2",
    produto: "Vacina Antirrábica",
    categoria: "Vacinas",
    quantidade: 12,
    unidade: "doses",
    minimo: 15,
  },
  {
    id: "e3",
    produto: "Apoquel 16mg",
    categoria: "Medicamentos",
    quantidade: 80,
    unidade: "comprimidos",
    minimo: 30,
  },
  {
    id: "e4",
    produto: "Omeprazol 10mg",
    categoria: "Medicamentos",
    quantidade: 4,
    unidade: "comprimidos",
    minimo: 20,
  },
  {
    id: "e5",
    produto: "Itraconazol 50mg",
    categoria: "Medicamentos",
    quantidade: 25,
    unidade: "comprimidos",
    minimo: 10,
  },
  {
    id: "e6",
    produto: "Ração Premium Cães 15kg",
    categoria: "Alimentação",
    quantidade: 8,
    unidade: "sacos",
    minimo: 5,
  },
  {
    id: "e7",
    produto: "Ração Filhotes Gatos 1kg",
    categoria: "Alimentação",
    quantidade: 2,
    unidade: "sacos",
    minimo: 6,
  },
  {
    id: "e8",
    produto: "Shampoo Dermatológico",
    categoria: "Higiene",
    quantidade: 14,
    unidade: "frascos",
    minimo: 5,
  },
  {
    id: "e9",
    produto: "Soro Fisiológico 500ml",
    categoria: "Insumos",
    quantidade: 50,
    unidade: "unidades",
    minimo: 20,
  },
  {
    id: "e10",
    produto: "Seringa 5ml",
    categoria: "Insumos",
    quantidade: 120,
    unidade: "unidades",
    minimo: 50,
  },
  {
    id: "e11",
    produto: "Luvas Procedimento M",
    categoria: "Insumos",
    quantidade: 3,
    unidade: "caixas",
    minimo: 10,
  },
  {
    id: "e12",
    produto: "Antipulgas Bravecto",
    categoria: "Medicamentos",
    quantidade: 18,
    unidade: "comprimidos",
    minimo: 8,
  },
  {
    id: "e13",
    produto: "Vermífugo Drontal",
    categoria: "Medicamentos",
    quantidade: 30,
    unidade: "comprimidos",
    minimo: 15,
  },
  {
    id: "e14",
    produto: "Algodão Hidrófilo",
    categoria: "Insumos",
    quantidade: 22,
    unidade: "pacotes",
    minimo: 10,
  },
  {
    id: "e15",
    produto: "Esparadrapo",
    categoria: "Insumos",
    quantidade: 1,
    unidade: "rolos",
    minimo: 5,
  },
  {
    id: "e16",
    produto: "Anestésico Local",
    categoria: "Medicamentos",
    quantidade: 7,
    unidade: "frascos",
    minimo: 4,
  },
  {
    id: "e17",
    produto: "Coleira Elizabetana M",
    categoria: "Acessórios",
    quantidade: 9,
    unidade: "unidades",
    minimo: 4,
  },
  {
    id: "e18",
    produto: "Areia Higiênica 4kg",
    categoria: "Higiene",
    quantidade: 16,
    unidade: "pacotes",
    minimo: 8,
  },
  {
    id: "e19",
    produto: "Petisco Dental",
    categoria: "Alimentação",
    quantidade: 0,
    unidade: "pacotes",
    minimo: 5,
  },
  {
    id: "e20",
    produto: "Antibiótico Amoxicilina",
    categoria: "Medicamentos",
    quantidade: 40,
    unidade: "comprimidos",
    minimo: 20,
  },
];

export function statusEstoque(item: ItemEstoque): "OK" | "Baixo" | "Crítico" {
  if (item.quantidade === 0 || item.quantidade < item.minimo * 0.3) return "Crítico";
  if (item.quantidade < item.minimo) return "Baixo";
  return "OK";
}

export const lancamentos: Lancamento[] = [
  {
    id: "l1",
    data: "2026-06-01",
    descricao: "Consulta de rotina",
    cliente: "Mariana Oliveira",
    valor: 180,
    status: "Pago",
  },
  {
    id: "l2",
    data: "2026-06-02",
    descricao: "Vacina V10",
    cliente: "Camila Santos",
    valor: 120,
    status: "Pago",
  },
  {
    id: "l3",
    data: "2026-06-03",
    descricao: "Cirurgia de castração",
    cliente: "Rafael Costa",
    valor: 850,
    status: "Pago",
  },
  {
    id: "l4",
    data: "2026-06-04",
    descricao: "Consulta dermatológica",
    cliente: "João Pereira",
    valor: 220,
    status: "Pendente",
  },
  {
    id: "l5",
    data: "2026-06-05",
    descricao: "Banho e tosa",
    cliente: "Beatriz Almeida",
    valor: 95,
    status: "Pago",
  },
  {
    id: "l6",
    data: "2026-06-06",
    descricao: "Exame de sangue completo",
    cliente: "Lucas Fernandes",
    valor: 240,
    status: "Atrasado",
  },
  {
    id: "l7",
    data: "2026-06-07",
    descricao: "Vacina Antirrábica",
    cliente: "Patrícia Ramos",
    valor: 90,
    status: "Pago",
  },
  {
    id: "l8",
    data: "2026-06-08",
    descricao: "Consulta de retorno",
    cliente: "Thiago Martins",
    valor: 80,
    status: "Pago",
  },
  {
    id: "l9",
    data: "2026-06-09",
    descricao: "Ultrassom abdominal",
    cliente: "Mariana Oliveira",
    valor: 320,
    status: "Pendente",
  },
  {
    id: "l10",
    data: "2026-06-10",
    descricao: "Cirurgia dental",
    cliente: "Lucas Fernandes",
    valor: 1200,
    status: "Atrasado",
  },
  {
    id: "l11",
    data: "2026-06-11",
    descricao: "Vermifugação",
    cliente: "Thiago Martins",
    valor: 60,
    status: "Pago",
  },
  {
    id: "l12",
    data: "2026-06-12",
    descricao: "Consulta dermatológica",
    cliente: "João Pereira",
    valor: 220,
    status: "Pago",
  },
  {
    id: "l13",
    data: "2026-06-13",
    descricao: "Pacote check-up",
    cliente: "Camila Santos",
    valor: 480,
    status: "Pendente",
  },
  {
    id: "l14",
    data: "2026-06-14",
    descricao: "Avaliação pré-cirúrgica",
    cliente: "Rafael Costa",
    valor: 150,
    status: "Pago",
  },
  {
    id: "l15",
    data: "2026-06-15",
    descricao: "Banho terapêutico",
    cliente: "Lucas Fernandes",
    valor: 130,
    status: "Pago",
  },
];

export const usuarios: Usuario[] = [
  { id: "u1", nome: "Dr. Carlos Silva", email: "carlos@vetcare.com", cargo: "Admin", ativo: true },
  { id: "u2", nome: "Dra. Ana Souza", email: "ana@vetcare.com", cargo: "Veterinário", ativo: true },
  {
    id: "u3",
    nome: "Dr. Pedro Lima",
    email: "pedro@vetcare.com",
    cargo: "Veterinário",
    ativo: true,
  },
  { id: "u4", nome: "Juliana Reis", email: "juliana@vetcare.com", cargo: "Recepção", ativo: true },
  {
    id: "u5",
    nome: "Marcos Tavares",
    email: "marcos@vetcare.com",
    cargo: "Recepção",
    ativo: false,
  },
];

export const clinica = {
  nome: "Vynto Clínica Veterinária",
  cnpj: "12.345.678/0001-90",
  endereco: "Av. Paulista, 1000 — Bela Vista, São Paulo/SP",
  telefone: "(11) 3000-1000",
};
