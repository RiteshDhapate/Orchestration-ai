import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, Icon, Box } from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button } from "../../componentLibrary";

const SelectFieldWithAdd = ({
  options,
  placeholder,
  onSelection,
  value,
  onAddOption,
  isError,
  isFixedMenu,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuOffset = 40;
  const menuListOffset = 10 + 38;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue?.trim()) {
      if (onAddOption) {
        onAddOption(inputValue.trim());
        setInputValue("");
        setMenuIsOpen(false);
      }
    }
  };

  const handleMenuToggle = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleOptionSelect = (option) => {
    onSelection(option);
    setMenuIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const components = {
    DropdownIndicator: (props) => (
      <chakraComponents.DropdownIndicator
        {...props}
        className={`!bg-transparent`}
        onMouseDown={(e) => {
          e.preventDefault();
          handleMenuToggle();
        }}
      >
        <Icon as={ChevronDownIcon} />
      </chakraComponents.DropdownIndicator>
    ),
    MenuList: (props) => (
      <chakraComponents.MenuList
        {...props}
        className={`menu-list-custom ${!onAddOption ? "" : "!border-b-0 !rounded-b-none !bg-[#2d3748]"} ${isFixedMenu ? "" : "!max-h-[152px]"}`}
      >
        {props.children}
      </chakraComponents.MenuList>
    ),
    Option: (props) => (
      <chakraComponents.Option
        {...props}
        className="h-[40px]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </chakraComponents.Option>
    ),
  };

  let positionValue = Math.min((options?.length || 0) * menuOffset, 152);
  if(positionValue<152){
    positionValue += menuListOffset + 6;
  }else{
    positionValue += menuListOffset;
  }

  return (
    <Box position="relative" onClick={handleMenuToggle} ref={menuRef}>
      <Select
        options={options}
        isMulti={false}
        isSearchable={false}
        className={`[&_hr]:!hidden [role='listbox']:!absolute ${isError ? "!border-red-500 bg-red-900 bg-opacity-10" : ""}`}
        placeholder={placeholder}
        components={components}
        closeMenuOnSelect
        onChange={(data) => {
          handleOptionSelect(data);
        }}
        value={!!value?value:null}
        menuIsOpen={menuIsOpen}
        {...(isFixedMenu && {
          menuPortalTarget: document.body,

          styles: {
            menuPortal: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
            menuList: (provided) => ({
              ...provided,
              overflow: 'auto',
            }),
          },
        })}
        {...props}
      />
      {menuIsOpen && onAddOption && (
        <Box
          p={2}
          bg="white"
          border="1px solid"
          borderTop="none"
          borderBottomRadius="6px"
          background="#2d3748"
          borderColor="rgba(133,134,152,0.20)"
          position="absolute"
          top={`${positionValue}px`}
          left="0"
          right="0"
          zIndex="100"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter name"
            border="1px solid gray !important"
            background="#2d3748 !important"
            height="40px !important"
            borderRadius="8px !important"
            size="sm"
            mb={2}
            onClick={(e) => e.stopPropagation()}
          />
          <Box display="flex" width="100%" justifyContent="center">
            <Button
              className="px-12"
              onClick={(e) => {
                e.stopPropagation();
                handleAddOption();
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SelectFieldWithAdd;

SelectFieldWithAdd.defaultProps = {
  options: [],
  placeholder: "",
};

SelectFieldWithAdd.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onSelection: PropTypes.func.isRequired,
  value: PropTypes.object,
  onAddOption: PropTypes.func.isRequired,
};
