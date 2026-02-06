import Header from "../components/header"
import Product from "../components/product"
import Title from '../components/title'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import api from '../services/axios'
import type { Product as TypeProduct } from "../app/features/user/userSlice"

export default function Products() {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [cat, setCat] = useState("All");

  const categories = [
    "All", "casuals", "sports", "indoor", 
    "loafers", "boots", "sandels", "sneakers"
  ];

  async function fetchByCategory(cate:string) {
    try {
      const url = cate === 'All' ? '/products' : `/products?category=${cate}`;
      const { data } = await api.get<TypeProduct[]>(url);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchByCategory(cat);
  }, [cat]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 md:pt-32">
        <div className="sticky top-[58px] md:top-[60px] z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-4 md:px-12">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCat(item)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap active:scale-95 ${
                  cat === item 
                    ? "bg-black text-white border-black" 
                    : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-300"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8">
          <div className="mb-6">
            <Title title={cat === "All" ? "All Products" : `${cat}`} />
            <div className="h-px bg-gray-200 w-full mt-4"></div>
          </div>

          {/* Responsive Grid: 1 col on Mobile, 2 on Tablet, 4 on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {products && products.length > 0 ? (
              products.map((e, i) => (
                <div key={e._id || i} className="w-full max-w-[290px]">
                  <Product data={e} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 italic">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}