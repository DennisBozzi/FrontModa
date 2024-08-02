import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://backmoda.onrender.com/";
const token = localStorage.getItem('authToken');

const fetchData = async () => {
  const response = await axios.get(url + "produto", {
    headers: { Authorization: `Bearer ${token}` },
  });
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