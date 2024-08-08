import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postData = async (data) => {
  if (data.id) {
    return await axiosInstance.put('/produto', data)
  }
  return await axiosInstance.post('/produto', data)
};

export function useProdutoMutate() {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryCliente.invalidateQueries(['produtosData']);
    },
  })
  return mutate;
}