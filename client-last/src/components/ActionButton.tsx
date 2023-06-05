import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export default function ActionButton({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={`relative  pclick  ${className}`} {...props}>
      <div
        className={`select-none pointer-events-none 
        absolute w-full h-full top-0 rounded-full  bg-slate-900 text-slate-100 flex justify-center items-center clickable `}
      >
        {children}
      </div>
    </button>
  );
}
