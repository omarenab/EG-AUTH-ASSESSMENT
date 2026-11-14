import { LoaderCircle } from "lucide-react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 text-white">
      <LoaderCircle className="mb-4 h-10 w-10 animate-spin text-violet-500" />
    </div>
  );
};

export default GlobalLoader;
