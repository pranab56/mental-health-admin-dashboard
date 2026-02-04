"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import toast from 'react-hot-toast';

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  // We can grab the token if needed: const token = searchParams.get('token');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password reset successfully!');

      // Redirect to login
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#9B85C1] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        {/* Background Decorative Elements */}
        <div className="relative z-10 max-w-lg mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            How would you like to<br />use Mynder Therapy?
          </h1>
          <p className="text-white/90 text-lg">
            Choose the path that fits you best. This helps us personalize your experience.
          </p>
        </div>

        {/* Dashboard Screenshots Simulation/Image */}
        <div className="relative z-10 w-full max-w-xl h-[400px] mt-8">
          <div className="relative w-full h-full">
            {/* Main Dashboard Preview (Center) */}
            <div className="absolute top-0 left-10 w-[90%] h-full bg-white rounded-t-xl shadow-2xl p-2 transform rotate-[-5deg] opacity-90 border-[6px] border-b-0 border-[#d0d0d0]/20">
              <div className="w-full h-full bg-gray-50 rounded-t-lg overflow-hidden">
                {/* Header skeleton */}
                <div className="h-12 bg-white border-b flex items-center px-4 gap-2">
                  <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
                </div>
                {/* Body skeleton */}
                <div className="p-4 grid grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-200 rounded-lg col-span-2"></div>
                  <div className="h-24 bg-gray-200 rounded-lg"></div>
                  <div className="h-40 bg-gray-200 rounded-lg col-span-1"></div>
                  <div className="h-40 bg-gray-200 rounded-lg col-span-2"></div>
                </div>
              </div>
            </div>

            {/* Secondary Dashboard Preview (Behind/Left) */}
            <div className="absolute top-10 -left-4 w-[80%] h-full bg-[#f0f9ff] rounded-t-xl shadow-xl transform rotate-[-15deg] -z-10 opacity-70 border-[6px] border-[#d0d0d0]/20"></div>

            {/* Third Dashboard Preview (Behind/Right) */}
            <div className="absolute top-20 left-20 w-[80%] h-full bg-[#fdf2f8] rounded-t-xl shadow-xl transform rotate-[5deg] -z-20 opacity-60 border-[6px] border-[#d0d0d0]/20"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white lg:bg-[#F9FAFB]">
        <div className="w-full max-w-[480px] p-10 bg-white rounded-3xl shadow-sm lg:shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Set a new password</h2>
            <p className="text-gray-500">
              Your new password must be different to previously used password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">New Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#9B85C1] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#9B85C1] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group mt-2"
            >
              {isLoading ? 'Resetting...' : (
                <span className="flex items-center gap-2">
                  Reset Password <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/auth/login"
              className="text-[#5aa8a9] font-semibold hover:text-[#4a8a8b] inline-flex items-center gap-2 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
