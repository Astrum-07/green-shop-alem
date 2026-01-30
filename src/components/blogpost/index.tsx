import React, { FC } from "react";
import { ArrowRight } from "lucide-react";

// Blog ma'lumotlari uchun interfeys
interface Post {
  id: number;
  image: string;
  date: string;
  readTime: string;
  title: string;
  desc: string;
}

const BlogPosts: FC = () => {
  const posts: Post[] = [
    {
      id: 1,
      image: "https://green-shop-otabek.vercel.app/assets/1-Ch9JE0GV.png",
      date: "September 12",
      readTime: "Read in 6 minutes",
      title: "Cactus & Succulent Care Tips",
      desc: "Cacti are succulents are easy care plants for any home or patio.",
    },
    {
      id: 2,
      image: "https://green-shop-otabek.vercel.app/assets/2-BqD2fIC7.png",
      date: "September 13",
      readTime: "Read in 2 minutes",
      title: "Top 10 Succulents for Your Home",
      desc: "Best in hanging baskets. Prefers medium to high light.",
    },
    {
      id: 3,
      image: "https://green-shop-otabek.vercel.app/assets/3-Bg8f3bcT.png",
      date: "September 15",
      readTime: "Read in 3 minutes",
      title: "Cacti & Succulent Care Tips",
      desc: "Cacti and succulents thrive in containers and because most are..",
    },
    {
      id: 4,
      image: "https://green-shop-otabek.vercel.app/assets/4-CGk6Ds5n.png",
      date: "September 15",
      readTime: "Read in 2 minutes",
      title: "Best Houseplants Room By Room",
      desc: "The benefits of houseplants are endless. In addition to..",
    },
  ];

  return (
    <section className="w-full py-16 bg-white font-sans overflow-hidden">
      <div className="max-w-full mx-auto px-4">
        {/* Sarlavha qismi */}
        <div className="text-center mb-12">
          <h2 className="text-[#3D3D3D] text-3xl font-bold mb-3">Our Blog Posts</h2>
          <p className="text-[#727272] text-sm max-w-[600px] mx-auto leading-relaxed">
            We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
        </div>

        {/* Blog kartochkalari gridi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="flex flex-col bg-white border border-[#F5F5F5] hover:border-[#46A358]/30 transition-all duration-300 group cursor-pointer rounded-sm"
            >
              {/* Rasm qismi - Border bilan ajratilgan */}
              <div className="w-full h-[180px] overflow-hidden bg-[#FBFBFB] border-b border-[#F5F5F5]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Ma'lumot qismi - Ichki padding bilan */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[#46A358] text-xs font-bold mb-2 flex items-center gap-1.5">
                  {post.date} 
                  <span className="w-1 h-1 bg-[#46A358]/40 rounded-full"></span> 
                  {post.readTime}
                </p>
                
                <h3 className="text-[#3D3D3D] text-lg font-bold mb-3 leading-tight group-hover:text-[#46A358] transition-colors min-h-[44px]">
                  {post.title}
                </h3>
                
                <p className="text-[#727272] text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                  {post.desc}
                </p>
                
                <button className="flex items-center gap-2 text-[#3D3D3D] font-bold text-xs sm:text-sm hover:text-[#46A358] transition-all group/btn">
                  Read More 
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;