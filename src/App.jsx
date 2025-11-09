import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import QuoteCard from "./components/QuoteCard";
import Chart from "./components/Chart";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [quote, setQuote] = useState(null);
  const [series, setSeries] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [error, setError] = useState("");

  const load = async (sym) => {
    setError("");
    setLoadingQuote(true);
    setLoadingSeries(true);
    try {
      const q = await fetchJSON(`${BACKEND}/api/stocks/quote?symbol=${encodeURIComponent(sym)}`);
      setQuote(q);
    } catch (e) {
      setError("Could not load quote. Try another symbol.");
      setQuote(null);
    } finally {
      setLoadingQuote(false);
    }

    try {
      const s = await fetchJSON(`${BACKEND}/api/stocks/intraday?symbol=${encodeURIComponent(sym)}&interval=5m`);
      setSeries(s);
    } catch (e) {
      setSeries({ symbol: sym, points: [] });
    } finally {
      setLoadingSeries(false);
    }
  };

  useEffect(() => {
    load(symbol);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (sym) => {
    setSymbol(sym);
    load(sym);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Header />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <SearchBar onSearch={onSearch} />
            <div className="mt-6">
              <Chart data={series} loading={loadingSeries} />
            </div>
          </div>
          <div>
            <QuoteCard quote={quote} loading={loadingQuote} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}
