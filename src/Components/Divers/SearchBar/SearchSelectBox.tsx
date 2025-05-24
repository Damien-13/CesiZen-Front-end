import { ChangeEvent } from "react";
import { ISelectBoxOption } from "../../../types/SelectBoxOption";

interface SearchSelectBoxProps {
  name: string;
  value: string | number;
  options: ISelectBoxOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SearchSelectBox = (props: SearchSelectBoxProps) => {
  return (
    <div className={`relative`}>
      <label htmlFor={props.name} className="sr-only">
        Recherche
      </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSelectBox;
