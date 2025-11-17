import '../styles/products.css'
import Header from "../components/header"
import { useFetch} from "../customHooks/customHooks"
import Product from "../components/product"
import Title from '../components/title'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products(){
  const [products,setProducts] = useState([]);
  const [cat,setCat] = useState("All");
  async function setCategory(cate){
    if(cate == 'All'){
      const {data} = await axios('https://footster-app.onrender.com/products');
      setProducts(data);
      return ;
    }
    const {data} = await axios(`https://footster-app.onrender.com/products?category=${cat}`);
    setProducts(data)
  }
  useEffect(()=>{
    setCategory(cat);
  },[cat])
  return(
    <>
     <Header />
     <main>
      <div className='category-selectors'>
        <button onClick={()=>setCat("All")}>All</button>
        <button onClick={()=>setCat("casuals")}>casuals</button>
        <button onClick={()=>setCat("sports")}>sports</button>
        <button onClick={()=>setCat("indoor")}>indoor</button>
        <button onClick={()=>setCat("loafers")}>loafers</button>
        <button onClick={()=>setCat("boots")}>boots</button>
        <button onClick={()=>setCat("sandels")}>sandels</button>
        <button onClick={()=>setCat("sneakers")}>sneakers</button>
      </div>
      <div className='all-div'>
        <Title title={cat=="All" ? "All Products" : `${cat}`}/>
        <hr />
        <div className="all-products-container-div">
          { products &&
          products.map((e,i)=>(
            <Product key={i} data={e} />
          ))
          }
        </div>
      </div>
     </main>
    </>
  )
}