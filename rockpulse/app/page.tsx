import Image from "next/image";
import Display from "./components/display";
import { CardContext, CardContextProvider } from "../contexts/CardContext";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <CardContextProvider>
          <Display />
        </CardContextProvider>
      </main>
    </div>
  );
}
