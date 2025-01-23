import * as s from "../../styles/posts/write/write";
import EditForm from "../../components/posts/edit/editForm";
import useFetch from "../../hooks/useFetch";

const Edit = () => {
    const { data, loading, error } = useFetch("/posts/1");

    return (
        <s.WriteContainer>
            <s.WriteInnerContainer>
                <s.WriteP>일지 수정</s.WriteP>
                <s.WriteBar />

                <EditForm data={data} />
            </s.WriteInnerContainer>
        </s.WriteContainer>
    )
}

export default Edit;