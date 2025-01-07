import styled from "styled-components";
import colors from "../../styles/colors";
import WriteForm from "../../components/posts/write/writeForm";

const WriteContainer = styled.div`
    background: ${colors.homeGray};
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3.1vw 0 2.25vw 0;
`

const WriteInnerContainer = styled.div`
    width: 90%;
`

const WriteP = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: ${colors.sideBarGray2};
`

const WriteBar = styled.div`
    width: 100%;
    height: 0.1rem;
    background: ${colors.writeGray};
    margin-top: 0.035vw;
`

const Write = () => {
    return (
        <WriteContainer>
            <WriteInnerContainer>
                <WriteP>일지 작성</WriteP>
                <WriteBar />

                <WriteForm />
            </WriteInnerContainer>
        </WriteContainer>
    )
}

export default Write;