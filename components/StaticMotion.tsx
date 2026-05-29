import type { ReactNode } from "react"

type StaticMotionProps = Record<string, any> & {
  animate?: unknown
  exit?: unknown
  initial?: unknown
  transition?: unknown
  variants?: unknown
  viewport?: unknown
  whileHover?: unknown
  whileInView?: unknown
  whileTap?: unknown
}

function createStaticMotionElement(tag: keyof JSX.IntrinsicElements) {
  const StaticMotionElement = ({
    animate,
    exit,
    initial,
    transition,
    variants,
    viewport,
    whileHover,
    whileInView,
    whileTap,
    ...props
  }: StaticMotionProps) => {
    const Element = tag as any

    return <Element {...props} />
  }

  return StaticMotionElement
}

export const motion = {
  a: createStaticMotionElement("a"),
  div: createStaticMotionElement("div"),
  h1: createStaticMotionElement("h1"),
  nav: createStaticMotionElement("nav"),
  p: createStaticMotionElement("p"),
}

export function AnimatePresence({
  children,
}: {
  children: ReactNode
  mode?: "sync" | "popLayout" | "wait"
}) {
  return <>{children}</>
}
