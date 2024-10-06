"use client";

import ReactSelect, { MultiValue, ActionMeta } from "react-select";

// Define a generic type for the option
interface OptionType {
  label: string; // Adjust based on your option shape
  value: string; // Adjust based on your option shape
}

interface SelectProps {
  label: string;
  value?: MultiValue<OptionType>; // Use MultiValue for multiple selections
  onChange: (value: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void; // Update the type for onChange
  options: OptionType[]; // Array of options
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange} // onChange now accepts MultiValue<OptionType>
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999
            })
          }}
          classNames={{
            control: () => "text-sm"
          }}
        />
      </div>
    </div>
  );
}

export default Select;
