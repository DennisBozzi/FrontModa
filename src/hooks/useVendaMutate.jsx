import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postData = async (produtos, desconto) => {
  return await axiosInstance.post('/venda/EfetuarVenda', produtos, desconto)
};

export function useVendaMutate() {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryCliente.invalidateQueries(['produtosData']);
    },
  })
  return mutate;
}