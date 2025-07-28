import { z } from "zod";

export const recordSchema = z.object({
    nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    cargo: z.string().min(3, { message: "Cargo deve ter pelo menos 3 caracteres" }),
    nivel: z.enum(["Júnior", "Pleno", "Sênior"], { message: "Nível inválido" }),
});
