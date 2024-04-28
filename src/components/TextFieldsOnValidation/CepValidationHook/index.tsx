import { TextField } from "@mui/material";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import InputMaskCorrect from "../../InputMaskCorrect";
import { ApiViaCep } from "../../../services/ApiViaCep";

interface CepResponse {
  [key: string]: string;
}
const CepValidationHook: React.FC<{
  validate: Dispatch<boolean | undefined>;
  objectResultData: Dispatch<CepResponse | null>;
}> = ({ validate, objectResultData }) => {
  // início do componente
  const [inputValueChange, setInputValueChange] = useState<string>("");
  const [CepResponse, setCepResponse] = useState<CepResponse | null>(null);
  const [error, setError] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Popula informações nas props para envio ao componente pai
    validate(!error);
    objectResultData(CepResponse);
  }, [error, CepResponse, validate, objectResultData]);

  const handleChangeCep = async (event: ChangeEvent<HTMLInputElement>) => {
    //Verifica evento de interação com textfield
    const inputCep = event.target.value;
    const cleanCep = inputCep.replace(/\D/g, ""); // Limpa formatação do input mask
    setInputValueChange(cleanCep);

    if (cleanCep.length === 8) {
      // Válida se há 8 dígitos no textfield

      try {
        const cepResult = await ApiViaCep(cleanCep); // Havendo, é feita requisição na API
        if (cepResult) {
          // se houver resposta, popula useState
          setCepResponse(cepResult);
          setError(false);
          if (cepResult.erro) {
            // se houver resposta com erro, popula useState e seta error
            setError(true);
            setCepResponse(null);
          }
        }
      } catch (error) {
        // Se não houver resposta informa erro no console e seta error
        console.error("Erro ao buscar dados do CEP:", error);
        setError(true);
        setCepResponse(null);
      }
    } else {
      // Se textfield não tiver 8 dígitos, seta error
      setError(true);
    }
  };

  return (
    <div>
      <InputMaskCorrect
        mask="99999-999"
        maskChar={null}
        onChange={handleChangeCep}
        value={inputValueChange}
      >
        {() => (
          <TextField
            variant="standard"
            label="CEP"
            fullWidth
            size="small"
            error={error}
          />
        )}
      </InputMaskCorrect>
    </div>
  );
};

export default CepValidationHook;