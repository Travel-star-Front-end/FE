import styled from "styled-components";
import colors from "../common/colors";

// calender.jsx
export const CalenderContainer = styled.div`
  background: ${colors.homeGray};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3.1vw;
`;

export const CalenderInnerContainer = styled.div`
  width: 90%;
`;

export const CalenderP = styled.p`
  font-size: 1.2vw;
  font-weight: 600;
  color: ${colors.sideBarGray2};
`;

export const CalenderBar = styled.div`
  width: 100%;
  height: 0.05vw;
  background: ${colors.writeGray};
  margin-top: 0.5vw;
`;

export const CalenderContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
`;

// calenderLeft.jsx
export const CalenderLeftContainer = styled.div`
  width: 65%;
  padding-top: 0.95vw;
  border-right: 0.05vw solid ${colors.calenderGray};
`;

export const CalendarLeftInnerContainer = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 2.2vw;
`;

export const Header = styled.div`
  width: 100%;
  padding: 1.15vw 2.25vw 0.8vw 2.25vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalenderP2 = styled.p`
  font-size: 1vw;
  font-weight: 500;
  color: ${colors.black};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.4vw;
  align-items: center;
`;

export const ButtonImg = styled.img`
  width: 0.45vw;
  height: 0.7vw;
  cursor: pointer;
`;

export const WeekContainer = styled.div`
  width: 100%;
  height: 2.5vw;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: ${colors.calenderGray2};
  margin-bottom: 4.45vw;
`;

export const Day = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  font-weight: 500;
  color: ${colors.black};
`;

export const DateContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DateCell = styled.div`
  width: 100%;
  height: ${(props) => (props.lastrow === "true" ? "3.75vw" : "6.6vw")};
  text-align: center;
  cursor: pointer;
  font-size: 1vw;
  font-weight: 300;
  color: ${(props) => (props.selected ? colors.white : colors.black)};
  position: relative;
  z-index: 1;

  &.inactive {
    color: ${colors.calenderGray3};
  }
`;

export const SelectedDateCell = styled.div`
  position: absolute;
  top: ${(props) => (props.lastrow === "true" ? "15%" : "8%")};
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  background: ${colors.main};
  z-index: -1;
`;

// calenderRight.jsx
export const CalenderRightContainer = styled.div`
  width: 33%;
  padding-top: 2.25vw;
  display: flex;
  justify-content: flex-end;
`;

export const InnerCalenderRightContainer = styled.div`
  width: 92%;
  position: relative;
`;

export const PContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightP = styled.p`
  font-size: 1.2vw;
  font-weight: 700;
  color: ${colors.black};
`;

export const PlusButton = styled.img`
  width: 1.625vw;
  height: 1.625vw;
  cursor: pointer;
`;

export const NotP = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1vw;
  font-weight: 400;
  color: ${colors.sideBarGray2};
  opacity: 0.5;
  margin-top: 10.55vw;
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 3.15vw;
`;


// list-calender.jsx
export const ListContainer = styled.div`
    width: 100%;
    height: 27.85vw;
    overflow-y: scroll;
    border: 0.05vw solid ${colors.calenderGray};
