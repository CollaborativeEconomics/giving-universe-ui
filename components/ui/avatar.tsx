"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/shadCnUtil"
import { VariantProps, cva } from "class-variance-authority"

const avatarImageVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        lg: "h-48 w-48",
      }
    },
    defaultVariants: {
      size: "default",
    }
  }
)

const avatarTitleVariants = cva(
  "",
  {
    variants: {
      size: {
        default: "text-sm font-semibold",
        lg: "text-5xl text-white font-medium pb-10 pl-8",
      }
    },
    defaultVariants: {
      size: "default",
    }
  }
)

interface AvatarProps extends
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
  VariantProps<typeof avatarImageVariants>,
  VariantProps<typeof avatarTitleVariants> {
  className?: string,
  title?: string,
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarImageVariants({ size, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarTitle = React.forwardRef<
  HTMLDivElement,
  AvatarProps
>(({ className, title, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(avatarTitleVariants({ size, className }))}
    {...props}
  >
    {title}
  </div>
))
AvatarTitle.displayName = "avatarTitle"


export { Avatar, AvatarImage, AvatarFallback, AvatarTitle };
export type { AvatarProps }

