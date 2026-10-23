"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

function buttonBase() {
  return "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
}

function buttonVariant(variant: string) {
  if (variant === "outline") return "border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white"
  if (variant === "ghost") return "text-neutral-900 hover:bg-neutral-900/10"
  return "bg-neutral-900 text-white hover:bg-neutral-800"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return <button className={cn(buttonBase(), buttonVariant(variant), className)} {...props} />
}
