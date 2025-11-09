import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const sym = input.trim().toUpperCase();
    if (sym) onSearch(sym);
  };

  return (
    <form onSubmit={submit} className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search ticker (e.g., AAPL, MSFT)"
        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 pr-12 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 active:scale-95"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}
