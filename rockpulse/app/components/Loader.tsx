export default function Loader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-4">
      <div
        className="animate-spin rounded-full border-4 border-slate-600 border-t-amber-500 size-10"
        role="status"
        aria-label="Загрузка"
      ></div>
    </div>
  );
}
