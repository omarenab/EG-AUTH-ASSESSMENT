import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-5 items-center justify-center">
      <LoaderCircle className="h-10 w-10 animate-spin text-white" />
    </div>
  );
};

export default LoadingSpinner;