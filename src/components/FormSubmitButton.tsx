"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type formSubmitButtonsProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({
  children,
  className,
  ...props
}: formSubmitButtonsProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn btn-success ${className}`}
    >
      {pending && <span className="loading loading-ring loading-md"></span>}
      {children}
    </button>
  );
};

export default FormSubmitButton;
