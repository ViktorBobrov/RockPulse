import { CardContextProvider } from "@/contexts/CardContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(<ProtectedRoute>
        <CardContextProvider>
        <Navbar />
        {children}
        </CardContextProvider>
       </ProtectedRoute> 
    )
  }