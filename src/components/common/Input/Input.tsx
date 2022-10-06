import React, { ReactNode } from "react";
import { Input as DaisyInput } from "react-daisyui";

export enum InputVariant {
  Search,
}
//TODO: porq uso forward ref
const Input = React.forwardRef(
  (
    {
      children,
      variant = InputVariant.Search,
      className,
      ...rest
    }: {
      children: ReactNode;
      variant: InputVariant;
      className: string;
      [key: string]: any;
    },
    ref
  ) => {
    const colors = {
      [InputVariant.Search]:
        "w-full bg-gray-200 text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500",
    };
    return (
      <DaisyInput className={`${colors[variant]} ${className}`} {...rest}>
        children
      </DaisyInput>
    );
  }
);

Input.displayName = "Input";

export { Input };
