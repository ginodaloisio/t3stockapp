import React, { ReactHTML, ReactNode } from "react";
import { SpinnerIcon } from "../Icons/SpinnerIcon";

export enum Variant {
  Primary,
  Secondary,
  Danger,
}

// TODO: why am I using a forwardRef here
const Button = React.forwardRef(
  (
    {
      children,
      isLoading = false,
      variant = Variant.Primary,
      as = "button",
      className,
      ...rest
    }: {
      children: ReactNode;
      isLoading?: boolean;
      variant: Variant;
      className?: string;
      as?: keyof ReactHTML;
      [key: string]: any;
    },
    _ref
  ) => {
    const colors = {
      [Variant.Primary]:
        "border border-indigo-500 bg-indigo-500 text-white rounded px-4 py-2 hover:bg-indigo-600",
      [Variant.Secondary]:
        "border border-gray-500 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600",
      [Variant.Danger]:
        "border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600",
    };
    const As = as;
    return (
      <As
        className={`${colors[variant]} ${className} items-center gap-2 text-center`}
        {...rest}
      >
        {isLoading ? <SpinnerIcon /> : children}
      </As>
    );
  }
);

Button.displayName = "Button";

export { Button };
