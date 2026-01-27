import CardTotal from "./card-total";
import Shopping from "./shopping";

const ProductsShop = () => {
  return (
    <div>
      <div className="grid grid-cols-[3fr_1fr] gap-5">
        <Shopping />
        <CardTotal />
      </div>
    </div>
  );
};

export default ProductsShop;