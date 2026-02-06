import { useEffect, useState } from "react";
import Header from "../components/header"
import OrderItems from "../components/orderItem";
import api from '../services/axios'
import type { Order } from "../admin/pages/eachUser";
import errorFunction from "../utils/errorFunction";
import Spinner from "../components/spinner";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    async function fetchOrders():Promise<void> {
      try {
        const { data: orderObj } = await api.get<{orders:Order[]}>('user/orders/all');
        setOrders(orderObj.orders);
      } catch (error) {
        console.log(errorFunction(error));
      }
    }
    fetchOrders();
  }, []);

  if(!orders) return <Spinner/>

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto pt-18 md:pt-26 pb-12 px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-8 text-gray-900">Your Orders</h2>
        
        <div className="space-y-8">
          {orders?.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <h1 className="text-xl text-gray-400 italic">No Orders Yet</h1>
            </div>
          ) : (
            orders?.map((v, i) => (
              <OrderItems key={v._id || i} orderDetails={v} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}