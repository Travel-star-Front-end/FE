import React, { forwardRef } from 'react';
import styled from "styled-components";
import colors from "../../../../styles/colors";

const InputContainer = styled.input`
    width: 100%;
    height: 2.8vw;
    background: ${colors.white};
    border: none;
    outline: none;
    border-bottom: 0.06vw solid ${colors.loginPurple};
    font-size: 1vw;
    font-weight: 300;
    color: ${colors.loginP2};
    cursor: pointer;
    caret-color: ${colors.loginP2};

    &::placeholder {
        font-size: 1vw;
        font-weight: 300;
        color: ${colors.loginP2};
    }
`;

const LoginInput = forwardRef(({ placeholder, ...props }, ref) => {
    return (
        <InputContainer
            placeholder={placeholder}
            ref={ref}
            {...props}
        />
    );
});

export default LoginInput;
