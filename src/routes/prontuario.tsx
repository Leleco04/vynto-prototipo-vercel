import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileDown } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createConsulta, getConsultas, getVeterinarios } from "@/lib/api";
import { pacientes } from "@/lib/mock-data";

export const Route = createFileRoute("/prontuario")({
  head: () => ({ meta: [{ title: "Prontuário — Vynto" }] }),
  component: ProntuarioPage,
});

const schema = z.object({
  pacienteId: z.string().min(1, "Selecione o pet"),
  veterinarioNome: z.string().min(1, "Selecione o veterinário"),
  queixa: z.string().min(3),
  diagnostico: z.string().min(3),
  prescricao: z.string().min(3),
  observacoes: z.string().optional(),
});
type Form = z.infer<typeof schema>;

function ProntuarioPage() {
  const qc = useQueryClient();
  const { data: consultas = [] } = useQuery({ queryKey: ["consultas"], queryFn: getConsultas });
  const { data: vets = [] } = useQuery({ queryKey: ["vets"], queryFn: getVeterinarios });

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { queixa: "", diagnostico: "", prescricao: "", observacoes: "" },
  });

  const mut = useMutation({
    mutationFn: createConsulta,
    onSuccess: () => {
      toast.success("Prontuário salvo!");
      qc.invalidateQueries({ queryKey: ["consultas"] });
      form.reset();
    },
  });

  function onSubmit(values: Form) {
    mut.mutate({
      pacienteId: values.pacienteId,
      veterinarioNome: values.veterinarioNome,
      queixa: values.queixa,
      diagnostico: values.diagnostico,
      prescricao: values.prescricao,
      observacoes: values.observacoes,
      data: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Nova consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Pet</Label>
                <Select onValueChange={(v) => form.setValue("pacienteId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
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
                <Select onValueChange={(v) => form.setValue("veterinarioNome", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {vets.map((v) => (
                      <SelectItem key={v.id} value={v.nome}>
                        {v.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Queixa principal</Label>
              <Input {...form.register("queixa")} placeholder="Ex.: vômito recorrente há 3 dias" />
            </div>
            <div className="space-y-1">
              <Label>Diagnóstico</Label>
              <Input {...form.register("diagnostico")} placeholder="Ex.: gastrite leve" />
            </div>
            <div className="space-y-1">
              <Label>Prescrição</Label>
              <Textarea
                rows={3}
                {...form.register("prescricao")}
                placeholder="Medicamentos, posologia, duração..."
              />
            </div>
            <div className="space-y-1">
              <Label>Observações</Label>
              <Textarea rows={2} {...form.register("observacoes")} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={mut.isPending}>
                Salvar prontuário
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => toast.info("Receita gerada (mock)")}
              >
                <FileDown className="mr-2 h-4 w-4" /> Gerar receita PDF
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimos prontuários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {consultas.slice(0, 8).map((c) => {
            const pet = pacientes.find((p) => p.id === c.pacienteId);
            return (
              <div key={c.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{pet?.nome ?? c.pacienteId}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(c.data), "dd/MM/yyyy")}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{c.veterinarioNome}</div>
                <div className="mt-1 text-sm">{c.diagnostico}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
