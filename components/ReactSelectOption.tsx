import Select from "react-select";

function SelectList({
   options,
   label,
   selectedOption,
   onFilterChange,
   classes,
   controlStyle,
   placeholder,
   name,
   setFieldValue,
   quantity,
}: any) {
   // Format options for react-select
   const selectOptions = options.map((option: any) => ({
      value: option,
      label: option,
   }));

   // handle value
   const handleValue = (selectedOption: string, name: string) => {
      if (!selectedOption) return null;

      return name === "show1" || name === "show2"
         ? { value: selectedOption, label: `${selectedOption} (${quantity})` }
         : { value: selectedOption, label: selectedOption };
   };

   return (
      <div>
         <label className="hidden">{label}</label>
         <Select
            name={name}
            value={handleValue(selectedOption, name)}
            onChange={(selected: any) => {
               if (setFieldValue) {
                  setFieldValue(name, selected.value);
                  onFilterChange(selected.value, name);
               } else onFilterChange(selected.value, name);
            }}
            options={selectOptions}
            className={`${classes}`}
            placeholder={placeholder}
            styles={{
               control: (styles, { isFocused }) => ({
                  ...styles,
                  borderRadius: "11px",
                  backgroundColor: "#d61313",
                  borderWidth: "0.6px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  outline: "none",
                  boxShadow: "none",
                  borderColor: isFocused
                     ? "#D5D5D5 !important"
                     : "#D5D5D5 !important",
                  ...controlStyle,
               }),
               valueContainer: () => ({
                  padding: "0 !important",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
               }),
               singleValue: (styles) => ({
                  ...styles,
                  color: "#000",
               }),
               option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  padding: "0 13.38px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  color: "#000",
                  background: isFocused || isSelected ? "#E1E1E1" : "#FFF",
                  cursor: "pointer",
               }),
               menu: (styles) => ({
                  ...styles,
                  boxShadow: "0px 13px 61px 0px #A9A9A95D",
                  width: "160px",
                  overflowY: "visible",
                  right: "0",
               }),
               input: (styles) => ({
                  ...styles,
                  color: "#000",
               }),
               indicatorSeparator: (styles) => ({
                  display: "none",
               }),
               dropdownIndicator: (styles) => ({
                  ...styles,
                  padding: "0", // Reduce padding around the dropdown arrow
               }),
            }}
            isSearchable={false}
         />
      </div>
   );
}

export default SelectList;
