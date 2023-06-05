import { useState } from "react";

interface SizePickerProps {
  sizes: string[];
  className?: string;
}
export default function SizePicker({ sizes, className }: SizePickerProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className={`${className}`}>
      <h2 className="font-bold mb-2">
        Select size
        <span className="font-normal">{" (UK)"}</span>
      </h2>
      <div className="touch:overflow-y-hidden touch:h-12 non-touch:h-auto">
        <div className="block ">
          <ul className="touch:inline-flex">
            {sizes.map((value, index) => {
              return (
                <li
                  className={`${
                    selectedSize === index && "bg-slate-900 text-slate-100"
                  } w-11 mx-2 cclick last:mr-0 mb-2  inline-flex justify-center items-center h-11 font-semibold rounded-lg  shadow-md border border-slate-200`}
                  key={index}
                >
                  <button
                    onClick={() => setSelectedSize(index)}
                    className="w-full h-full border-0"
                  >
                    {value}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
