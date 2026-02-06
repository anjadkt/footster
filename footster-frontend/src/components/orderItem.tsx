import type { Order } from "../admin/pages/eachUser";

export default function OrderItems({ orderDetails }:{orderDetails:Order}) {

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const deliveryString = deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Order Header - Responsive Grid */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
        <div>
          <span className="uppercase text-gray-400 font-bold block mb-1">Order Placed</span>
          <p className="font-semibold text-gray-700">{orderDetails.date}</p>
        </div>
        <div>
          <span className="uppercase text-gray-400 font-bold block mb-1">Total Paid</span>
          <p className="font-semibold text-gray-700">₹{orderDetails.paymentDetails?.total}</p>
        </div>
        <div className="hidden md:block">
          <span className="uppercase text-gray-400 font-bold block mb-1">Order ID</span>
          <p className="font-mono text-gray-500 text-[10px]">{orderDetails._id}</p>
        </div>
        <div className="text-right md:text-left">
          <span className="uppercase text-gray-400 font-bold block mb-1">Status</span>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-[10px] uppercase">
            {orderDetails.status}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 md:p-8 space-y-6">
        {orderDetails.items.map((v, i) => (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 last:pb-0 border-b last:border-0" key={i}>
            
            <div className="flex gap-4 md:gap-6">
              <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 bg-gray-100 rounded-xl p-2 flex items-center justify-center">
                <img className="max-h-full object-contain" src={v.img} alt={v.name} />
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-gray-800 text-lg mb-1 leading-tight">{v.name}</h4>
                <p className="text-sm text-gray-500 font-medium">Qty: {v.quantity}</p>
                <div className="mt-2 text-sm md:text-base font-bold text-blue-600">
                  Arriving by {deliveryString}
                </div>
                <button className="mt-3 text-sm font-bold bg-yellow-400 hover:bg-black hover:text-white px-4 py-1.5 rounded-lg border border-black transition-all w-fit">
                  Buy it Again
                </button>
              </div>
            </div>

            <div className="shrink-0">
              <button className="w-full md:w-auto px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
                Track package
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}