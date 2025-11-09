import { useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, TimeScale);

export default function Chart({ data, loading }) {
  const ref = useRef(null);

  const chartData = useMemo(() => {
    const labels = (data?.points || []).map((p) => new Date(p.t));
    const prices = (data?.points || []).map((p) => p.c);
    return {
      labels,
      datasets: [
        {
          label: data?.symbol || "",
          data: prices,
          borderColor: "#2563eb",
          backgroundColor: (ctx) => {
            const { chart } = ctx;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return "rgba(37,99,235,0.15)";
            const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(37, 99, 235, 0.25)");
            gradient.addColorStop(1, "rgba(37, 99, 235, 0.0)");
            return gradient;
          },
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    };
  }, [data]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { type: "time", time: { tooltipFormat: "PP p" }, grid: { display: false } },
      y: { ticks: { callback: (v) => `$${v}` }, grid: { color: "#f3f4f6" } },
    },
  }), []);

  return (
    <div className="h-64 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {loading ? (
        <div className="h-full w-full animate-pulse rounded-xl bg-gray-100" />
      ) : (
        <Line ref={ref} data={chartData} options={options} />
      )}
    </div>
  );
}
