"use client";
import { useRouter } from "next/navigation";

type ErrorScreenProps = {
  error: string;
};
export default function ErrorScreen({ error }: ErrorScreenProps) {
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-4">
      <div className="rounded-2xl max-w-md border border-red-500 bg-slate-800 p-5 shadow-lg sm:p-6">
        <p className="text-red-500 mb-4">{error}</p>

        <button
          className="rounded-lg bg-amber-500 px-4 py-2 text-slate-900 hover:bg-amber-400"
          onClick={() => {
            router.back();
          }}
        >
          Назад
        </button>
      </div>
    </div>
  );
}
