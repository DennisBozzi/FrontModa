import axios from "axios";

const url = "http://localhost:55000/";

const token = localStorage.getItem("modaSustentavelJwt");

export const useIsLoggedMutate = async () => {
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  return await axios.get(url + "Auth/Teste", { headers });
};

export const tokenTeste = async () => {
  const response = await useIsLoggedMutate();
  return response.produto.valor;
};
