import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    width: 1.7vw;
    height: 1.7vw;
    cursor: pointer;
`;

export const Icon = styled.img`
    position: absolute;
    width: 1.7vw;
    height: 1.7vw;
`;

export const Badge = styled.div`
    position: relative;
    top: -0.5vw;
    right: -0.7vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF5858;
    border-radius: 0.25vw;
    width: 0.65vw;
    height: 0.55vw;
    font-weight: 800;
    font-size: 0.4vw;
    color: white;
`;

const NotificationBadge = ( {icon, count, onClick }) => {
    return(
        <Container onClick={onClick}>
            <Icon src={icon} alt="icon" />
            {count > 0 && <Badge>{count}</Badge>}
        </Container>
    );
}

export default NotificationBadge;