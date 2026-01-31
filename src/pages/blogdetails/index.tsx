import { useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Heart, MessageCircle, User } from "lucide-react";
import { useQueryHandler } from "../../hooks/useQuery";
import { useAxios } from "../../hooks/useAxios";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const { state: blogFromList } = useLocation();
  const hasIncrementedView = useRef(false); 


  const { data: apiResponse, isLoading } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: `blog-detail-${id}`,
    enabled: !!id && !blogFromList,
  });

  const blog = blogFromList || apiResponse?.data;


  useEffect(() => {
    const updateView = async () => {

      if (!id || id === ":id" || hasIncrementedView.current) return;

      try {
        await axios({
          url: "user/blog/view",
          method: "PUT",
          data: { _id: id } 
        });
        hasIncrementedView.current = true;
        console.log("View updated successfully");
      } catch (err: any) {
        console.error("View update error (Server 500 bo'lishi mumkin):", err.message);
      }
    };

    if (blog) updateView();
  }, [id, axios, blog]);

  if (isLoading && !blog) return <div className="text-center py-20 animate-pulse text-gray-400">Yuklanmoqda...</div>;
  if (!blog) return <div className="text-center py-20">Maqola topilmadi</div>;


  const author = typeof blog.created_by === 'object' ? blog.created_by : null;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-[90%] mx-auto px-6">
        

        <div className="pt-10 mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-black transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest">BACK</span>
          </button>
        </div>


        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
            {author?.avatar ? (
              <img src={author.avatar} alt="Author" className="w-full h-full object-cover" />
            ) : (
              <User className="text-gray-300" size={24} />
            )}
          </div>
          <div className="flex flex-col text-left">
            <h4 className="font-bold text-gray-900 text-lg leading-tight">
              {author?.full_name || "Muallif ma'lumoti"}
            </h4>
            <p className="text-gray-400 text-xs mt-0.5">
              Followers: {author?.followers_count || 0}
            </p>
          </div>
        </div>


        <h1 className="text-[38px] md:text-[50px] font-black text-gray-900 leading-[1.1] mb-12 tracking-tight text-left">
          {blog.title}
        </h1>


        <div className="blog-content text-left mb-20">
          <div 
            className="prose prose-lg max-w-none text-[#292929] leading-[1.8] font-serif"
            style={{ fontFamily: 'Georgia, serif', fontSize: '21px' }}
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>


        <div className="pt-10 border-t border-gray-100 flex items-center justify-between text-gray-400">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2"><Eye size={20}/> <span>{blog.views || 0}</span></div>
            <div className="flex items-center gap-2"><Heart size={20}/> <span>{blog.reaction_length || 0}</span></div>
            <div className="flex items-center gap-2"><MessageCircle size={20}/> <span>0</span></div>
          </div>
          <div className="text-sm font-medium">
            {new Date(blog.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;