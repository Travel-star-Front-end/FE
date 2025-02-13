import React, { useState } from "react";
import * as s from "../../../styles/calender/calender";
import Toggle from "../../../assets/images/calender/toggle.png";

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
    <s.SelectBox onClick={toggleDropdown}>
        <s.SelectToggle src={Toggle} alt="toggle" />
        {value}

        {isOpen && (
            <s.Dropdown>
            {options.map((option) => (
                <s.Option key={option} onClick={() => selectOption(option)}>
                {option}
                </s.Option>
            ))}
            </s.Dropdown>
        )}
    </s.SelectBox>
  );
};

export default ModalTime;