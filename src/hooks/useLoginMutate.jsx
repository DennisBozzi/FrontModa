import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const url = "http://localhost:55000/";

const login = async ({ email, senha }) => {
  return await axios.post(url + "Auth/login", {
    email: email,
    password: senha
  })
};

export function useLoginMutate() {
  const mutate = useMutation({
    mutationFn: login
  })
  return mutate;
}