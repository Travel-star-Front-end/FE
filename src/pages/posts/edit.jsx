import { useParams } from "react-router-dom";
import * as s from "../../styles/posts/write/write";
import EditForm from "../../components/posts/edit/editForm";
import useFetch from "../../hooks/useFetch";

const Edit = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`/posts/${id}`);
    
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