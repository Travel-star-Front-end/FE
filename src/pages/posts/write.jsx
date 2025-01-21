import * as s from "../../styles/posts/write/write";
import WriteForm from "../../components/posts/write/writeForm";

const Write = () => {
    return (
        <s.WriteContainer>
            <s.WriteInnerContainer>
                <s.WriteP>일지 작성</s.WriteP>
                <s.WriteBar />

                <WriteForm />
            </s.WriteInnerContainer>
        </s.WriteContainer>
    )
}

export default Write;