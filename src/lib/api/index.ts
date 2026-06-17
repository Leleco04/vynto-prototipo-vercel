import {
  agendamentos,
  consultas,
  itensEstoque,
  lancamentos,
  pacientes,
  usuarios,
  vacinas,
  veterinarios,
  type Agendamento,
  type Consulta,
  type ItemEstoque,
  type Lancamento,
  type Paciente,
} from "@/lib/mock-data";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

let _agendamentos = [...agendamentos];
let _consultas = [...consultas];
let _estoque = [...itensEstoque];

export async function getDashboard() {
  await delay();
  const hoje = new Date().toISOString().slice(0, 10);
  const consultasHoje = _agendamentos.filter((a) => a.data === hoje).length || 6;
  const faturamentoMes = lancamentos
    .filter((l) => l.status === "Pago")
    .reduce((s, l) => s + l.valor, 0);
  const proximos = _agendamentos.slice(0, 5);
  const porDia = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d, i) => ({
    dia: d,
    consultas: [12, 15, 9, 18, 14, 7, 3][i],
  }));
  const especies = [
    { name: "Cão", value: pacientes.filter((p) => p.especie === "Cão").length },
    { name: "Gato", value: pacientes.filter((p) => p.especie === "Gato").length },
    { name: "Outros", value: pacientes.filter((p) => p.especie === "Outro").length },
  ];
  return {
    consultasHoje,
    faturamentoMes,
    animaisCadastrados: pacientes.length,
    vacinasVencer: 7,
    porDia,
    especies,
    proximos,
  };
}

export async function getAgendamentos(): Promise<Agendamento[]> {
  await delay();
  return _agendamentos;
}

export async function createAgendamento(a: Omit<Agendamento, "id">) {
  await delay();
  const novo: Agendamento = { ...a, id: `a${Date.now()}` };
  _agendamentos = [..._agendamentos, novo];
  return novo;
}

export async function getPacientes(): Promise<Paciente[]> {
  await delay();
  return pacientes;
}

export async function getPaciente(id: string) {
  await delay();
  const p = pacientes.find((x) => x.id === id);
  if (!p) throw new Error("Paciente não encontrado");
  return {
    paciente: p,
    consultas: _consultas.filter((c) => c.pacienteId === id),
    vacinas: vacinas.filter((v) => v.pacienteId === id),
  };
}

export async function getConsultas(): Promise<Consulta[]> {
  await delay();
  return _consultas;
}

export async function createConsulta(c: Omit<Consulta, "id">) {
  await delay();
  const novo: Consulta = { ...c, id: `c${Date.now()}` };
  _consultas = [novo, ..._consultas];
  return novo;
}

export async function getEstoque(): Promise<ItemEstoque[]> {
  await delay();
  return _estoque;
}

export async function createItemEstoque(i: Omit<ItemEstoque, "id">) {
  await delay();
  const novo: ItemEstoque = { ...i, id: `e${Date.now()}` };
  _estoque = [..._estoque, novo];
  return novo;
}

export async function getLancamentos(): Promise<Lancamento[]> {
  await delay();
  return lancamentos;
}

export async function getUsuarios() {
  await delay();
  return usuarios;
}

export async function getVeterinarios() {
  await delay();
  return veterinarios;
}
