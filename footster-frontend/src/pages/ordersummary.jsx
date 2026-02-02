import { useEffect, useState,useRef } from 'react'
import '../styles/order.css'
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/axios'

export default function OrderSummary (){

  const [cart,setCart] = useState([]);
  const [confirm,setConfirm] = useState(false);
  const [price,setPrice] = useState({
    items : 0,
    handle : 0,
    tax :0,
    platform : 0,
    discount : 0,
    total : 0
  });
  const [address , setAddress] = useState(null);

  const navigate = useNavigate();

  const Elems = useRef({
    name : null,
    number : null,
    pincode : null,
    city : null,
    adres :  null,
    state : null,
    country : null,
    method : null,
  })

  useEffect(()=>{
    async function fetchCart() {
      try{
        const {data : cartObj} = await api.get("/cart");
        setCart(cartObj.cart);

        const {data} = await api.get("/address");

        if(data.address.name){
          Elems.current.name.value = data.address.name ;
          Elems.current.number.value = data.address.number ;
          Elems.current.pincode.value = data.address.pincode ;
          Elems.current.city.value = data.address.city ;
          Elems.current.adres.value = data.address.adres ;
          Elems.current.state.value = data.address.state ;
          Elems.current.country.value = data.address.country ;
        }
        setAddress(data.address)

      }catch(error){
        console.log(error.message);
      }
    }
    fetchCart();

  },[]);

  useEffect(() => {
  setPrice(() => {
    let items = 0;

    cart.forEach(v => {
      items += v.product.price * v.quantity;
    });

    const tax = Math.round(items * 0.1);
    const handle = 27;
    const platform = cart.length * 2;
    
    const rawTotal = items + tax + handle + platform;
    const total = Math.round(rawTotal / 100) * 100;
    const discount = total - rawTotal;

    return {
      items,
      tax,
      handle,
      platform,
      discount,
      total
    };
  });
}, [cart]);

  async function setAdress (e){
    e.preventDefault();

    try{
      const addrObj = {
        name : Elems.current.name.value,
        number : Number(Elems.current.number.value),
        pincode : Number(Elems.current.pincode.value),
        city : Elems.current.city.value,
        adres : Elems.current.adres.value,
        state : Elems.current.state.value,
        country : Elems.current.country.value
      }
      await api.post('/address',addrObj);

    }catch(error){
      console.log(error.message);
    }
   }

  async function setOrder(){
    const newCart = []
    for(let v of cart){
      newCart.push({
        ...v.product,
        quantity : v.quantity
      });
    }
    const orderObj= {
      paymentDetails : {
        paymentType : Elems.current.method.value ,
        total : price.total
      },
      items :newCart,
      to : {
        name : Elems.current.name.value,
        number : Number(Elems.current.number.value),
        pincode : Number(Elems.current.pincode.value),
        city : Elems.current.city.value,
        adres : Elems.current.adres.value,
        state : Elems.current.state.value,
        country : Elems.current.country.value
      }
    }
    try{
     const {data} = await api.post("/user/orders",orderObj);
      navigate(`/confirm/${data.orderId}`);

    }catch(error){
      console.log(error.message);
    }
  }


  return (
    <>
      <header className='header-div'>
        <div className="logo-div">
          <Link className='nav-links' to='/cart'><h1>FootSter.<span className='cart-h1'>cart</span></h1></Link>
        </div>
        <div className='cart-item'>
          <h2>Order Summary</h2>
        </div>
        <div>
          <input className='cart-search-bar' type="text" placeholder='Search for products..' />
          <img className='cart-search-icon' src="./icons/search.png" alt="search for products.." />
        </div>
      </header>
      <div className='order-summary-all-container'>
        <div>
          <div className='order-summary-product-div'>
            {
              cart.map((v,i)=>(
                <div key={i} className='order-summary-product'>
                  <div>
                    <img className='order-summary-img' src={v.product.img} alt="order-details" />
                  </div>
                  <div className='details'>
                    <div>Category : {v.product.category}</div>
                    <div>Quantity : {v.quantity}</div>
                    <div>Price : {v.product.price}</div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='order-address-details'>
            <h2>Delivery Address</h2>
            <form onSubmit={(e)=>{setAdress(e); setConfirm(!confirm)}} className='address-form'>
              <div>
                <input ref={e=>Elems.current.name = e} required type="text" placeholder='Name' />
                <input ref={e=>Elems.current.number = e} required type="number" placeholder='Number'/>
              </div>
              <div>
                <input ref={e=>Elems.current.pincode = e} required  type="number" placeholder='Pincode' />
                <input ref={e=>Elems.current.city = e} required type="text" placeholder='City/District/Town' />
              </div>
              <div>
                <textarea ref={e=>Elems.current.adres = e} required placeholder='Address (area and street)'></textarea>
              </div>
              <div>
                <input ref={e=>Elems.current.state = e} required type="text" placeholder='State'/>
                <input ref={e=>Elems.current.country = e} required type="text" placeholder='Country'/>
              </div>
              <div>
                <input type="text" placeholder='Land Mark (optional)' />
                <select ref={e=>Elems.current.method = e}>
                  <option>COD</option>
                  <option>UPI</option>
                  <option>CREDIT CARD</option>
                  <option>DEBIT CARD</option>
                </select>
              </div>
              <input className='set-address' type="submit" value='SAVE & DELIVER HERE' />
            </form>
          </div>
        </div>
        <div className='cart-order-summary'>
          <h3>TOTAL PRICE</h3>
          <div>
            <div>Items ({cart.length}) :</div>
            <div>&#8377;{price.items}</div>
          </div>
           <div>
            <div>Tax (10%) :</div>
            <div>&#8377;{price.tax}</div>
          </div>
          <div>
            <div>Handling :</div>
            <div>&#8377;{price.handle}</div>
          </div>
          <div>
            <div>Platform fee :</div>
            <div>&#8377;{price.platform}</div>
          </div>
          <div>
            <div>Discount :</div>
            <div>&#8377;{price.discount}</div>
          </div>
          <hr />
          <div>
            <h4>Total Payable :</h4>
            <h4>&#8377;{price.total}</h4>
          </div>
        </div>
      </div>
      <div style={{display : confirm ? "block" : "none"}} className='confirm-your-order'>
        <div className='confirm-message-div'>
          <h2>Confirm Your Order</h2>
          <img className='confirm-message-img' src="./confirm-order.png" alt="confirm your order" />
          <p>Please review your details<br />before confirming.</p>
          <hr />
          <div>
            <button onClick={()=>setConfirm(!confirm)} className='cancel'>Cancel</button>
            <button onClick={setOrder} className='confirm'>Confirm</button>
          </div>
        </div>
      </div>
    </>
  )
}