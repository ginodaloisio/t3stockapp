import React, { ReactNode } from "react";
import { Button as DaisyButton } from "react-daisyui";
export enum Variant {
  Primary,
  Secondary,
  Danger,
  Default,
}

const Button = React.forwardRef(
  (
    {
      children,
      variant,
      ...rest
    }: {
      children: ReactNode;
      variant: Variant;
      [key: string]: any;
    },
    ref
  ) => {
    const colors = {
      [Variant.Primary]:
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400",
      [Variant.Secondary]:
        "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400",
      [Variant.Danger]:
        "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400",
      [Variant.Default]: "",
    };
    return (
      <DaisyButton className={colors[variant]} {...rest}>
        {children}
      </DaisyButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
