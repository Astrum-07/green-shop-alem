import Category from "./category";
import Products from "./products";

const Dashboard = () => {
  return (
    <div className="md:mt-5 mt-48 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-5">
      <Category />
      <Products />
    </div>
  );
};

export default Dashboard;