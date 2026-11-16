import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SignInCredentials } from "../../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import {
  signinSchema,
  type SignInFormData,
} from "../../schemas/auth.validationschema";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signinSchema),
  });
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { login } = auth;

  const onSubmit = async (data: SignInCredentials) => {
    setServerError("");
    
    try {
      await login(data);
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
            "Unable to sign in. Please try again.",
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <FormInput
          register={register}
          error={errors.email?.message}
          label="Email address"
          name="email"
          type="email"
          placeholder="Easygenerator@example.com"
        />
        <FormInput
          register={register}
          error={errors.password?.message}
          label="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
        />
      </div>

      {serverError && (
        <p className="text-sm text-center text-red-400">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
