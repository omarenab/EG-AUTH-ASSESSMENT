import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  register: UseFormRegister<T>;
  error?: string;
}
