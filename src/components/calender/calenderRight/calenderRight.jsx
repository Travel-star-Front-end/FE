import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ListCalender from "./list-calender";
import useFetch from "../../../hooks/useFetch";

const CalenderRightContainer = styled.div`
    width: 33%;
    padding-top: 2.25vw;
    display: flex;
    justify-content: flex-end;
`

const InnerCalenderRightContainer = styled.div`
    width: 92%;
`

const RightP = styled.p`
    font-size: 1.2vw;
    font-weight: 700;
    color: ${colors.black};
`

const SaveButton = styled.button`
    width: 100%;
    height: 3.6vw;
    border-radius: 0.75vw;
    background: ${colors.main};
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    cursor: pointer;
    margin-top: 3.3vw;
`

const CalenderRight = ({ selectedDay }) => {
    const { data, loading, error } = useFetch("/users");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ko-KR', options);
    };

    return (
      <CalenderRightContainer>
        <InnerCalenderRightContainer>
            <RightP>일정작성</RightP>
            <RightP style={{fontSize: "1vw", fontWeight: "600", marginTop: "0.8vw"}}>{formatDate(selectedDay)}</RightP>

            <ListCalender data={data} />

            <SaveButton>저장하기</SaveButton>
        </InnerCalenderRightContainer>
      </CalenderRightContainer>
    );
  };
  
export default CalenderRight;