export default function AuthLayout({ children }) {
  return (
    <div className="relative w-full h-screen background-image-login p-4 xl:p-6 overflow-auto">
      <div className="fixed inset-0 bg-black/40 z-0"></div>
      {children}
    </div>
  );
}
