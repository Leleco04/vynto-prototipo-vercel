import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/vetcare/StatusBadge";
import { createAgendamento, getAgendamentos, getVeterinarios } from "@/lib/api";
import { pacientes } from "@/lib/mock-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Vynto" },
      { name: "description", content: "Agenda semanal de consultas." },
    ],
  }),
  component: AgendaPage,
});

const schema = z.object({
  pacienteId: z.string().min(1, "Selecione um pet"),
  veterinarioId: z.string().min(1, "Selecione um veterinário"),
  tipo: z.string().min(2, "Informe o tipo"),
  data: z.string().min(1),
  horario: z.string().min(1),
});
type FormData = z.infer<typeof schema>;

function AgendaPage() {
  const { data: ags = [] } = useQuery({ queryKey: ["agendamentos"], queryFn: getAgendamentos });
  const { data: vets = [] } = useQuery({ queryKey: ["vets"], queryFn: getVeterinarios });
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const mut = useMutation({
    mutationFn: createAgendamento,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["agendamentos"] });
      toast.success("Agendamento criado!");
      setOpen(false);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo: "Consulta de rotina",
      horario: "09:00",
      data: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const dias = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const horas = Array.from({ length: 15 }, (_, i) => `${String(6 + i).padStart(2, "0")}:00`);

  function onSubmit(values: FormData) {
    const pet = pacientes.find((p) => p.id === values.pacienteId)!;
    const vet = vets.find((v) => v.id === values.veterinarioId)!;
    mut.mutate({
      ...values,
      pacienteNome: pet.nome,
      tutorNome: pet.tutor.nome,
      veterinarioNome: vet.nome,
      status: "Pendente",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda da semana</h1>
          <p className="text-sm text-muted-foreground">
            {format(weekStart, "dd 'de' MMM", { locale: ptBR })} —{" "}
            {format(addDays(weekStart, 6), "dd 'de' MMM yyyy", { locale: ptBR })}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Data</Label>
                  <Input type="date" {...form.register("data")} />
                </div>
                <div className="space-y-1">
                  <Label>Horário</Label>
                  <Input type="time" {...form.register("horario")} />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Pet</Label>
                <Select onValueChange={(v) => form.setValue("pacienteId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nome} — {p.tutor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.pacienteId && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.pacienteId.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Veterinário</Label>
                <Select onValueChange={(v) => form.setValue("veterinarioId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {vets.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.veterinarioId && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.veterinarioId.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Tipo de consulta</Label>
                <Input {...form.register("tipo")} />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={mut.isPending}>
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-x-auto p-0">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] border-b bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <div className="p-3">Hora</div>
            {dias.map((d) => (
              <div key={d.toISOString()} className="p-3 text-center">
                <div>{format(d, "EEE", { locale: ptBR })}</div>
                <div className="text-foreground text-sm font-semibold">{format(d, "dd/MM")}</div>
              </div>
            ))}
          </div>
          {horas.map((h) => (
            <div
              key={h}
              className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] border-b last:border-b-0"
            >
              <div className="p-3 text-xs text-muted-foreground">{h}</div>
              {dias.map((d) => {
                const di = format(d, "yyyy-MM-dd");
                const items = ags.filter(
                  (a) => a.data === di && a.horario.startsWith(h.slice(0, 2)),
                );
                return (
                  <div key={di + h} className="min-h-[64px] border-l p-1 space-y-1">
                    {items.map((a) => (
                      <div
                        key={a.id}
                        className="rounded-md border bg-card p-2 text-xs shadow-sm hover:shadow transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{a.pacienteNome}</span>
                          <StatusBadge status={a.status} />
                        </div>
                        <div className="text-muted-foreground">{a.tipo}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {a.tutorNome} • {a.horario}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
