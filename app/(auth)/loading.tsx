import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-[#eeeeee]">
      <Spinner size="lg" label="Loading..." />
    </div>
  );
}
