"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { Table2, BarChart3 } from "lucide-react";
import { statusChartColors, chartChrome } from "@/lib/chart-colors";
import { statusLabels } from "@/lib/booking-status";
import type { BookingStatus } from "@/lib/supabase/types";

type StatusCount = { status: BookingStatus; count: number };

export default function BookingStatusChart({ data }: { data: StatusCount[] }) {
  const [view, setView] = useState<"chart" | "table">("chart");

  const chartData = data.map((d) => ({
    status: d.status,
    label: statusLabels[d.status],
    count: d.count,
  }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-ink">
          Bookings by status
        </h3>
        <button
          type="button"
          onClick={() => setView(view === "chart" ? "table" : "chart")}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-ink/15 transition-colors hover:bg-white/50"
        >
          {view === "chart" ? <Table2 size={14} /> : <BarChart3 size={14} />}
          {view === "chart" ? "View as table" : "View as chart"}
        </button>
      </div>

      {view === "chart" ? (
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
              barCategoryGap={10}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="label"
                width={96}
                tickLine={false}
                axisLine={{ stroke: chartChrome.axis }}
                tick={{ fill: chartChrome.secondaryInk, fontSize: 13 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                contentStyle={{
                  background: chartChrome.surface,
                  border: `1px solid ${chartChrome.gridline}`,
                  borderRadius: 12,
                  fontSize: 13,
                }}
                formatter={(value) => [value, "Bookings"]}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                {chartData.map((entry) => (
                  <Cell key={entry.status} fill={statusChartColors[entry.status]} />
                ))}
                <LabelList
                  dataKey="count"
                  position="right"
                  style={{ fill: chartChrome.primaryInk, fontSize: 12, fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row) => (
              <tr key={row.status} className="border-b border-ink/5 last:border-0">
                <td className="py-2 text-ink">{row.label}</td>
                <td className="py-2 text-ink">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
