import '../styles/home.css'
import { useFetch } from '../customHooks/customHooks'
import Product from '../components/product';
import Header from '../components/header';
import Title from '../components/title';
import { useEffect, useState } from 'react';

export default function Home (){
  const [products] = useFetch(' https://footster-app.onrender.com/products?_page=1&_limit=24');
  useEffect(()=>{
    document.title = "Footster"
  },[])
  
  return(
    <>
     <Header />

     <main>

      <div className='home-overview-contianer'>
        <div className='main-slogan'>
          Express <span>&ndash;</span> yourself <br />through style<span>.</span>
        </div>
        <div>
          <img className='main-image' src="./main-background.png" alt="" />
        </div>
      </div>

      <div className='popular-product-container'>
        <Title title={"Popular products"}/>
        <hr />
        <div className='popular-product-div'>
         { products &&
           products.map((product)=>(
            <Product key={product.id} data={product} />
           ))
         }
        </div>
      </div>

      <hr />

     </main>
    </>
  )
}