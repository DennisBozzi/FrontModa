import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fixedPageSize = 20;

const fetchData = async ({ queryKey }) => {
  const [_, pageNumber, nomeProduto] = queryKey;
  const response = await axiosInstance.get('/venda', {
    params: {pageNumber, pageSize: fixedPageSize, nomeProduto: nomeProduto},
  });
  return response.data;
};

export function useVendasData(pageNumber, nomeProduto) {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["vendasData", pageNumber, nomeProduto],
    retry: false
  });

  return query;
}