import styled from "styled-components";
import colors from "../../styles/colors";
import ProfilePng from "../../assets/images/sideBar/profile.png";
import useFetch from "../../hooks/useFetch";

const ProfileContainer = styled.div`
    width: 25.6rem;
    height: 24.9rem;
    border: none;
    border-radius: 1.5rem;
    background: ${colors.sideBarGray};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5.9rem;
    padding-top: 4.3rem;
    gap: 3.3rem;
`

const ProfileImgContainer = styled.div`
    width: 10.1rem;
    height: 10.1rem;
    background: ${colors.white};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileImg = styled.img`
    width: 6.7rem;
    height: 5.5rem;
`

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const ProfileP = styled.p`
    text-align: center;
    font-size: ${(props) => props.size || '1.4rem'};
    font-weight: ${(props) => props.weight || '300'};
    color: ${colors.black};
`

const Profile = () => {
    const { data, loading, error } = useFetch('users/1');
    // console.log(data);

    return (
        <ProfileContainer>
            <ProfileImgContainer>
                <ProfileImg src={ProfilePng} alt="profile" />
            </ProfileImgContainer>
            
            <PContainer>
                <ProfileP size="2rem" weight="400">{loading ? "Loading..." : data?.name}</ProfileP>
                <ProfileP>{loading ? "Loading..." : data?.username}</ProfileP>
            </PContainer>
        </ProfileContainer>
    )
}

export default Profile;