import Display from "./components/display";

import { CardContextProvider } from "../contexts/CardContext";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-900">
      <main className="flex flex-1 items-center justify-center">
        <CardContextProvider>
          <Display />
        </CardContextProvider>
      </main>
    </div>
  );
}
