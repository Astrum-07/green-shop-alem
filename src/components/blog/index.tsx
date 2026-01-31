import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Heart, MessageCircle } from "lucide-react";
import { useQueryHandler } from "../../hooks/useQuery";
import type { BlogType } from "../../@types";


const Blogs = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [localData, setLocalData] = useState<BlogType[]>([]);

  const { data: apiResponse, isLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog-list",
    param: { search: "" },
  });

  useEffect(() => {
    const data = apiResponse?.data || apiResponse; // API strukturangizga qarab
    if (Array.isArray(data)) {
      setLocalData(data);
      localStorage.setItem("blogs_store", JSON.stringify(data));
    } else {
      const cached = localStorage.getItem("blogs_store");
      if (cached) setLocalData(JSON.parse(cached));
    }
  }, [apiResponse]);

  const filteredList = useMemo(() => {
    const term = query.toLowerCase().trim();
    return localData.filter(b => 
      b.title?.toLowerCase().includes(term) || 
      b.short_description?.toLowerCase().includes(term)
    );
  }, [query, localData]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-6">
      <div className="max-w-[90%] mx-auto">
        

        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Maqolalarni izlash..."
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-100 shadow-xl outline-none focus:ring-2 focus:ring-[#46a358]/20 transition-all"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
             Array(6).fill(0).map((_, i) => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />)
          ) : filteredList.map((blog) => (
            <div 
              key={blog._id} 
              onClick={() => navigate(`/blog/${blog._id}`, { state: blog })}
              className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#46a358]">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-8">
                {blog.short_description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50 text-gray-400">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 text-xs"><Eye size={14}/> {blog.views}</span>
                  <span className="flex items-center gap-1.5 text-xs"><MessageCircle size={14}/> {blog.comments_count || 0}</span>
                </div>
                <Heart size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;