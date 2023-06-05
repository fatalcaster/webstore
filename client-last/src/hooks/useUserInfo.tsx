import ShippingOption from "@/interfaces/ShippingOption";
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useState,
  createContext,
  useReducer,
} from "react";
import zod from "zod";
interface ValidationError {
  message: string;
  field: string;
}

interface UserInfoContextProps {
  UserDataFields: TInputField[];
  UserPasswordField: TInputField;
  useShipping: () => readonly [
    methodId: string,
    setMethodId: (method: string) => void,
    availableOptions: ShippingOption[],
    setAvailableOptions: (options: ShippingOption[]) => void
  ];
  useQty: () => readonly [qty: number, setQty: (qty: number) => void];
  useError: () => readonly [
    error: ValidationError[],
    setError: (err: ValidationError[]) => void
  ];
  useCard: () => {
    cardNumber: string;
    setCardNumber: (number: string) => void;
    expDate: string;
    setExpDate: (date: string) => void;
  };
}

export const UserInfoContext = createContext<UserInfoContextProps>({
  UserDataFields: [],
  UserPasswordField: {
    content: "",
    fieldName: "",
    setContent: () => {},
    type: "text",
  },
  useShipping: () => ["", () => {}, [], () => {}],
  useCard: () => ({
    cardNumber: "",
    setCardNumber: () => {},
    expDate: "",
    setExpDate: () => {},
  }),
  useError: () => [[], () => {}],
  useQty: () => [1, () => {}],
});

type TInputField = {
  fieldName: string;
  content: string;
  type: HTMLInputTypeAttribute;
  setContent: ChangeEventHandler<HTMLInputElement>;
};
const onEmailChange: (state: string, new_content: string) => string = (
  _,
  new_content
) => {
  return new_content;
};
export default function useUserInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useReducer(onEmailChange, "");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [shippingId, setShippingId] = useState("");
  const [availableOptions, setAvailableOptions] = useState<ShippingOption[]>(
    []
  );
  const [qty, setQty] = useState(1);
  const [cardNumber, setCardNumber] = useState(""); //reducer
  const [expDate, setExpDate] = useState(""); //reducer
  const [error, setError] = useState<ValidationError[]>([]);

  const UserDataFields: TInputField[] = [
    {
      fieldName: "Name",
      content: name,
      type: "text",
      setContent: (e) => setName(e.target.value),
    },
    {
      fieldName: "Email",
      type: "email",
      content: email,
      setContent: (e) => setEmail(e.target.value),
    },
    {
      fieldName: "Country",
      type: "text",
      content: country,
      setContent: (e) => setCountry(e.target.value),
    },
    {
      fieldName: "Zip Code",
      type: "text",
      content: zipCode,
      setContent: (e) => setZipCode(e.target.value),
    },
    {
      fieldName: "Address",
      content: address,
      type: "text",
      setContent: (e) => setAddress(e.target.value),
    },
    {
      fieldName: "Phone Number",
      content: phone,
      type: "tel",
      setContent: (e) => setPhone(e.target.value),
    },
  ];
  const UserPasswordField: TInputField = {
    fieldName: "Password",
    type: "password",
    content: password,
    setContent: (e) => setPassword(e.target.value),
  };

  // const Provider = () => {};
  return {
    UserDataFields,
    UserPasswordField,
    useShipping: () =>
      [
        shippingId,
        setShippingId,
        availableOptions,
        setAvailableOptions,
      ] as const,
    useQty: () => [qty, setQty] as const,
    useError: () => [error, setError] as const,
    useCard: () =>
      ({ cardNumber, setCardNumber, expDate, setExpDate } as const),
  };
}
