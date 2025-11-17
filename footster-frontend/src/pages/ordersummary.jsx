import { useEffect, useState,useRef } from 'react'
import '../styles/order.css'
import { Link, useNavigate } from 'react-router-dom';

export default function OrderSummary (){
  const [userObj,setUserObj] = useState(JSON.parse(localStorage.getItem('user')));
  const [confirm,setConfirm] = useState(false);
  const [price,setPrice] = useState({
    items : 0,
    handle : 0,
    tax :0,
    platform : 0,
    discount : 0,
    total : 0
  });
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
    setPrice(pre => {
      const newPrice = {...price}
      userObj.cart.forEach(v=>{
        newPrice.items += v.price ;
      });
      newPrice.tax = Math.round(newPrice.items * 0.1) ;
      newPrice.handle = 27;
      newPrice.platform = Number(userObj.cart.length * 2);
      const total = newPrice.items + newPrice.handle + newPrice.platform + newPrice.tax ;
      newPrice.total = Math.round(total/100) * 100 ;
      newPrice.discount = total - newPrice.total ;
      return newPrice;
    });

    if(userObj.address){
      Elems.current.name.value = userObj.address.name ;
      Elems.current.number.value = userObj.address.number ;
      Elems.current.pincode.value = userObj.address.pincode ;
      Elems.current.city.value = userObj.address.city ;
      Elems.current.adres.value = userObj.address.adres ;
      Elems.current.state.value = userObj.address.state ;
      Elems.current.country.value = userObj.address.country ;
    }
  },[]);

  function setAdress (e){
    e.preventDefault();
    const addrObj = {
      name : Elems.current.name.value,
      number : Number(Elems.current.number.value),
      pincode : Number(Elems.current.pincode.value),
      city : Elems.current.city.value,
      adres : Elems.current.adres.value,
      state : Elems.current.state.value,
      country : Elems.current.country.value,
      method : Elems.current.method.value,
      total : price.total 
    }
    setUserObj(pre =>{
      const userObj = {...pre , address : addrObj}
      return userObj ;
    })
  }

  function setOrder(){
    const dateCon = new Date()
    const orderObj= {
      orderId : Date.now(),
      date : dateCon.toLocaleString(),
      status : "Placed",
      type : Elems.current.method.value ,
      total : price.total,
      cart :[...userObj.cart],
      to : {
        name : Elems.current.name.value,
        number : Number(Elems.current.number.value),
        pincode : Number(Elems.current.pincode.value),
        adres : Elems.current.adres.value
      }
    }
    setUserObj(pre =>{
      const newUser = {...pre,cart:[],noti :[...pre.noti,{
        title : "Order Placed",
        dis : `Your order ${orderObj.orderId} is Placed successfully..`
      }] ,orders :[...pre.orders,orderObj]}
      return newUser
    })
    navigate('/confirm');
  }

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(userObj));
  },[userObj])


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
              userObj.cart.map((v,i)=>(
                <div key={i} className='order-summary-product'>
                  <div>
                    <img className='order-summary-img' src={v.img} alt="order-details" />
                  </div>
                  <div className='details'>
                    <div>Colors : {v.color}</div>
                    <div>Quantity : {v.quantity}</div>
                    <div>Price : {v.price}</div>
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
            <div>Items ({userObj.cart.length}) :</div>
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