import { Select } from "antd";
import { products_title } from "../../../../utils";
import { useSearchParamsHandler } from "../../../../hooks/paramsApi";

const ProductsTitle = () => {
  const { setParam, getParam } = useSearchParamsHandler();
  const category = getParam("category") || "house-plants";
  const range_min = getParam("range_min") || 0;
  const range_max = getParam("range_max") || 1000;
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";

  const changed = (e: string) => {
    setParam({ sort: e });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3 sm:gap-6 cursor-pointer flex-wrap">
        {products_title.map((value) => (
          <h3
            onClick={() =>
              setParam({
                category,
                range_min,
                range_max,
                type: value.route_path,
              })
            }
            className={`hover:text-main text-[13px] sm:text-[16px] font-medium transition-colors ${
              value.route_path === type ? "text-main border-b-2 border-main" : "text-[#3D3D3D]"
            }`}
            key={value.id}
          >
            {value.title}
          </h3>
        ))}
      </div>


      <div className="flex items-center justify-between sm:justify-end gap-2 text-[14px]">
        <span className="whitespace-nowrap">Short by:</span>
        <Select
          onChange={changed}
          defaultValue={sort}
          style={{ width: 150 }}
          className="w-30 sm:w-37.5"
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Cheapest" },
            { value: "most-expensive", label: "Most Expansive" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsTitle;