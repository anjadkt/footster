import "../styles/ordersDet.css"
export default function OrderItems ({orderDetails}){
  const today = new Date();
  const onlyDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  onlyDate.setDate(onlyDate.getDate() + 7);

  const deliveryDate = onlyDate.toISOString().split("T")[0];

  
  return (
    <>
     <div className="ordered-details-container">
       <div className="ordered-discription-div">
        <div><span>Order Placed : <br/> </span>{orderDetails.date}</div>
        <div><span>Total Paid : <br/></span> {orderDetails.total}</div>
        <div><span>Order ID : <br /> </span>{orderDetails.orderId}</div>
        <div><span>status : <br /> </span><div className='order-stats'>{orderDetails.status}</div></div>
       </div>
       <div className="ordered-items-div">
        {
          orderDetails.cart.map((v,i)=>(
            <div className="ordered-items-container" key={i}>
              <div>
                <div className="ordered-item-img">
                  <img  src={v.img} alt="" />
                </div>
                <div className="ordered-item-details">
                  <h4>{v.name}</h4>
                  <p>Quantity : {v.quantity}</p>
                  <div>Arriving : {deliveryDate}</div>
                  <button>Buy it Again</button>
                </div>
              </div>
              <div>
                <button className="track-package">Track package</button>
              </div>            
            </div>
          ))
        }
       </div>
     </div>
    </>
  )
}