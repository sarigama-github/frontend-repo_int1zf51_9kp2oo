import { TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Live Stock Tracker</h1>
          <p className="text-sm text-gray-500">Quickly check prices and intraday moves</p>
        </div>
      </div>
    </header>
  );
}
