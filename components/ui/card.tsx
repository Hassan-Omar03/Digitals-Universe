"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

/* =========================
   ANIMATION VARIANTS
========================= */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
} as const

const hoverMotion = {
  y: -10,
  scale: 1.03,
  transition: {
    type: "spring" as const,
    stiffness: 260,
    damping: 18,
  },
}

/* =========================
   SHARED TYPE (FIXED)
========================= */
type MotionDivProps = Omit<HTMLMotionProps<"div">, "ref" | "children"> & {
  children?: React.ReactNode
}

/* =========================
   CARD
========================= */
const Card = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={hoverMotion}
      className={cn(
        "relative rounded-lg border border-gray-300 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className=""
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      {children}
    </motion.div>
  )
)
Card.displayName = "Card"

/* =========================
   CARD HEADER
========================= */
const CardHeader = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
CardHeader.displayName = "CardHeader"

/* =========================
   CARD TITLE
========================= */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof motion.h3>
>(({ className, children, ...props }, ref) => (
  <motion.h3
    ref={ref}
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    }}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </motion.h3>
))
CardTitle.displayName = "CardTitle"

/* =========================
   CARD DESCRIPTION
========================= */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof motion.p>
>(({ className, children, ...props }, ref) => (
  <motion.p
    ref={ref}
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.35,
      delay: 0.05,
      ease: [0.16, 1, 0.3, 1] as const,
    }}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </motion.p>
))
CardDescription.displayName = "CardDescription"

/* =========================
   CARD CONTENT
========================= */
const CardContent = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn("p-6 pt-0", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
CardContent.displayName = "CardContent"

/* =========================
   CARD FOOTER
========================= */
const CardFooter = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
CardFooter.displayName = "CardFooter"

/* =========================
   EXPORTS
========================= */
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}
