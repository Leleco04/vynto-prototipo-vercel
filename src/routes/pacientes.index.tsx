import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getPacientes } from "@/lib/api";
import { format } from "date-fns";

export const Route = createFileRoute("/pacientes/")({
  head: () => ({
    meta: [
      { title: "Pacientes — Vynto" },
      { name: "description", content: "Lista de pacientes da clínica." },
    ],
  }),
  component: PacientesPage,
});

function PacientesPage() {
  const { data = [] } = useQuery({ queryKey: ["pacientes"], queryFn: getPacientes });
  const [q, setQ] = useState("");
  const [esp, setEsp] = useState<string>("todas");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const matchQ =
        p.nome.toLowerCase().includes(q.toLowerCase()) ||
        p.tutor.nome.toLowerCase().includes(q.toLowerCase());
      const matchE = esp === "todas" || p.especie === esp;
      return matchQ && matchE;
    });
  }, [data, q, esp]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} animais encontrados</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por pet ou tutor..."
              className="pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={esp} onValueChange={setEsp}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Espécie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as espécies</SelectItem>
              <SelectItem value="Cão">Cães</SelectItem>
              <SelectItem value="Gato">Gatos</SelectItem>
              <SelectItem value="Outro">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead>
              <TableHead>Espécie / Raça</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Último atendimento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.id}
                className="cursor-pointer"
                onClick={() => navigate({ to: "/pacientes/$id", params: { id: p.id } })}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {p.fotoIniciais}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{p.nome}</div>
                      <div className="text-xs text-muted-foreground">{p.idade}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{p.especie}</div>
                  <div className="text-xs text-muted-foreground">{p.raca}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{p.tutor.nome}</div>
                  <div className="text-xs text-muted-foreground">{p.tutor.telefone}</div>
                </TableCell>
                <TableCell className="text-sm">
                  {format(new Date(p.ultimoAtendimento), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Ver perfil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
