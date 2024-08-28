import React from "react";
import { Alert } from "react-bootstrap";

const AlertPage: React.FC<{variant: string, message: string, show: boolean}> =
    ({ variant, message, show }) => {

    return (
      <>
        {show ? (
            <Alert key={variant} variant={variant}>
                {message}
            </Alert>
          ) : (
            null
          )}
      </>
    );
};

export default AlertPage;