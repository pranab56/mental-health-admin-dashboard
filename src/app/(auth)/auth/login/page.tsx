"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
      router.push('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#9B85C1] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        {/* Background Decorative Elements could go here */}

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
          {/* 
               We are using a placeholder or the uploaded image idea here.
               Since I don't have the exact scattered screens asset, I will structure it 
               to look like the example or use a div that suggests it.
               Ideally, we would use an <img> tag with the asset provided.
            */}
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

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white lg:bg-[#F9FAFB]">
        <div className="w-full max-w-[480px] p-10 bg-white rounded-3xl shadow-sm lg:shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-500">Please enter your details to login</p>
          </div>

          {/* Social Login */}
          <button className="w-full h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-8 shadow-sm">
            <div className="w-6 h-6 relative">
              <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" fill />
            </div>
            <span className="font-medium text-gray-700">Log in with Google</span>
          </button>

          {/* Separator */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">or login with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#9B85C1]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
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

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-[#5aa8a9] hover:text-[#4a8a8b] font-medium">
                Forget Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group"
            >
              {isLoading ? 'Logging in...' : (
                <span className="flex items-center gap-2">
                  Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
