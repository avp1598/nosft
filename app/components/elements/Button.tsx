interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'large';
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}
import { classNames } from "../../utils";

export const Button = ({
  primary = false,
  size = 'small',
  label,
  type = 'button',
  ...props
}: ButtonProps) => {

  let buttonSize = size == 'large' ? 'px-6 py-3 text-lg' : 'px-3.5 py-1.5 text-sm text-yellow-500'

  return (
    <button
      type={type}
      className={
        classNames(primary ?
          "bg-yellow-500 text-gray-800 font-semibold" : "text-white",
          `rounded-md shadow-lg shadow-yellow-500/50 border border-yellow-500 ${buttonSize}`
        )}
      {...props}
    >
      {label}
    </button>
  );
};
