"use client"

import type React from "react"

import { useState } from "react"
import { SettingsIcon, User, Lock, Mail, Key, Save, LogOut, UserPlus, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import DashboardSidebar from "./dashboard-sidebar"

type SettingsTab = "profile" | "login" | "signup"

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Create particles for background effect
  const renderParticles = () => {
    const particles = []
    const count = 20

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 5
      const duration = Math.random() * 20 + 10
      const xPos = Math.random() * 100
      const xDrift = (Math.random() - 0.5) * 200

      particles.push(
        <div
          key={i}
          className="particle"
          style={
            {
              width: `${size}px`,
              height: `${size}px`,
              left: `${xPos}%`,
              opacity: Math.random() * 0.5,
              "--x-drift": `${xDrift}px`,
              animation: `rise ${duration}s linear infinite`,
              animationDelay: `${Math.random() * duration}s`,
            } as React.CSSProperties
          }
        />,
      )
    }

    return particles
  }

  // Mock login form
  const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      // Mock login logic
      if (email && password) {
        setIsLoggedIn(true)
        setActiveTab("profile")
      }
    }

    return (
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-red-400 hover:text-red-300">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
          >
            Sign in
          </button>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account?</span>{" "}
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className="font-medium text-red-400 hover:text-red-300"
          >
            Sign up
          </button>
        </div>
      </form>
    )
  }

  // Mock signup form
  const SignupForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = (e: React.FormEvent) => {
      e.preventDefault()
      // Mock signup logic
      if (name && email && password && password === confirmPassword) {
        setIsLoggedIn(true)
        setActiveTab("profile")
      }
    }

    return (
      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Create a password"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
          >
            Create Account
          </button>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account?</span>{" "}
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className="font-medium text-red-400 hover:text-red-300"
          >
            Sign in
          </button>
        </div>
      </form>
    )
  }

  // Profile settings form
  const ProfileSettings = () => {
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault()
      // Mock profile update logic
      alert("Profile updated successfully!")
    }

    const handlePasswordUpdate = (e: React.FormEvent) => {
      e.preventDefault()
      // Mock password update logic
      if (newPassword && newPassword === confirmPassword) {
        alert("Password updated successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    }

    const handleLogout = () => {
      setIsLoggedIn(false)
      setActiveTab("login")
    }

    return (
      <div className="space-y-8 fade-in">
        {/* Profile Information */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-red-400" />
            Profile Information
          </h3>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center overflow-hidden border-2 border-red-500/50">
                    <img
                      src={userData.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-28 h-28 rounded-full bg-gray-700 object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-full hover:from-red-700 hover:to-red-800 transition-colors shadow-lg"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                  <Shield className="h-3 w-3 text-red-400 mr-1" />
                  <p className="text-xs text-red-400">{userData.role}</p>
                </div>
              </div>
              <div className="md:w-3/4 space-y-4">
                <div>
                  <label htmlFor="profile-name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    id="profile-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="profile-email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-red-400" />
            Change Password
          </h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">
                Current Password
              </label>
              <input
                id="current-password"
                name="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-gray-700 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your current password"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-700 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                name="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-700 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Confirm new password"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
              >
                <Key className="h-4 w-4 mr-2" />
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Logout Button */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <LogOut className="h-5 w-5 mr-2 text-red-400" />
            Account Actions
          </h3>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <DashboardSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main
        className={cn("relative flex-1 overflow-auto transition-all duration-300 p-6", collapsed ? "ml-20" : "ml-64")}
      >
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient z-0"></div>
        <div className="absolute inset-0 bg-gray-900/90 z-0"></div>

        {/* Particle effect */}
        <div className="particles z-0">{renderParticles()}</div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="mr-4 p-2 rounded-full bg-red-500/10">
              <SettingsIcon className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-400">Manage your account and preferences</p>
            </div>
          </div>

          {isLoggedIn ? (
            <ProfileSettings />
          ) : (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl fade-in">
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  className={cn(
                    "py-2 px-4 font-medium text-sm focus:outline-none transition-all duration-300",
                    activeTab === "login" ? "text-red-500 border-b-2 border-red-500" : "text-gray-400 hover:text-white",
                  )}
                  onClick={() => setActiveTab("login")}
                >
                  <Lock className="h-4 w-4 inline mr-1" />
                  Login
                </button>
                <button
                  className={cn(
                    "py-2 px-4 font-medium text-sm focus:outline-none transition-all duration-300",
                    activeTab === "signup"
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-gray-400 hover:text-white",
                  )}
                  onClick={() => setActiveTab("signup")}
                >
                  <UserPlus className="h-4 w-4 inline mr-1" />
                  Sign Up
                </button>
              </div>

              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

