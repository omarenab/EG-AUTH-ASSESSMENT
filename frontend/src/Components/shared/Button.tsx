import LoadingSpinner from "./LoadingSpinner";
import type { ButtonProps } from "../../types/buttonprops.types";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={twMerge(`w-full rounded-xl cursor-pointer bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 `,className)}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default Button;
