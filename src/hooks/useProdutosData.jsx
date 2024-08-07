import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fixedPageSize = 20;

const fetchData = async ({ queryKey }) => {
  const [_, pageNumber, tipoProduto] = queryKey;
  const response = await axiosInstance.get('/produto', {
    params: { pageNumber, pageSize: fixedPageSize, tipoProduto: tipoProduto }
  });
  return response.data;
};

export function useProdutosData(pageNumber, tipoProduto) {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["produtosData", pageNumber, tipoProduto],
    retry: false
  });

  return query;
}