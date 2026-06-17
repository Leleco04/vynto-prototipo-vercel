import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Confirmado:
    "bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:bg-[var(--color-success)]",
  Pago: "bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:bg-[var(--color-success)]",
  OK: "bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:bg-[var(--color-success)]",
  Pendente:
    "bg-[var(--color-warning)] text-[var(--color-warning-foreground)] hover:bg-[var(--color-warning)]",
  Baixo:
    "bg-[var(--color-warning)] text-[var(--color-warning-foreground)] hover:bg-[var(--color-warning)]",
  Cancelado: "bg-destructive text-destructive-foreground hover:bg-destructive",
  Atrasado: "bg-destructive text-destructive-foreground hover:bg-destructive",
  Crítico: "bg-destructive text-destructive-foreground hover:bg-destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge className={cn("font-medium", map[status] ?? "")}>{status}</Badge>;
}
