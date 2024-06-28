
import { RocketIcon } from "@radix-ui/react-icons";

export function showErrorToast(titulo, descricao) {
  return {
    variant: "destructive",
    title: titulo,
    description: descricao,
    status: "error",
    duration: 3000,
  };
}

export function showSuccessToast(titulo, descricao) {
  return {
    title: titulo,
    description: descricao,
    status: "success",
    duration: 3000,
  };
}