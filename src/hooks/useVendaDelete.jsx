import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const deleteVenda = async (id) => {
  const response = await axiosInstance.delete(`/venda/${id}`);
  return response;
};

export function useVendaDelete() {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteVenda,
    onSuccess: () => {
      queryCliente.invalidateQueries(["produtosData"]);
    },
  });

  return mutate;
}
