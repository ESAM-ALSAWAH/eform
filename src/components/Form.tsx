import React, { FormEvent } from "react";
export const Form = ({
  handleSubmit,
  children,
  className,
  style,
}: {
  handleSubmit: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit && handleSubmit();
  };
  return (
    <form className={className} style={style} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
