import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export default function Button({className, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={classNames('py-3 px-[37px] rounded-lg bg-[#C951E7] shadow-bottom-purple text-[14px] leading-[0.875rem]', className)} {...props}/>
}