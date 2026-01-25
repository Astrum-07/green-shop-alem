import Category from "./category";
import Products from "./products";

const Dashboard = () => {
  return (
    <div className="mt-5 grid grid-cols-[1fr_3fr] gap-5">
      <Category />
      <Products />
    </div>
  );
};

export default Dashboard;