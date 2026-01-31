import Shopping from "./shopping";
import CardTotal from "./card-total";

const ProductShop = () => {
  return (
  
    <div className="w-full max-w-[90%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-5 pt-4 px-2 sm:px-4 md:w-[90%]">
      

      <div className="w-full lg:flex-2">
        <Shopping />
      </div>

      
      <div className="w-full lg:flex-1 flex justify-center lg:justify-end mb-10 lg:mb-0">
        <CardTotal />
      </div>

    </div>
  );
};

export default ProductShop;