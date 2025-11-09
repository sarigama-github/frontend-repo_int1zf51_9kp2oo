import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function QuoteCard({ quote, loading, error }) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        <div className="h-10 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  if (!quote) return null;

  const up = quote.change !== null && quote.change >= 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{quote.name || quote.symbol}</div>
          <div className="text-3xl font-semibold text-gray-900 tracking-tight">{quote.price}</div>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span>
            {quote.change?.toFixed(2)} ({quote.change_percent?.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="text-gray-500">Open</div>
          <div className="font-medium text-gray-900">{quote.open ?? "-"}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="text-gray-500">Day Range</div>
          <div className="font-medium text-gray-900">{quote.low ?? "-"} - {quote.high ?? "-"}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 col-span-2">
          <div className="text-gray-500">As of</div>
          <div className="font-medium text-gray-900">{new Date(quote.as_of).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
