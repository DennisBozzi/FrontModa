import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "http://localhost:55000/";

const fetchData = async () => {
  const response = await axios.get(url + "produto");
  return response.data;
};

export function useProdutosData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["produtosData"],
  });
  return query;
}