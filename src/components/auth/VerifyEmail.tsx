"use client";

import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  // const email = searchParams.get('email'); // Optional: display email if needed

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Email verified successfully!');

      // Redirect to Reset Password
      setTimeout(() => {
        router.push('/auth/reset-password');
      }, 1000);
    }, 1500);
  };

  const handleResend = () => {
    setIsResending(true);
    // Simulate resend
    setTimeout(() => {
      setIsResending(false);
      toast.success('Verification code resent!');
    }, 2000);
  }

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase (Same as Login) */}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
            <p className="text-gray-500">
              We have sent a verification code to your email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col items-center">

            <div className="w-full flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                  <InputOTPSlot index={1} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                  <InputOTPSlot index={2} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                  <InputOTPSlot index={3} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                  <InputOTPSlot index={4} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                  <InputOTPSlot index={5} className="w-12 h-12 border-gray-300 rounded-lg text-lg bg-[#F9FAFB]" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group"
            >
              {isLoading ? 'Verifying...' : (
                <span className="flex items-center gap-2">
                  Verify Code <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-[#5aa8a9] font-semibold hover:text-[#4a8a8b] hover:underline disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <Link
              href="/auth/login"
              className="text-gray-500 hover:text-gray-700 font-medium inline-flex items-center gap-2 group transition-colors text-sm"
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
