import styled from "styled-components";
import colors from "../../../styles/common/colors";

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

const CalenderRight = ({ selectedDay }) => {
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
        </InnerCalenderRightContainer>
      </CalenderRightContainer>
    );
  };
  
export default CalenderRight;