"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { title: "Total Users", value: "12,840" },
  { title: "Active Clients", value: "8,210" },
  { title: "Active Providers", value: "450" },
  { title: "Appointments (MTD)", value: "1,230" },
  { title: "Total Revenue", value: "$45,200" },
];

export default function CardStates() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none shadow-sm h-full flex flex-col justify-center p-0">
            <CardContent className="p-6">
              <p className="text-sm text-gray-400 font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                {stat.value}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
