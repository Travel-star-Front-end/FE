import React, { forwardRef } from 'react';
import * as s from "../../../../styles/auth/login/login";

const LoginInput = forwardRef(({ placeholder, ...props }, ref) => {
    return (
        <s.LoginInputContainer
            placeholder={placeholder}
            ref={ref}
            {...props}
        />
    );
});

export default LoginInput;
