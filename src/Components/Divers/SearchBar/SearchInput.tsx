import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: SearchInputProps) => {
  return (
    <>
      <label htmlFor={props.name} className="sr-only">
        Recherche
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
          <FiSearch color="gray" />
        </div>
        <input
          name={props.name}
          type="text"
          id="table-search"
          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </>
  );
};

export default SearchInput;
