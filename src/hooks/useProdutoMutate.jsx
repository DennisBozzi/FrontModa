import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const url = "https://backmoda.onrender.com/";
const token = localStorage.getItem('authToken');

const postData = async (data) => {
  return await axios.post(url + 'produto', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
};

export function useProdutoMutate(id) {
  const queryCliente = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    onSuccess: (response) => {
      queryCliente.invalidateQueries(['produtosData']);
      id(response.data.objeto[response.data.objeto.length - 1].id);
    },
  })
  return mutate;
}