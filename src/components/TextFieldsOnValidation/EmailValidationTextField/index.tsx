import { TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
  validate: (isValid: boolean | undefined) => void;
}

export const EmailValidationTextField: React.FC<Props> = ({
  onChange,
  value,
  validate,

}) => {


  const [error, setError] = useState<boolean | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputEmailValue = event.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    onChange(inputEmailValue);

    if (inputEmailValue === "") {
      setError(true);
      validate(false)
    } else {
      if (regex.test(inputEmailValue)) {
        setError(false);
        validate(true)
      } else {
        setError(true);
        validate(false)
      }
    }
  };



  return (
    <div>
      <TextField
        error={error}
        variant="filled"
        label="E-mail"
        fullWidth
        size="small"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
