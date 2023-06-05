import { CSSProperties } from "react";

export interface IconProps {
  style?: CSSProperties;
  className?: string;
}

export function NavIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );
}
export function PlaneIcon({ style, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 49 41"
      style={style}
      className={`w-6 h-6 inline ${className}`}
    >
      <path d="m41.338 5.8483c-0.0732-0.15346-0.2248-0.25865-0.4514-0.22219-5.2295 0.91682-10.457 1.872-15.68 2.8255-5.2529 0.96348-10.504 1.932-15.755 2.8838-2.9522 0.5373-5.9126 1.0662-8.8698 1.5885-0.38318 0.0663-0.63825 0.5845-0.27019 0.8567 2.4165 1.8247 4.7831 3.716 7.0629 5.714 0.38682 3.6334 0.96522 7.2419 1.3504 10.87 0.00165 0.055 0.01329 0.1067 0.02993 0.1568 0.05491 0.1984 0.1898 0.3036 0.34971 0.3338 0.1216 0.0318 0.25821 0.0252 0.38985-0.063 1.7929-1.1186 3.5725-2.2606 5.3654-3.3793 0.9425 1.0647 1.8784 2.1427 2.8825 3.1424 1.0708 1.0664 2.3099 1.8546 3.509 2.7561 0.5047 0.3823 1.0409 0.743 1.2323 1.3684 0.1497 0.4836 0.3178 0.989 0.8475 1.1629 0.0133 0.0067 0.025 0.0084 0.0366 0.0101 0.1782 0.1018 0.3965 0.0904 0.5432-0.1362 5e-3 -0.0017 0.0033-0.0067 0.0083-0.0084 0.0233-0.0299 0.0417-0.0583 0.0633-0.0933 4.8222-7.3995 9.3312-14.99 13.682-22.671 1.2435-2.2029 2.4805-4.4092 3.7107-6.6188 0.0933-0.18664 0.0651-0.35506-0.0365-0.47687zm-29.636 18.114c5e-3 -0.0183 0.01-0.0367 0.02-0.0567 0.8292 0.9245 1.6519 1.8457 2.4811 2.7702-1.383 0.8656-2.7577 1.7395-4.139 2.6101 0.5421-1.7751 1.0891-3.5518 1.6379-5.3236zm-0.3627-1.4742c-0.1882 0.0681-0.2816 0.2048-0.3049 0.3515-0.0034 0.0066-0.0034 0.0066-0.0067 0.0133-0.5354 1.7284-1.0641 3.4602-1.5995 5.1886-0.3488-2.818-0.76257-5.6311-1.0697-8.4574 6.6477-2.2276 13.234-4.6403 19.743-7.2498-1.6646 0.937-3.3108 1.9124-4.9088 2.9662-1.8179 1.1937-3.5676 2.4924-5.3788 3.706-2.0363 1.3719-4.1491 2.6636-6.475 3.4816z" />
    </svg>
  );
}
export function UserIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      />
    </svg>
  );
}
export function HeartIcon({
  className,
  style,
  fill,
}: IconProps & { fill?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}
export function CreditCardIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  );
}
export function CalendarIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}
export function LockIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}
export function VisibleIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function InvisibleIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}
export function XIcon({ className, style }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
export function ArrowIcon({
  className,
  style,
  orientation,
}: IconProps & { orientation: "left" | "right" | "up" | "down" }) {
  const orientationClassName =
    orientation === "right"
      ? "rotate-180"
      : orientation === "up"
      ? "rotate-90"
      : orientation === "down"
      ? "-rotate-90"
      : "";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={style}
      className={`w-6 h-6 ${className} ${orientationClassName}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}
