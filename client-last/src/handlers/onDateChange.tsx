// import { UserInfoContext } from "@/hooks/useUserInfo";
// import { ChangeEventHandler, useContext } from "react";

// const onDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
//   const { useCard } = useContext(UserInfoContext);
//   const { expDate, setExpDate } = useCard();
//   if (e.target.value === null) return;
//   if (e.target.value.length === 2) {
//     if (expDate.length < 2) {
//       setExpDate(e.target.value + "/");
//     } else setExpDate(e.target.value.slice(0, 1));

//     return;
//   }
//   setExpDate(e.target.value);
// };

// export default onDateChange;
