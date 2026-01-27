
import Header from '../../components/header'
import ProductsShop from '../../components/products-shop'

const Shop = () => {
  return (
    <section>
        <Header/>
        <div className="w-[90%] mx-auto">
            <ProductsShop/>
        </div>
    </section>
  )
}

export default Shop