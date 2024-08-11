import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const deleteProduto = async (id) => {
  const response = await axiosInstance.delete(`/produto/${id}`);
  return response;
};

export function useProdutoDelete() {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteProduto,
    onSuccess: () => {
      queryCliente.invalidateQueries(["produtosData"]);
    },
  });

  return mutate;
}
