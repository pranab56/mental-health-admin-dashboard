"use client";

import BarChart from "@/components/overview/BarChart";
import CardStates from "@/components/overview/CardStates";
import LineChart from "@/components/overview/LineChart";
import RecentActivity from "@/components/overview/RecentActivity";

export default function Overview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Cards */}
      <CardStates />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6 md:space-y-0 md:grid md:grid-cols-1 gap-6">
          {/* User Growth Chart */}
          <LineChart />

          {/* Appointments Trend Chart */}
          <BarChart />
        </div>

        {/* Recent Activity Column */}
        <RecentActivity />
      </div>
    </div>
  );
}
