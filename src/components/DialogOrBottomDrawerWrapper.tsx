"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useMediaQuery } from "usehooks-ts"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface Props {
  triggerButton?: React.ReactNode
  children: React.ReactNode
  /** title과 description 이 필수요소 */
  title: string
  description: string
}

export function DialogOrBottomDrawerWrapper({
  triggerButton,
  children,
  title,
  description,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="p-0">
            <VisuallyHidden asChild>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription>{description}</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="p-0 text-left">
          <VisuallyHidden asChild>
            <DrawerTitle>{title}</DrawerTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DrawerDescription>{description}</DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
