import type { FormInputProps } from "../../types/forminput.type";
import type { FieldValues } from "react-hook-form";

function FormInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: FormInputProps<T>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block  text-md font-medium text-gray-300"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-xl border bg-gray-900 px-4 py-3 text-white outline-none transition focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-700 focus:border-violet-500 focus:ring-violet-500/20"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default FormInput;
