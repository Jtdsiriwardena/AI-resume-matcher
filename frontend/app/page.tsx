
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>

      </main>
    </div>
  );
}
