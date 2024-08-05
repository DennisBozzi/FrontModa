import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://backmoda.onrender.com/";

const fetchData = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(url + "venda", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export function useVendassData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["vendassData"],
    retry: false
  });
  return query;
}