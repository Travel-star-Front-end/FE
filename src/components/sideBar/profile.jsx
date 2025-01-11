import styled from "styled-components";
import colors from "../../styles/colors";
import ProfilePng from "../../assets/images/sideBar/profile.png";
import useFetch from "../../hooks/useFetch";

const ProfileContainer = styled.div`
    width: 12.8vw;
    height: 11.95vw;
    border: none;
    border-radius: 0.75vw;
    background: ${colors.sideBarGray};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.1vw;
    padding-top: 2.15vw;
    gap: 0.8vw;
`

const ProfileImgContainer = styled.div`
    width: 5.05vw;
    height: 5.05vw;
    background: ${colors.white};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProfileImg = styled.img`
    width: 2.4vw;
    height: 2.95vw;
`

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const ProfileP = styled.p`
    text-align: center;
    font-size: ${(props) => props.size || '0.7vw'};
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
                <ProfileP size="1vw" weight="400">{loading ? "Loading..." : data?.name}</ProfileP>
                <ProfileP>{loading ? "Loading..." : data?.username}</ProfileP>
            </PContainer>
        </ProfileContainer>
    )
}

export default Profile;