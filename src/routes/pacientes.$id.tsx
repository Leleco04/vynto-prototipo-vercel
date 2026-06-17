import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getPaciente } from "@/lib/api";

export const Route = createFileRoute("/pacientes/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Paciente ${params.id} — Vynto` }],
  }),
  component: PerfilPaciente,
});

function PerfilPaciente() {
  const { id } = Route.useParams();
  const { data } = useQuery({ queryKey: ["paciente", id], queryFn: () => getPaciente(id) });

  if (!data) return <div className="text-sm text-muted-foreground">Carregando...</div>;
  const { paciente: p, consultas, vacinas } = data;

  return (
    <div className="space-y-6">
      <Link
        to="/pacientes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Voltar para pacientes
      </Link>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {p.fotoIniciais}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{p.nome}</h1>
              <Badge variant="secondary">{p.especie}</Badge>
              <Badge variant="outline">{p.sexo}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground md:grid-cols-5">
              <div>
                <span className="text-foreground font-medium">Raça:</span> {p.raca}
              </div>
              <div>
                <span className="text-foreground font-medium">Idade:</span> {p.idade}
              </div>
              <div>
                <span className="text-foreground font-medium">Peso:</span> {p.peso}
              </div>
              <div>
                <span className="text-foreground font-medium">Cor:</span> {p.cor}
              </div>
              <div className="md:col-span-1 col-span-2">
                <span className="text-foreground font-medium">Chip:</span> {p.microchip}
              </div>
            </div>
          </div>
          <Button>Nova consulta</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tutor</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm md:grid-cols-3">
          <div className="font-medium">{p.tutor.nome}</div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" /> {p.tutor.telefone}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" /> {p.tutor.email}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="historico">
        <TabsList>
          <TabsTrigger value="historico">Histórico de Consultas</TabsTrigger>
          <TabsTrigger value="vacinas">Vacinas</TabsTrigger>
          <TabsTrigger value="exames">Exames</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="historico">
          <Card>
            <CardContent className="p-6">
              {consultas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem atendimentos registrados.</p>
              ) : (
                <ol className="relative border-l-2 border-border pl-6 space-y-6">
                  {consultas.map((c) => (
                    <li key={c.id} className="relative">
                      <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(c.data), "dd/MM/yyyy")} • {c.veterinarioNome}
                      </div>
                      <div className="mt-1 font-medium">{c.diagnostico}</div>
                      <div className="text-sm text-muted-foreground">Queixa: {c.queixa}</div>
                      <div className="mt-1 text-sm">Prescrição: {c.prescricao}</div>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vacinas">
          <Card>
            <CardContent className="p-6 space-y-3">
              {vacinas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem vacinas registradas.</p>
              ) : (
                vacinas.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between border-b pb-2 last:border-none"
                  >
                    <div>
                      <div className="font-medium">{v.nome}</div>
                      <div className="text-xs text-muted-foreground">
                        Aplicada por {v.veterinario}
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <div>{format(new Date(v.data), "dd/MM/yyyy")}</div>
                      <div className="text-xs text-muted-foreground">
                        Próxima: {format(new Date(v.proxima), "dd/MM/yyyy")}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exames">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Nenhum exame disponível.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documentos">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Nenhum documento anexado.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
