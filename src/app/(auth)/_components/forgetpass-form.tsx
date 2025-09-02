"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { forgetPasswordAction } from "../services/auth"
// import { Link } from "lucide-react"



export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full border-none max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-heading font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-base">Don’t worry, we will help you recover your account.</CardDescription>
        </CardHeader>
        <form action={async (fd) => {
          console.log("form-data",fd);
          
          await forgetPasswordAction(fd);
        }}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button  type="submit" className="w-full rounded-none bg-blue-600 hover:bg-blue-700 text-white">
            Continue
            </Button>
            <div className="flex justify-between text-sm text-center text-gray-600">
              {/* <a href="/login" className="text-blue-600 hover:underline">
                Back to Login
              </a> */}
                <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Create yours
              </Link>
            </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
