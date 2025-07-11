import { ChangeEvent } from "react";
import { ISelectBoxOption } from "../../types/SelectBoxOption";

interface SelectProps {
  options: ISelectBoxOption[];
  label: string;
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = (props: SelectProps) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      {props.value && (
        <label
          htmlFor={props.name}
          className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 
                  transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                  peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
        >
          {props.label}
        </label>
      )}
      <select
        name={props.name}
        id={props.name}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b ${
          props.error ? "border-red-500" : "border-gray-300"
        } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        disabled={props.disabled}
        onChange={props.onChange}
        required={props.required}
        value={props.value}
        aria-invalid={props.error}
      >
        {props.options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {props.helperText && props.helperText?.length > 0 && (
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-400 dark:text-gray-400 text-left"
        >
          {props.helperText}
        </p>
      )}
    </div>
  );
};

export { SelectBox };