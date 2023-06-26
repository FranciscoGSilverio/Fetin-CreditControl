import * as React from "react";
import { Button, Spinner } from "reactstrap";

type ButtonWithLoadingProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  isLoading: boolean;
};

const ButtonWithLoading = ({
  children,
  type,
  isLoading,
}: ButtonWithLoadingProps) => {
  return (
    <Button type={type} style={{ backgroundColor: "#27374D" }}>
      {isLoading ? (
        <Spinner size="sm">
          Loading...
        </Spinner>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonWithLoading;
