import * as React from "react";
import { Button, Spinner } from "reactstrap";

type ButtonWithLoadingProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
  className?: string;
};

const ButtonWithLoading = ({
  children,
  type,
  isLoading,
  className,
}: ButtonWithLoadingProps) => {
  return (
    <Button
      type={type}
      style={{ backgroundColor: "#27374D" }}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? <Spinner size="sm">Loading...</Spinner> : children}
    </Button>
  );
};

export default ButtonWithLoading;
