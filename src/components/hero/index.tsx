import { Carousel } from "antd";
import type { FC } from "react";
import { hero_mock } from "../../utils";
import HeroItem from "./hero-item";


const Hero: FC = () => {
  return (
    <div className="h-112.5  max-md:h-100 bg-[#F5F5F5]">
      <Carousel autoplay className="mt-5">
        {hero_mock.map((item) => (
          <HeroItem key={item.id} {...item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;