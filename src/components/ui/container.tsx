import React, {JSX} from 'react';

type Props = {
  children: JSX.Element | Array<JSX.Element>,
  type?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
  className?: string
}

const Container = ({children, className, type }: Props): JSX.Element => {
  let maxWidth: string

  switch (type) {
    case "sm":
      maxWidth = "max-w-sm"
      break
    case "md":
      maxWidth = "max-w-md"
      break
    case "lg":
      maxWidth = "max-w-lg"
      break
    case "xl":
      maxWidth = "max-w-xl"
      break
    case "2xl":
      maxWidth = "max-w-2xl"
      break
    case "3xl":
      maxWidth = "max-w-3xl"
      break
    case "4xl":
      maxWidth = "max-w-4xl"
      break
    case "5xl":
      maxWidth = "max-w-5xl"
      break
    case "6xl":
      maxWidth = "max-w-6xl"
      break
    default:
      maxWidth = "max-w-6xl"
      break
  }

  return (
    <div className={`m-auto ${maxWidth} ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Container;