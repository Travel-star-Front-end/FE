import * as s from "../../styles/common/sidebar/sidebar";
import ProfilePng from "../../assets/images/sideBar/profile.png";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
    const { data, loading, error } = useFetch('users/1');
    // console.log(data);

    return (
        <s.ProfileContainer>
            <s.ProfileImgContainer>
                <s.ProfileImg src={ProfilePng} alt="profile" />
            </s.ProfileImgContainer>
            
            <s.PContainer>
                <s.ProfileP size="1vw" weight="400">{loading ? "Loading..." : data?.name}</s.ProfileP>
                <s.ProfileP>{loading ? "Loading..." : data?.username}</s.ProfileP>
            </s.PContainer>
        </s.ProfileContainer>
    )
}

export default Profile;