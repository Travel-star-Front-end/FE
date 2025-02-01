import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import Toggle from "../../../assets/images/calender/toggle.png";

const SelectBox = styled.div`
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

const SelectToggle = styled.img`
    width: 0.35vw;
    height: 0.35vw;
`

const Dropdown = styled.div`
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

const Option = styled.div`
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

const ModalTime = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectBox onClick={toggleDropdown}>
        <SelectToggle src={Toggle} alt="toggle" />
        {value}

        {isOpen && (
            <Dropdown>
            {options.map((option) => (
                <Option key={option} onClick={() => selectOption(option)}>
                {option}
                </Option>
            ))}
            </Dropdown>
        )}
    </SelectBox>
  );
};

export default ModalTime;
