"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaGithub } from "react-icons/fa"
import { SiVercel } from "react-icons/si"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [dob, setDob] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This is where we'll add Firebase authentication later
    console.log(isLogin ? "Logging in" : "Signing up", { email, password, fullName, username, dob })
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  const handleOAuthSignIn = (provider: string) => {
    // This is where we'll add Firebase OAuth logic later
    console.log(`Signing in with ${provider}`)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <Card className="w-full max-w-md bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#1E1E1E] text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#1E1E1E] text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="bg-[#1E1E1E] text-white"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1E1E1E] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1E1E1E] text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#2A2A2A] text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button onClick={() => handleOAuthSignIn("Google")} className="bg-white hover:bg-gray-200 text-black">
                <FaGoogle className="mr-2" />
                Google
              </Button>
              <Button onClick={() => handleOAuthSignIn("GitHub")} className="bg-[#333] hover:bg-[#444] text-white">
                <FaGithub className="mr-2" />
                GitHub
              </Button>
              <Button onClick={() => handleOAuthSignIn("Vercel")} className="bg-black hover:bg-gray-900 text-white">
                <SiVercel className="mr-2" />
                Vercel
              </Button>
            </div>
          </div>
          <p className="mt-4 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button variant="link" className="text-[#00ADB5] hover:text-[#00BEC8]" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

