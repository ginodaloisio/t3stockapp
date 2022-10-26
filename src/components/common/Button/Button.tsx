import React, { ReactNode } from "react";
import { Button as DaisyButton } from "react-daisyui";
import { SpinnerIcon } from "../Icons/SpinnerIcon";
export enum ButtonVariant {
  Primary,
  Secondary,
  Danger,
  Default,
}
//TODO: porq uso forwardRef
const Button = React.forwardRef(
  (
    {
      children,
      variant = ButtonVariant.Primary,
      className,
      isLoading = false,
      ...rest
    }: {
      children: ReactNode;
      variant: ButtonVariant;
      className: string;
      isLoading?: boolean;
      [key: string]: any;
    },
    ref
  ) => {
    const colors = {
      [ButtonVariant.Primary]:
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:dark:bg-gray-500 disabled:bg-gray-300",
      [ButtonVariant.Secondary]:
        "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400",
      [ButtonVariant.Danger]:
        "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400",
      [ButtonVariant.Default]: "",
    };
    return (
      <DaisyButton
        disabled={isLoading}
        className={`${colors[variant]} ${className}`}
        {...rest}
      >
        {isLoading && <SpinnerIcon />}
        {!isLoading && children}
      </DaisyButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
