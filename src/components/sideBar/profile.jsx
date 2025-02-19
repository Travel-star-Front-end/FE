import * as s from "../../styles/common/sidebar/sidebar";
import ProfilePng from "../../assets/images/sideBar/profile.png";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
    const { data, loading, error } = useFetch("/mypage");
    const { data: userData, loading: userLoading } = useFetch("/planet");
    const { data: profileData } = useFetch("/profile-image");

    return (
        <s.ProfileContainer>
            <s.ProfileImgContainer src={profileData?.data || ProfilePng} alt="profile" />

            <s.PContainer>
                <s.ProfileP size="1vw" weight="400">
                    {loading ? "Loading..." : data?.data?.nickname || "닉네임 없음"}
                </s.ProfileP>

                <s.ProfileP>
                    {userLoading
                        ? "Loading..."
                        : userData?.planet_name
                        ? `${userData.planet_name} 행성`
                        : "행성 정보 없음"}
                </s.ProfileP>
            </s.PContainer>
        </s.ProfileContainer>
    );
};

export default Profile;
