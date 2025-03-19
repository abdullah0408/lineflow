// import { AuthProvider } from "@/context/AuthContext";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthProvider>
      <div className="h-screen w-screen m-0 p-0 flex flex-col">
          {children}
      </div>
    // </AuthProvider>
  );
}