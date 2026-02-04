"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const activities = [
  {
    title: "New Patient Signup",
    description: "Sarah Miller registered as a new client.",
  },
  {
    title: "Provider Pending Approval",
    description: "Dr. Michael Chen submitted his credentials for review.",
  },
  {
    title: "Payout Failed",
    description: "System failed to process payout for 12 providers due to gateway error.",
  },
  {
    title: "Content Update",
    description: "Therapy resources library was updated by moderator 'JaneD'.",
  },
  {
    title: "Session Summary - Oct 5",
    description: "Anxiety management & breathing exercises",
  },
  {
    title: "Payout Failed",
    description: "System failed to process payout for 12 providers due to gateway error.",
  },
  {
    title: "Provider Pending Approval",
    description: "Dr. Michael Chen submitted his credentials for review.",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Recent Activity</h2>
      <Card className="border-none shadow-sm h-fit bg-white">
        <CardContent className="p-8">
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[3.5px] top-2 bottom-8 w-[1px] bg-[#F1F1F1]" />

            {activities.map((activity, index) => (
              <div key={index} className="flex gap-6 relative group">
                {/* Bullet */}
                <div className="relative z-10 mt-1.5 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#9B85C4] ring-4 ring-white group-hover:scale-125 transition-transform" />
                </div>
                {/* Content */}
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#9B85C4] transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[240px]">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="#"
            className="flex items-center justify-center gap-2 mt-12 text-[#9B85C4] font-semibold hover:text-[#826AB4] transition-colors text-sm"
          >
            View all activity <ChevronRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
