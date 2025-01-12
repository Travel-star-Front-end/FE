import * as s from "../../../../styles/auth/login/login";

const LoginButton = ({ type="button", children, btncolor, disabled, onClick }) => {
    return (
        <s.LoginButtonContainer type={type} btncolor={btncolor} disabled={disabled} onClick={onClick}>
            {children}
        </s.LoginButtonContainer>
    )
}

export default LoginButton;