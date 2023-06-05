import cardValidator, { number } from "card-validator";
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from "react";
import ActionButton from "./ActionButton";
import CustomInput from "./CustomInput";
import {
  ArrowIcon,
  CalendarIcon,
  CreditCardIcon,
  IconProps,
  InvisibleIcon,
  LockIcon,
  PlaneIcon,
  VisibleIcon,
  XIcon,
} from "./Icons";
import { PopupMenuContext } from "./PopupMenu";
import useUserInfo, { UserInfoContext } from "@/hooks/useUserInfo";
import ShippingOption from "@/interfaces/ShippingOption";
import React from "react";

interface LayoutTemplateProps {
  children?: ReactNode;
  callToAction?: CallToActionProps;
  title: string;
}
interface CallToActionProps {
  callToAction: string;
  callToActionTitle: string;
  action: () => void;
}

function LayoutTemplate({
  children,
  title,
  callToAction,
}: LayoutTemplateProps) {
  const { isStart, prev, setIsVisible } = useContext(PopupMenuContext);
  return (
    <>
      <div className="flex justify-between items-center bg-transparent relative">
        {!isStart && (
          <button className="self-center mb-4 mr-2" onClick={prev}>
            <ArrowIcon orientation="left" />
          </button>
        )}
        <div className="mr-auto">
          <h1 className={`font-rounded ${!callToAction && "mb-4"}`}>{title}</h1>

          {callToAction && (
            <div className="text-sm mb-4">
              <span className="font-thin">{callToAction.callToAction}</span>
              {callToAction.callToActionTitle && (
                <button className="hover:underline">
                  <span className="ml-2">{callToAction.callToActionTitle}</span>
                  <span className="ml-1">
                    <PlaneIcon />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
        <button className="self-start" onClick={() => setIsVisible(false)}>
          <XIcon />
        </button>
      </div>
      {children}
    </>
  );
}
export function UserDataLayout() {
  const { next } = useContext(PopupMenuContext);
  const { UserDataFields } = useContext(UserInfoContext);
  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    next();
  };

  return (
    <LayoutTemplate
      title={"Almost there..."}
      callToAction={{
        callToAction: "Already have an account?",
        action: () => {},
        callToActionTitle: "Sign in",
      }}
    >
      <div className="overflow-y-auto flex justify-center">
        <div className="leading-3 px-1 w-full">
          <div>
            <form className="">
              {UserDataFields.map((value, index) => {
                return (
                  <CustomInput
                    minLength={1}
                    required
                    key={index}
                    onChange={value.setContent}
                    value={value.content}
                    label={{ content: value.fieldName }}
                    className="w-full"
                  />
                );
              })}
              <ActionButton
                className="w-full mt-4 mb-8 h-12"
                onClick={onSubmit}
              >
                Continue
              </ActionButton>
            </form>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

function SignUpPromptLayout() {
  const { next } = useContext(PopupMenuContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const {} = useUserInfo();
  const { UserPasswordField } = useContext(UserInfoContext);

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    next();
  };

  const togglePasswordVisible = () => {
    console.log(passwordVisible);
    setPasswordVisible((prev) => !prev);
  };

  const currentIcon = passwordVisible
    ? (_props: IconProps) => <InvisibleIcon />
    : (_props: IconProps) => <VisibleIcon />;
  return (
    <LayoutTemplate
      title="Create an account?"
      callToAction={{
        callToAction: "Your info will stay in tact.",
        action: () => {},
        callToActionTitle: "",
      }}
    >
      <div className="overflow-y-auto flex justify-center">
        <div className="leading-3 px-1 w-full">
          <div>
            <form className="">
              <CustomInput
                onChange={UserPasswordField.setContent}
                value={UserPasswordField.content}
                type={passwordVisible ? "text" : "password"}
                label={{ content: "Password" }}
                icon={{
                  Icon: currentIcon,
                  side: "right",
                  onClick: togglePasswordVisible,
                }}
                className="w-full"
              />

              <p className="font-thin text-sm mb-12 text-center">
                Track orders and get discounts across all CodeDepo stores!
              </p>
              <ActionButton
                className="w-full mt-4 mb-8 h-12"
                onClick={onSubmit}
              >
                Continue
              </ActionButton>
            </form>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

const shippingFields: ShippingOption[] = [
  {
    id: Math.random().toString(),
    name: "Express Shipping",
    provider: "DHL",
    cost: 4544 / 100,
    time: "5-7 working days",
  },
  {
    id: Math.random().toString(),
    name: "Express Shipping",
    provider: "DHL",
    cost: 4544 / 100,
    time: "5-7 working days",
  },
  {
    id: Math.random().toString(),
    name: "Express Shipping",
    provider: "DHL",
    cost: 4544 / 100,
    time: "5-7 working days",
  },
];
function ShippingOptionsLayout() {
  const { next } = useContext(PopupMenuContext);
  const onSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    next();
  };
  const { useShipping } = useContext(UserInfoContext);
  const [methodId, setMethod] = useShipping();

  return (
    <LayoutTemplate title="Select a shipping option">
      <div className="overflow-y-auto flex justify-center">
        <div className="leading-3 px-1 w-full">
          <div>
            {shippingFields.map((value) => {
              return (
                <label
                  key={value.id}
                  className="m-0 p-0 inline-block w-full"
                  htmlFor={value.name}
                >
                  <button
                    onClick={() => setMethod(value.id)}
                    type="button"
                    className={`bg-slate-200 my-2 w-full px-4 py-3 rounded-full flex justify-between items-center active:scale-75 cursor-pointer border-4 ${
                      methodId === value.id
                        ? "border-slate-900"
                        : "border-transparent "
                    }`}
                  >
                    <div className="p-1">
                      <span className="text-left">
                        {value.name} {" - "}
                        <span className="font-bold">{value.provider}</span>
                      </span>
                      <span className="block text-left text-sm font-thin mt-1">
                        {value.time}
                      </span>
                    </div>
                    <div>${value.cost}</div>
                  </button>
                </label>
              );
            })}

            <ActionButton className="w-full mt-4 mb-8 h-12" onClick={onSubmit}>
              Continue
            </ActionButton>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

function DisplayTotalLayout() {
  const [tabNumber, setTabNumber] = useState(0);
  const { useQty, useCard } = useContext(UserInfoContext);
  const [qty, setQty] = useQty();
  const { setExpDate, expDate, setCardNumber, cardNumber } = useCard();
  const onQtyChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === null) return;
    const number = parseInt(e.target.value);
    if (!Number.isNaN(number)) setQty(number);
    // else  setQty()
    if (e.target.value === "") setQty(0);
  };
  const onDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === null) return;
    if (e.target.value.length === 2) {
      if (expDate.length < 2) {
        setExpDate(e.target.value + "/");
      } else setExpDate(e.target.value.slice(0, 1));

      return;
    }
    setExpDate(e.target.value);
  };
  const onCardChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const content = e.target.value;
    if (content === null) return;
    if (e.target.value === "") {
      setCardNumber("");
      return;
    }
    // const t = parseInt(content[content.length - 1]);
    const card = cardValidator.number(e.target.value);
    if (card.isPotentiallyValid || e.target.value === "") {
      if (
        card.card &&
        content.length - tabNumber >= Math.max(...card.card.lengths)
      )
        return;
      if (
        card.card &&
        card.card.gaps.includes(e.target.value.length - tabNumber)
      ) {
        setCardNumber(e.target.value + "\t");
        setTabNumber((prev) => prev + 1);
      } else setCardNumber(e.target.value);
    }
  };
  return (
    <LayoutTemplate title="Final steps!">
      <div className="overflow-y-auto flex justify-center">
        <div className="leading-3 px-1 w-full">
          <div className="flex flex-col">
            <div className="flex items-center w-full">
              <input
                min="1"
                max="99"
                className="w-[7ch] p-2 h-[3ch] focus:outline-none border-slate-900 border-2 rounded-full text-center"
                value={qty}
                onChange={onQtyChange}
              />
              <span className="font-rounded mx-2 block">x</span>
              <span className="block">Product Name</span>
              <p className="ml-auto font-medium">$ {32241 / 100}</p>
            </div>
            <div className="mb-3 ml-24 font-thin text-sm">
              <div>
                <span>
                  Size: <span className="font-bold">XL</span>
                </span>
              </div>
              <div>
                <span>
                  Color: <span className="font-bold">RED</span>
                </span>
              </div>
            </div>
            <div className="flex items-center w-full">
              <span className="ml-[5.5rem]">Shipping</span>
              <p className="ml-auto font-medium">$ {32241 / 100}</p>
            </div>
            <hr className="border-b-slate-900 border-dashed border-2 my-3" />
            <div className="flex">
              <span className="font-rounded">Total:</span>
              <span className="font-rounded ml-auto">$ {3554 / 100}</span>
            </div>
            <div className="mt-10 flex flex-col">
              <CustomInput
                icon={{
                  Icon: (props: IconProps) => <CreditCardIcon {...props} />,
                  side: "left",
                  containerClassNames: "w-full",
                }}
                value={cardNumber}
                onChange={onCardChange}
                maxLength={23}
                // min="0"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full"
              />
              <div className="flex justify-end gap-4 pr-4">
                <CustomInput
                  icon={{
                    Icon: (props: IconProps) => <CalendarIcon {...props} />,
                    side: "left",
                  }}
                  value={expDate}
                  onChange={onDateChange}
                  min="0"
                  maxLength={5}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="mm/yy"
                  className="w-32"
                />
                <CustomInput
                  icon={{
                    Icon: (props: IconProps) => <LockIcon {...props} />,
                    side: "left",
                  }}
                  min="0"
                  maxLength={4}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="CCV"
                  className="w-28"
                />
              </div>
            </div>
            <ActionButton className="w-full mt-4 mb-8 h-12">
              Confirm
            </ActionButton>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
}

export enum EPopupLayouts {
  UserDataPage = "data-page",
  SignUpPromptPage = "signup-page",
  ShippingOptionPage = "shipping-page",
  DisplayTotalPage = "total-page",
}
export const Layouts: { [key in EPopupLayouts]: () => JSX.Element } = {
  [EPopupLayouts.UserDataPage]: UserDataLayout,
  [EPopupLayouts.SignUpPromptPage]: SignUpPromptLayout,
  [EPopupLayouts.ShippingOptionPage]: ShippingOptionsLayout,
  [EPopupLayouts.DisplayTotalPage]: DisplayTotalLayout,
};
