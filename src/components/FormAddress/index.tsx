import { useState } from "react";
import CepValidationHook from "../TextFieldsOnValidation/CepValidationHook";
import styles from "./styles.module.css";
import { TextField } from "@mui/material";

interface CepResponse {
  [key: string]: string;
}

const FormAddres = () => {
  const [formsValidate, setFormValidate] = useState<boolean | undefined>(undefined);
  const [CepResponse, setCepResponse] = useState<CepResponse | null>(null);

  console.log(formsValidate);

  return (
    <section className={styles.formsContainer}>
      <span className={styles.formsContainer__credits}>Pesquisa feita pela <a href="https://viacep.com.br">API da ViaCep</a></span>
      <div className={styles.container__line}>
        <CepValidationHook
          validate={setFormValidate}
          objectResultData={setCepResponse}
        />

        <div className={styles.container__uf}>
          <TextField variant="filled" label="UF" fullWidth size="small" value={CepResponse ? CepResponse.uf : ''} />
        </div>
      </div>

      <div className={styles.container__line}>
        <div className={styles.container__logra}>
          <TextField
            variant="filled"
            label="Logradouro"
            fullWidth
            size="small"
            value={CepResponse ? CepResponse.logradouro : ''}
          />
        </div>

        <div className={styles.container__bairro}>
          <TextField variant="filled" label="Bairro" fullWidth size="small" value={CepResponse ? CepResponse.bairro : ''} />
        </div>

        <div className={styles.container__bairro}>
          <TextField
            variant="filled"
            label="Localidade"
            fullWidth
            size="small"
            value={CepResponse ? CepResponse.localidade : ''}
          />
        </div>
      </div>
    </section>
  );
};

export default FormAddres;
