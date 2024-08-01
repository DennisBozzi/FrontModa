import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://backmoda.onrender.com/";

const fetchData = async () => {
  const response = await axios.get(url + "produto");
  return response.data;
};
export function useProdutosData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["produtosData"],
    retry: false
  });
  return query;
}