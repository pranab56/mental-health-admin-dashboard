"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from 'next/image';
import { useRef, useState } from "react";
import { toast } from "sonner"; // Assuming sonner is installed as per list_dir

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Alex Johnsan",
    email: "alex.j@mynder.com",
    phone: "+1 (555) 000-0000",
    timezone: "et",
    insuranceProvider: "Blue Cross Blue Shield",
    memberId: "ABC123456789",
    groupNumber: "62704",
  });

  // Visibility State for sensitive fields
  const [visibility, setVisibility] = useState({
    insuranceProvider: false,
    memberId: true, // Shown in image as stars or hidden? actually shown as text in image, but with eye icon. 
    // Wait, in the image, "Blue Cross..." is visible. "ABC..." is visible. "62704" is visible. 
    // The eye icon usually toggles. I will default them to visible as per image, 
    // but allow toggling to hidden (password type). 
    // Actually, usually eye icon means "click to reveal". If they are already text, maybe the icon is "click to hide"?
    // Or maybe the image captures the "revealed" state. I'll implement standard toggle behavior.
    // Given the request "same to same", and the image shows TEXT, I will Initialize as VISIBLE (type="text").
    groupNumber: true,
  });

  const [photoUrl, setPhotoUrl] = useState("https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"); // We would use a real image if available

  const handleUpdatePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      toast.success("Profile photo updated");
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl("");
    toast.success("Profile photo removed");
  };

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Changes saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">

      {/* Profile Photo Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt="Profile"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  <span className="text-xs">No Photo</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Profile Photo</h2>
                <p className="text-sm text-gray-500">
                  JPG or PNG, max 2MB. A clear face photo is recommended.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  onClick={handleUpdatePhoto}
                  variant="secondary"
                  className="bg-[#F3F4F6] text-gray-700 hover:bg-gray-200 border-none rounded-xl h-10 px-6 font-medium"
                >
                  Update Photo
                </Button>
                <button
                  onClick={handleRemovePhoto}
                  className="text-[#7C3AED] hover:text-[#6D28D9] text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-0">
            <CardTitle className="text-lg font-bold text-gray-900">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="h-12 rounded-xl bg-[#FAFAFA] border-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Admin Email Address
                </label>
                <Input
                  value={formData.email}
                  disabled
                  className="h-12 rounded-xl bg-[#FAFAFA] border-none text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12 rounded-xl bg-[#FAFAFA] border-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
                />
              </div>

              <div className="space-y-2 w-full">
                <label className="text-sm font-semibold text-gray-700">
                  Timezone
                </label>
                <Select
                  value={formData.timezone}
                  onValueChange={(val) =>
                    setFormData({ ...formData, timezone: val })
                  }
                >
                  <SelectTrigger className="h-12 rounded-xl bg-[#FAFAFA] border-none focus:ring-1 w-full py-6 focus:ring-[#7C3AED]">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="et">Eastern Time (ET)</SelectItem>
                    <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                    <SelectItem value="mt">Mountain Time (MT)</SelectItem>
                    <SelectItem value="ct">Central Time (CT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security & Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="px-8 pt-8 pb-0">
            <CardTitle className="text-lg font-bold text-gray-900">
              Security & Password
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Insurance Provider */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Insurance Provider
                </label>
                <div className="relative">
                  <Input
                    value={formData.insuranceProvider}
                    onChange={(e) =>
                      setFormData({ ...formData, insuranceProvider: e.target.value })
                    }
                    type={visibility.insuranceProvider ? "text" : "password"}
                    className="h-12 rounded-xl bg-[#FAFAFA] border-none pr-10 focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
                  />
                  <button
                    onClick={() => toggleVisibility("insuranceProvider")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {visibility.insuranceProvider ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Member ID */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Member ID
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.memberId}
                      onChange={(e) =>
                        setFormData({ ...formData, memberId: e.target.value })
                      }
                      type={visibility.memberId ? "text" : "password"}
                      className="h-12 rounded-xl bg-[#FAFAFA] border-none pr-10 focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
                    />
                    <button
                      onClick={() => toggleVisibility("memberId")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {visibility.memberId ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Group Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Group Number
                  </label>
                  <div className="relative">
                    <Input
                      value={formData.groupNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, groupNumber: e.target.value })
                      }
                      type={visibility.groupNumber ? "text" : "password"}
                      className="h-12 rounded-xl bg-[#FAFAFA] border-none pr-10 focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
                    />
                    <button
                      onClick={() => toggleVisibility("groupNumber")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {visibility.groupNumber ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-4 bg-white flex justify-end">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-[#9D84B7] hover:bg-[#8B7BB5] text-white rounded-xl px-8 h-12 text-md font-medium shadow-md transition-all"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
