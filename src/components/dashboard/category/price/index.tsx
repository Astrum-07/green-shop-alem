import { Slider } from "antd";
import { useState } from "react";
import { useSearchParamsHandler } from "../../../../hooks/paramsApi";

const Price = () => {
  const [slider, setSlider] = useState<number[]>([0, 1000]);

  const { setParam, getParam } = useSearchParamsHandler();
  const category = getParam("category") || "house-plants";
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort")||"default-sorting"

  const changeSlider = (e: number[]) => {
    setSlider(e);
  };

  return (
    <div className="mt-5">
      <h3 className="text-[#3d3d3d] font-bold">Price Range</h3>

      <Slider
        onChange={changeSlider}
        range
        defaultValue={slider}
        max={1000}
        min={0}
      />
      <div>
        Price{" "}
        <span className="text-main text-[15px] font-bold ml-4">
          {slider[0]}$ - {slider[1]}$
        </span>
      </div>

      <button
        onClick={() =>
          setParam({
            category,
            range_min: slider[0],
            range_max: slider[1],
            type,
            sort,
          })
        }
        className="bg-main rounded-lg font-medium text-white p-[7px_25px] w-full cursor-pointer mt-2"
      >
        Filter
      </button>
    </div>
  );
};

export default Price;
