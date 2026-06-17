import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsuarios } from "@/lib/api";
import { clinica } from "@/lib/mock-data";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Vynto" }] }),
  component: ConfigPage,
});

function ConfigPage() {
  const { data: users = [] } = useQuery({ queryKey: ["usuarios"], queryFn: getUsuarios });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie sua clínica</p>
      </div>

      <Tabs defaultValue="clinica">
        <TabsList>
          <TabsTrigger value="clinica">Clínica</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="clinica">
          <Card>
            <CardHeader>
              <CardTitle>Dados da clínica</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input defaultValue={clinica.nome} />
              </div>
              <div className="space-y-1">
                <Label>CNPJ</Label>
                <Input defaultValue={clinica.cnpj} />
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label>Endereço</Label>
                <Input defaultValue={clinica.endereco} />
              </div>
              <div className="space-y-1">
                <Label>Telefone</Label>
                <Input defaultValue={clinica.telefone} />
              </div>
              <div className="space-y-1">
                <Label>Logo</Label>
                <Input type="file" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={() => toast.success("Dados atualizados")}>
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.nome}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{u.cargo}</Badge>
                    </TableCell>
                    <TableCell>
                      {u.ativo ? (
                        <Badge className="bg-[var(--color-success)] text-[var(--color-success-foreground)]">
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Alertas automáticos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "vac", label: "Alertas de vacina vencendo", hint: "Notifica 7 dias antes" },
                { id: "ret", label: "Lembretes de retorno", hint: "Avisa quando o retorno chega" },
                { id: "est", label: "Estoque baixo", hint: "Quando item fica abaixo do mínimo" },
              ].map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between border-b pb-3 last:border-none"
                >
                  <div>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.hint}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
