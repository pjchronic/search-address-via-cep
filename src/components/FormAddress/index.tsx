import { useEffect, useState } from "react";
import CepValidationHook from "../TextFieldsOnValidation/CepValidationHook";
import styles from "./styles.module.css";
import { TextField } from "@mui/material";
import { EmailValidationTextField } from "../TextFieldsOnValidation/EmailValidationTextField";

interface objectContainerForm {
  [key: string]: string;
}

interface objectContainerFormValidate {
  [key: string]: boolean | undefined;
}

const FormAddres = () => {
  // ------------ Validate form ----------------

  const initialStateValidate: objectContainerFormValidate = {
    // objeto que seta os valores iniciais do formValidate
    cep: undefined,
    email: undefined,
  };

  const [formsValidate, setFormValidate] =
    useState<objectContainerFormValidate>(initialStateValidate); //contém a validação dos campos

  //------------- Object Form setup ---------------

  const initialState: objectContainerForm = {
    // objeto  para setar o valor inicial do objectContainerForm
    cep: "",
    uf: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    email: "",
    nome: "",
  };

  const [objectContainerForm, setObjectConteinerForm] =
    useState<objectContainerForm>(initialState); // contém o objeto principal de todos os campos

  const deliveryValues = (keyValue: string, value: string) => {
    setObjectConteinerForm({ ...objectContainerForm, [keyValue]: value });
  }; // função de envio das informações ao objectContainerForm

  //-------------- Address setup ------------------

  const [objectAddress, setObjectAddress] =
    useState<objectContainerForm | null>(); // contém o objeto de endereço que vem da API

    useEffect(() => {
      if (objectAddress) {
        deliveryAddressValues()
      };
    }, [objectAddress]);

  const deliveryAddressValues = () => {
    setObjectConteinerForm({
      cep: objectAddress?.cep ?? "",
      uf: objectAddress?.uf ?? "",
      logradouro: objectAddress?.logradouro ?? "",
      bairro: objectAddress?.bairro ?? "",
      localidade: objectAddress?.localidade ?? "",
    });
  };

  console.log(objectContainerForm);
  console.log(formsValidate);
  

  return (
    <section className={styles.formsContainer}>
      <span className={styles.formsContainer__credits}>
        Pesquisa feita pela <a href="https://viacep.com.br">API da ViaCep</a>
      </span>
      <div className={styles.container__line}>
        <CepValidationHook
          validate={(isValid) =>
            setFormValidate({ ...formsValidate, cep: isValid })
          } //aqui entra a função com sitch case
          objectResultData={setObjectAddress}
        />

        <div className={styles.container__uf}>
          <TextField
            variant="filled"
            label="UF"
            fullWidth
            size="small"
            value={objectContainerForm.uf}
            onChange={(event) => deliveryValues("uf", event.target.value)}
          />
        </div>
      </div>

      <div className={styles.container__line}>
        <div className={styles.container__logra}>
          <TextField
            variant="filled"
            label="Logradouro"
            fullWidth
            size="small"
            value={objectContainerForm.logradouro}
            onChange={(event) =>
              deliveryValues("logradouro", event.target.value)
            }
          />
        </div>

        <div className={styles.container__bairro}>
          <TextField
            variant="filled"
            label="Bairro"
            fullWidth
            size="small"
            value={objectContainerForm.bairro}
            onChange={(event) => deliveryValues("bairro", event.target.value)}
          />
        </div>

        <div className={styles.container__bairro}>
          <TextField
            variant="filled"
            label="Localidade"
            fullWidth
            size="small"
            value={objectContainerForm.localidade}
            onChange={(event) =>
              deliveryValues("localidade", event.target.value)
            }
          />
        </div>
      </div>

      <div className={styles.container__line}>
        <div className={styles.container__email}>
          <EmailValidationTextField
            onChange={(newValue) => deliveryValues("email", newValue)}
            value={objectContainerForm.email}
            validate={(isValid) =>
              setFormValidate({ ...formsValidate, email: isValid })
            }
          />
        </div>

        <div className={styles.container__nome}>
          
        <TextField
            variant="filled"
            label="Nome"
            fullWidth
            size="small"
            value={objectContainerForm.nome}
            onChange={(event) =>
              deliveryValues("nome", event.target.value)
            }
          />

        </div>

      </div>
    </section>
  );
};

export default FormAddres;