


import BlogPosts from '../../components/blogpost'
import Dashboard from '../../components/dashboard'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Hero from '../../components/hero'
import SummerSection from '../../components/summer'

const Home = () => {
  return (
    <div>
        <Header/>
       <div className="w-[90%] mx-auto">
         <Hero/>
         <Dashboard/>
         <SummerSection/>
          <BlogPosts/>
       </div>
       <Footer/>
    </div>
  )
}

export default Home