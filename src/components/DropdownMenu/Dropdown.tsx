import React, { useState } from "react";
import "./Dropdown.scss";

interface DropdownProps {
  options: string[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder = "Select" }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected || placeholder}</span>
        <span className="arrow">▾</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
