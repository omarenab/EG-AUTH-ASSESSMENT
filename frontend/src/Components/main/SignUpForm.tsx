import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SignUpCredentials } from "../../types/auth.types";
import {
  signupSchema,
  type SignUpFormData,
} from "../../schemas/auth.validationschema";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import FormInput from "../shared/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Button from "../shared/Button";
interface SignupFormProps {
  onSuccess: () => void;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { signup,  } = auth;

  const onSubmit = async (data: SignUpCredentials) => {
    setServerError("");
    
    try {
      await signup(data);
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
            "Unable to create your account , check your inputs please",
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        <FormInput
          register={register}
          error={errors.name?.message}
          label="Name"
          name="name"
          placeholder="Enter Your name"
        />
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
          placeholder="Enter Your Password"
        />
      </div>

      {serverError && (
        <p className="text-sm text-center text-red-400">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
