import axios from "axios";

interface CepResponse {
  [key: string]: string;
}

export const ApiViaCep = async (cep: string): Promise<CepResponse | null> => {
  const response = await axios.get<CepResponse>(
    `https://viacep.com.br/ws/${cep}/json/`
  );
  return response.data;
};
