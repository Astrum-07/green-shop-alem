import { Skeleton } from "antd";

const loaderApi = () => {
  const categoryLoader = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <div key={index}>
        <Skeleton.Input block />
      </div>
    ));
  };

  return { categoryLoader };
};

export { loaderApi };