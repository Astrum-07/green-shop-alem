import type { ProductType, QueryType } from "../../../@types";
import { useQueryHandler } from "../../../hooks/useQuery";
import Card from "./card";



const Products = () => {
  const { data,  }: QueryType<ProductType[]> =
    useQueryHandler({
      url: "flower/category/house-plants",
      pathname: "products",
    });

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {data?.map((value) => (
          <Card key={value._id} {...value} />
        ))}
      </div>
    </div>
  );
};

export default Products;