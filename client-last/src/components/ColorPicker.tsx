import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
}
export default function ColorPicker({ colors }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-bold mb-2">Select color</h2>
      <div className="touch:overflow-y-hidden touch:h-12 non-touch:h-auto">
        <div className="block ">
          <ul className="touch:inline-flex">
            {colors.map((_, index) => {
              return (
                <li
                  style={{
                    border:
                      selectedColor === index
                        ? `solid 2px ${colors[index]}`
                        : "",
                  }}
                  className={`w-10 h-10 mx-2 last:mr-0 first:ml-0  inline-flex justify-center items-center rounded-full`}
                  key={index}
                >
                  <button
                    style={{ backgroundColor: colors[index] }}
                    onClick={() => setSelectedColor(index)}
                    className="w-2/3 h-2/3 rounded-full clickable"
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
