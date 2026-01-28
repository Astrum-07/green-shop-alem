
import Header from '../../components/header'
import ProductShop from '../../components/product-shop'


const Shop = () => {
  return (
    <section>
        <Header/>
        <div className="w-[90%] mx-auto">
            <ProductShop/>
        </div>
    </section>
  )
}

export default Shop