import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const url = "https://backmoda.onrender.com/";

const postData = async (data) => {
  const token = localStorage.getItem('authToken');
  return await axios.post(url + 'produto', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
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