`;

export const TitleContainer = styled.div`
    width: 100%;
    height: 2.15vw;
    background: ${({ editvisible }) => (editvisible === "true" ? colors.subMain : colors.white)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 1.2vw;
    border: 0.05vw solid ${colors.calenderGray};
    border-bottom: none;
`;

export const TitleInnerContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LeftContainer = styled.div`
    width: calc(100% - 3vw);
    display: flex;
    align-items: center;
`;

export const TitleP = styled.p`
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9vw;
    font-weight: 600;
    color: ${colors.black};
`;

export const TitleP2 = styled(TitleP)`
    font-size: 0.5vw;
    width: 100%;
    padding-right: 1vw;
`;

export const EditButton = styled.button`
    width: 3vw;
    height: 1.3vw;
    background: ${colors.homeGray};
    border: none;
    border-radius: 0.25vw;
    font-size: 0.8vw;
    font-weight: 500;
    color: ${colors.calenderGray4};
    cursor: pointer;
    display: ${({ visible }) => (visible === "true" ? "inline-block" : "none")};
`;

// item-calender.jsx
export const ItemContainer = styled.div`
    width: 100%;
    height: 3.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.05vw solid ${colors.calenderGray};
    background: ${({ selected }) => (selected ? colors.subMain : "transparent")};
    cursor: pointer;
`

export const ItemInnerContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ItemP = styled.p`
    font-size: 1.2vw;
    font-weight: 500;
    color: ${colors.black};
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ItemP2 = styled(ItemP)`
    font-size: 0.8vw;
    width: 100%;
    padding-right: 1vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const EditButton2 = styled.button`
    width: 3vw;
    height: 1.3vw;
    background: ${colors.homeGray};
    border: none;
    border-radius: 0.25vw;
    font-size: 0.8vw;
    font-weight: 500;
    color: ${colors.calenderGray4};
    cursor: pointer;
    display: ${({ selected }) => (selected ? "inline-block" : "none")};
`

// placeModal.jsx
export const PlaceModalContainer = styled.div`
  width: 100%;
  height: 11.1vw;
  border-radius: 0.75vw;
  padding: 0 0.6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;
  background: ${colors.calenderGray5};
`

export const PlaceTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PlaceTitleP = styled.p`
  font-size: 0.9vw;
  font-weight: 700;
  color: ${colors.sideBarGray2};
`

export const TrashImg = styled.img`
  width: 0.85vw;
  height: 0.9vw;
  cursor: pointer;
`;

export const PlaceInput = styled.input`
  width: 100%;
  height: 1.65vw;
  background: ${colors.white};
  border-radius: 0.25vw;
  font-size: 0.8vw;
  font-weight: 500;
  color: ${colors.sideBarGray2};
`

export const PlaceButton = styled.button`
  width: 9.6vw;
  height: 1.4vw;
  border-radius: 0.25vw;
  background: ${colors.main};
  cursor: pointer;
  font-size: 0.8vw;
  font-weight: 700;
  color: ${colors.white};
`

// modalTime.jsx
export const SelectBox = styled.div`
    position: relative;
    width: 2.85vw;
    height: 1.65vw;
    background: ${colors.white};
    border-radius: 0.25vw;
    padding: 0 0.3vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 0.8vw;
    font-weight: 700;
    color: ${colors.sideBarGray2};
`;

export const SelectToggle = styled.img`
    width: 0.35vw;
    height: 0.35vw;
`

export const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 6.35vw;
    overflow-y: auto;
    background: ${colors.calenderGray6};
    border-radius: 0 0 0.25vw 0.25vw;
    z-index: 100;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const Option = styled.div`
    width: 100%;
    height: 1.75vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.8vw;
    font-weight: 700;
    color: ${colors.sideBarGray2};
`;

// addModal.jsx, editModal.jsx
export const AddModalContainer = styled.div`
  width: 100%;
  height: 16.7vw;
  border-radius: 0.75vw;
  background: ${colors.calenderGray5};
  padding: 0 0.6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;
`;

export const TimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddTitleP = styled.p`
  font-size: 0.9vw;
  font-weight: 700;
  color: ${colors.sideBarGray2};
`;

export const AddTrashImg = styled.img`
  width: 0.85vw;
  height: 0.9vw;
  cursor: pointer;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  gap: 1.6vw;
  align-items: center;
`;

export const TimeSelectInnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45vw;
`;

export const AddInput = styled.input`
  width: 100%;
  height: 1.65vw;
  border-radius: 0.25vw;
  background: ${colors.white};
  font-size: 0.8vw;
  font-weight: 500;
  color: ${colors.sideBarGray2};
  padding-left: 0.3vw;
`;

export const AddButton = styled.button`
  width: 9.6vw;
  height: 1.4vw;
  border-radius: 0.25vw;
  background: ${colors.main};
  cursor: pointer;
  font-size: 0.8vw;
  font-weight: 700;
  color: ${colors.white};
  margin-top: 0.45vw;
  border: none;

  &:hover {
    background: ${colors.mainDark};
  }
`;