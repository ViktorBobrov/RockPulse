import Image from "next/image";
import Display from "./components/display";

import { CardContext, CardContextProvider } from "../contexts/CardContext";
import MaschineList from "./components/MachineList";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-900">
      <main className="flex-1 flex items-center justify-center">
        <CardContextProvider>
          <Display />
        </CardContextProvider>
      </main>
    </div>
  );
}
