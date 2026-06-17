import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, AlertTriangle, PackageCheck, PackageX } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/vetcare/StatusBadge";
import { createItemEstoque, getEstoque } from "@/lib/api";
import { statusEstoque } from "@/lib/mock-data";

export const Route = createFileRoute("/estoque")({
  head: () => ({ meta: [{ title: "Estoque — Vynto" }] }),
  component: EstoquePage,
});

const schema = z.object({
  produto: z.string().min(2),
  categoria: z.string().min(2),
  quantidade: z.coerce.number().min(0),
  unidade: z.string().min(1),
  minimo: z.coerce.number().min(0),
});

function EstoquePage() {
  const { data = [] } = useQuery({ queryKey: ["estoque"], queryFn: getEstoque });
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const mut = useMutation({
    mutationFn: createItemEstoque,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["estoque"] });
      toast.success("Item adicionado");
      setOpen(false);
      form.reset();
    },
  });

  const total = data.length;
  const baixo = data.filter((i) => statusEstoque(i) === "Baixo").length;
  const critico = data.filter((i) => statusEstoque(i) === "Crítico").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estoque</h1>
          <p className="text-sm text-muted-foreground">Controle de produtos e insumos</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo item</DialogTitle>
            </DialogHeader>
            <form className="space-y-3" onSubmit={form.handleSubmit((v) => mut.mutate(v))}>
              <div className="space-y-1">
                <Label>Produto</Label>
                <Input {...form.register("produto")} />
              </div>
              <div className="space-y-1">
                <Label>Categoria</Label>
                <Input {...form.register("categoria")} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label>Qtd</Label>
                  <Input type="number" {...form.register("quantidade")} />
                </div>
                <div className="space-y-1">
                  <Label>Unidade</Label>
                  <Input {...form.register("unidade")} />
                </div>
                <div className="space-y-1">
                  <Label>Mínimo</Label>
                  <Input type="number" {...form.register("minimo")} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de itens</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Em baixa</CardTitle>
            <AlertTriangle className="h-4 w-4 text-[var(--color-warning)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{baixo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Críticos</CardTitle>
            <PackageX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{critico}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Mínimo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.produto}</TableCell>
                <TableCell>{i.categoria}</TableCell>
                <TableCell>
                  {i.quantidade} {i.unidade}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {i.minimo} {i.unidade}
                </TableCell>
                <TableCell>
                  <StatusBadge status={statusEstoque(i)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
