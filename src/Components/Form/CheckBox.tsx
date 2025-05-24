interface CheckBoxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  disabled?: boolean;
  linkBefore?: {
    href: string;
    text: string;
  };
  linkAfter?: {
    href: string;
    text: string;
  };
}

const CheckBox = (props: CheckBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={props.name}
        name={props.name} 
        checked={props.isChecked}
        disabled={props.disabled}
        onChange={props.onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={props.label}
        className="ms-2 text-sm text-gray-900 dark:text-gray-300"
      >
        {props.linkBefore && (
          <a
            href={props.linkBefore.href}
            className="text-blue-600 dark:text-blue-500 hover:underline mr-1"
          >
            {props.linkBefore.text}
          </a>
        )}
        {props.label}
        {props.linkAfter && (
          <a
            href={props.linkAfter.href}
            className="text-blue-600 dark:text-blue-500 hover:underline ml-1"
          >
            {props.linkAfter.text}
          </a>
        )}
      </label>
    </div>
  );
};

export default CheckBox;
