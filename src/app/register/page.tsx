"use client"

import { Suspense } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import RegisterForm from "./RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-full max-w-80">
        <CardHeader>닉네임을 입력해주세요 :)</CardHeader>

        <CardContent>
          <Suspense>
            <RegisterForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
