"use client";

import { ComponentProps } from "react";

type formSelectOptionProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"select">;

const SelectedWithOnChange = ({
  children,
  className,
  ...props
}: formSelectOptionProps) => {
  return (
    <select
      {...props}
      className={` ${className}select select-bordered w-full max-w-xs`}
    >
      <option disabled selected>
        دسته بندی را انتخاب کنید
      </option>
      {children}
    </select>
  );
};

export default SelectedWithOnChange;
