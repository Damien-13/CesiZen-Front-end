interface TextAreaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
}

const TextArea = (props: TextAreaProps) => {
  const helperId = `${props.name}-helper-text`;

  return (
    <div className="w-full">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      )}

      <textarea
        id={props.name}
        name={props.name}
        value={props.value}
        rows={props.rows ?? 6}
        placeholder={props.placeholder}
        disabled={props.disabled}
        maxLength={props.maxLength ?? 500}
        required={props.required}
        aria-invalid={props.error}
        aria-describedby={props.helperText ? helperId : undefined}
        onChange={props.onChange}
        className={`block p-2 w-full text-sm rounded-lg
            border ${props.error ? "border-red-500" : "border-gray-300"}
            text-gray-900 bg-gray-50
            focus:outline-none focus:ring-1 ${
              props.error
                ? "focus:ring-red-500 focus:border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />

      {props.helperText && (
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

export default TextArea;
