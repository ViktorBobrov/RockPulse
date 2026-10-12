type ErrorBannerProps = {
  message: string;
};
export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="bg-red-500/10 border border-red-500 rounded-lg px-3 py-2 text-sm text-red-400">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
