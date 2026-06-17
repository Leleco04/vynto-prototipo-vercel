import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";
import { CalendarCheck, DollarSign, PawPrint, Syringe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard } from "@/lib/api";
import { StatusBadge } from "@/components/vetcare/StatusBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Vynto" },
      { name: "description", content: "Visão geral da clínica veterinária." },
    ],
  }),
  component: Dashboard,
});

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)"];

function Stat({
  title,
  value,
  icon: Icon,
  hint,
  accent,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  hint?: string;
  accent?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: accent ?? "var(--color-primary)", color: "white" }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: getDashboard });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bom dia, Dr. Carlos 👋</h1>
        <p className="text-sm text-muted-foreground">Aqui está o resumo da clínica hoje.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Consultas Hoje"
          value={String(data?.consultasHoje ?? "—")}
          icon={CalendarCheck}
          hint="3 confirmadas, 3 pendentes"
          accent="var(--color-primary)"
        />
        <Stat
          title="Faturamento do Mês"
          value={
            data
              ? data.faturamentoMes.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "—"
          }
          icon={DollarSign}
          hint="+12% vs mês anterior"
          accent="var(--color-success)"
        />
        <Stat
          title="Animais Cadastrados"
          value={String(data?.animaisCadastrados ?? "—")}
          icon={PawPrint}
          hint="2 novos esta semana"
          accent="var(--color-chart-3)"
        />
        <Stat
          title="Vacinas a Vencer"
          value={String(data?.vacinasVencer ?? "—")}
          icon={Syringe}
          hint="Nos próximos 30 dias"
          accent="var(--color-warning)"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Consultas por dia da semana</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.porDia ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dia" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="consultas" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por espécie</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.especies ?? []}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {(data?.especies ?? []).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {(data?.proximos ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold">
                    {a.horario}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {a.pacienteNome} <span className="text-muted-foreground">• {a.tipo}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.tutorNome} — {a.veterinarioNome}
                    </p>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
