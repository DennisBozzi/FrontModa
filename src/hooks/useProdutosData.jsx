import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fixedPageSize = 20;

const fetchData = async ({ queryKey }) => {
  const [_, pageNumber, tipoProduto, nome] = queryKey;
  const response = await axiosInstance.get('/produto', {
    params: { pageNumber, pageSize: fixedPageSize, tipoProduto: tipoProduto, nome: nome }
  });
  return response.data;
};

export function useProdutosData(pageNumber, tipoProduto, nome) {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["produtosData", pageNumber, tipoProduto, nome],
    retry: false
  });

  return query;
}