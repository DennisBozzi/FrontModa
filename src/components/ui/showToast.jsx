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
    variant: "success",
    description: descricao,
    status: "success",
    duration: 3000,
  };
}

export function showWarningToast(titulo, descricao) {
  return {
    title: titulo,
    variant: "warning",
    description: descricao,
    status: "success",
    duration: 3000,
  };
}