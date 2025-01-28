import { useState } from "react";
import * as S from '../../../../styles/posts/posts/Tabs/friends-tab';
import { FriendCard, FriendApplyCard } from "./friend-card";

const FriendsTab = ({ friends, requests }) => {
    const [activeTab, setActiveTab] = useState("friends");

    return (
        <S.Container>
            <S.TabHeader>
                <button
                    className={activeTab === "friends" ? "active" : "inactive"}
                    onClick={() => setActiveTab("friends")}
                >
                    친구 목록
                </button>
                <button
                    className={activeTab === "requests" ? "active" : "inactive"}
                    onClick={() => setActiveTab("requests")}
                >
                    친구 신청
                </button>                    
            </S.TabHeader>
            <S.TabContent>
                {activeTab === "friends" && (
                <S.CardListContainer>
                    <FriendCard
                        name='여행일지'
                    />
                    <FriendCard
                        name='여행일지'
                    />
                    <FriendCard
                        name='여행일지'
                    />
                </S.CardListContainer>
                )}
                
                {activeTab === "requests" && (
                <S.CardListContainer>
                    <FriendApplyCard
                        name='젬무'
                    />
                    <FriendApplyCard
                        name='젬무'
                    />
                    <FriendApplyCard
                        name='젬무'
                    />
                </S.CardListContainer>
                )}
            </S.TabContent>
        </S.Container>
    );
}

export default FriendsTab;