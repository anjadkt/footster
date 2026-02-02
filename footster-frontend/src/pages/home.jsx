import { useFetch } from '../customHooks/customHooks'
import Product from '../components/product';
import Header from '../components/header';
import Title from '../components/title';
import { useEffect } from 'react';
import Footer from '../components/footer';

export default function Home() {
  const [products] = useFetch('/products?_page=1&_limit=24');

  useEffect(() => {
    document.title = "Footster";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="text-center mt-[100px] px-4 overflow-hidden">
          <div className="text-[32px] md:text-[80px] font-medium leading-tight md:leading-normal" 
               style={{ fontFamily: 'Zalando Sans Expanded, sans-serif' }}>
            Express <span className="text-[#FAC23C]">&ndash;</span> yourself <br />
            through style<span className="text-[#FAC23C]">.</span>
          </div>
          <div className="flex justify-center">
            <img 
              className="h-[180px] md:h-[450px] relative top-[-20px] md:top-[-50px] z-0 object-contain pointer-events-none" 
              src="./main-background.png" 
              alt="Hero Sneaker" 
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="px-4 md:px-[60px] py-5">
          <Title title={"Popular products"} />
          <hr className="border-gray-200" />
          
          {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
            {products &&
              products.map((product) => (
                <div key={product.id} className="w-full max-w-[290px]">
                   <Product data={product} />
                </div>
              ))
            }
          </div>
        </div>

        <hr className="border-gray-200 mt-10" />
      </main>

      <Footer />
    </div>
  )
}