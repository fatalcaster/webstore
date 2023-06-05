import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { IconProps } from "./Icons";

type CustomInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: {
    Icon: (props: IconProps) => JSX.Element;
    side: "left" | "right";
    containerClassNames?: string;
    onClick?: () => void;
  };
  error?:
    | {
        message?: string;
      }
    | boolean;
  label?: { content: string; containerClassNames?: string };
};

export default function CustomInput({ className, ...props }: CustomInputProps) {
  const classNames = `py-3  rounded-full border-2 focus:outline-none 
                      focus:border-slate-900 bg-slate-200 block my-2 ${className}`;

  if (props.label && props.icon)
    return <InputWithIconAndLabel className={classNames} {...props} />;

  if (props.label) return <InputWithLabel className={classNames} {...props} />;

  if (props.icon) return <InputWithIcon className={classNames} {...props} />;

  return <BareInput className={`${classNames} px-4`} {...props} />;
}

export function InputWithLabel({
  className,
  label,
  children,
  ...props
}: CustomInputProps & { children?: ReactNode }) {
  if (!label) throw new Error("Must include label");
  const { error } = props;
  if (children !== undefined) {
    return (
      <div
        className={`{m-0 p-0 my-1 inline-block w-full ${label.containerClassNames}`}
      >
        <span className={`${error && "text-red-400"}`}>
          {label.content}
          {error && typeof error !== "boolean" && ` - ${error.message}`}
        </span>
        {children}
      </div>
    );
  }
  return (
    <label
      className={`{m-0 p-0 my-1 inline-block w-full ${label.containerClassNames}`}
    >
      <span className={`${error && "text-red-400"}`}>
        {label.content}
        {error && typeof error !== "boolean" && ` - ${error.message}`}
      </span>

      <BareInput className={`${className} pl-4`} {...props} />
    </label>
  );
}

export function InputWithIcon({ icon, className, ...props }: CustomInputProps) {
  if (!icon) throw new Error("Must include icon");
  const padX = icon.side === "left" ? "left-4" : "right-4";
  return (
    <div className={`relative p-0 ${icon.containerClassNames}`}>
      {icon.onClick ? (
        <button
          type="button"
          className={`absolute top-3 ${padX}`}
          onClick={icon.onClick}
        >
          <icon.Icon />
        </button>
      ) : (
        <icon.Icon className={`absolute top-5 ${padX}`} />
      )}

      <BareInput
        className={`${className} ${icon.side === "left" ? "pl-12" : "pl-4"}`}
        {...props}
      />
    </div>
  );
}

export function InputWithIconAndLabel({ label, ...props }: CustomInputProps) {
  if (!label || !props.icon) throw new Error("Must include label AND icon");
  return (
    <InputWithLabel label={label}>
      <InputWithIcon {...props} />
    </InputWithLabel>
  );
}
function BareInput({ className, error, ...props }: CustomInputProps) {
  return (
    <input
      className={`${className} ${error && "border-red-400 border-2"}`}
      {...props}
    />
  );
}
