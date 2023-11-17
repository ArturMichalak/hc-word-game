import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export default function OneInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-11 border-2 rounded-lg focus-within:border-[#672171] flex items-center justify-center before:mt-0.5 before:w-full before:absolute before:inline-block before:text-white focus-within:before:content-['\_']">
      <input
        className={classNames(
          "z-10 w-full h-full p-0 m-0 text-white caret-transparent outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
