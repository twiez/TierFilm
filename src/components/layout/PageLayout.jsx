import Navbar from '../ui/Navbar';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14">
        {children}
      </main>
    </div>
  );
}
