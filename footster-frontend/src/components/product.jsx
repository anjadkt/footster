
import { useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useRef, useState } from 'react'
import '../styles/home.css' 
import axios from "axios"
import{toast,ToastContainer} from 'react-toastify'

export default function Product ({data}){
  // const [fav,setFav] = useState(()=>{
  //     const {favorite} = JSON.parse(localStorage.getItem('user')) || {favorite : []}
  //     const product = favorite.filter(d => d.id === data.id);
  //     return product[0]?.isFav || false
  //   });

  const [fav,setFav] = useState();

  useEffect(()=>{
    async function fetchFav() {
      try{
        const {data : favoriteData} = await axios.get('http://localhost:3001/wishlist/favorite',{withCredentials : true});
        setFav(favoriteData.favorite.includes(data._id));
      }catch(error){
        
      }
    }
    fetchFav();
  })
  
  const navigate = useNavigate();
  
  const Elem = useRef({
    select :null
  })
  //const [userObj,setUserObj] = useState(JSON.parse(localStorage.getItem('user')) || {login : false});

  async function addToCart() {
    try{
      const {data : userObj} = await axios.get('http://localhost:3001/user/details',{withCredentials : true});
      if (!userObj[0].login) {
        navigate('/login');
        return;
      }

      const qnt = Number(Elem.current.select.value);

      const {data : addCart} = await axios.post(`http://localhost:3001/cart`,{
        id : data._id,
        quantity : qnt || 1
      },{withCredentials : true});

      toast.success("Added to Cart");
      Elem.current.select.value = 1;
    }catch(error){
      if(error.status === 401)return navigate('/login')
      console.log(error.message);
    }

    //const updatedUser = JSON.parse(localStorage.getItem('user'));
    //const exist = updatedUser.cart.find(product => product.id === data.id);

    // if (exist) {
    //   exist.quantity += qnt;
    // } else {
    //   const newProduct = { ...data, quantity: qnt };
    //   updatedUser.cart.push(newProduct);
    // }

    
    //localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  async function setFavorite(){
    try{
      const {data : userObj} = await axios.get('http://localhost:3001/user/details',{withCredentials : true});

      if (!userObj[0].login) {
        navigate('/login');
        return;
      }

      const {data : wishlistUpdate} = await axios.post('http://localhost:3001/wishlist',{
        id : data._id
      },{withCredentials : true});

      toast.success(wishlistUpdate.favorite ? "Added to Wishlist": "Removed from Wishlist")

    }catch(error){
      if(error.status === 401)return navigate('/login');
    }
    
    // const updatedUser = JSON.parse(localStorage.getItem('user'));
    // let {favorite} = updatedUser ;

    // if(!fav){
    //   favorite.push({...data , isFav : true});
    // }else{
    //   favorite = favorite.filter(d => d.id !== data.id);
    // }
    // localStorage.setItem('user',JSON.stringify(
    //   {...updatedUser,favorite:[...favorite]}
    // ))
    // setFav(!fav)

  }
 

  if(!data){
    return <h3 className='no-product'>No product Found</h3>
  }
  return (
    <>
     <div className='product-div'>
      <div className='product-dis'>
        <div>
          <h4>{data.name.slice(0,14)+(data.name.length>14 ? "..." : "")}</h4 >
          <p>{data.category}</p>
        </div>
        <div onClick={()=>{setFav(!fav); setFavorite()}}>
          {
            fav ? <img src="/icons/favorite.png" alt="favorite" /> : <img src="/icons/favorite3.png" alt="favorite" /> 
          }
        </div>
        
      </div>
      <div onClick={()=>navigate(`/product/${data._id}`)} className='product-img-div'>
        <img className='product' src={data.img} alt="img" />
      </div>
      <div onClick={()=>navigate(`/product/${data._id}`)} className='product-rating-div'>
        <div>
          <img src={`./ratings/rating-${data.rating}.png`} alt="img" />
        </div>
        <p>{(data.rating/10).toFixed(1)}</p>
      </div>
      <div className='product-count-div'>
        <span>Quantity:</span>
        <select ref={e => Elem.current.select = e}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      <div className='product-price-div'>
       <button onClick={addToCart}>Add to Cart</button>
       <p><span>&#8377;</span>{data.price}</p>
      </div>
     </div>
    </>
  )
}