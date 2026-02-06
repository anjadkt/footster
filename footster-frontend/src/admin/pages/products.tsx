import { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import api from '../../services/axios'
import errorFunction from "../../utils/errorFunction";
import axios from "axios";
import type { Product } from "../../app/features/user/userSlice";
import Spinner from "../../components/spinner";

type Form = {
  name : string;
  category : string;
  price : number;
  button :string;
  img : string ;
  id : string;
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [form,setForm] = useState<Form>({
    name : "",
    category : "",
    price : 0,
    button : "Add Product",
    img : "",
    id : ""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    if(e.target.name === "price"){
      return setForm(pre => ({...pre,price:Number(e.target.value)}));
    }
    setForm(pre => ({...pre , [e.target.name]:e.target.value}));
  }

  async function setData():Promise<void> {
    try{
      const { data } = await api.get<Product[]>('/admin/products/all');
      setProducts(data);
    }catch(error){
      console.log(errorFunction(error));
    }
  }

  async function addProduct(e : React.FormEvent<HTMLFormElement>):Promise<void> {
    e.preventDefault();
    try{
      if (form.button === "Update Product" && form.id) {
        await api.put(`/admin/products/update`,form);
        return;
      }
      await api.post('/admin/products/add',form)
      setData();
    }catch(error){
      console.log(errorFunction(error));
    }finally{
      setForm({name : "", category : "", price : 0, button : "Add Product",img:"",id:""});
      setData();
    }
  }

  async function removeProduct(id:string):Promise<void> {
    await api.put('/admin/products/remove', { id })
    setData();
  }

  function editProduct(product:Product) {
    setForm({
      name:product.name,
      category : product.category,
      button : "Update Product",
      price : product.price,
      img : product.img,
      id : product._id
    });
  }

  function searchProducts(s:string) {
    if (!s) return setData();
    const search = s.toLowerCase();
    const searched = products?.filter((v) => v.name.toLowerCase().includes(search)) ?? []
    setProducts(searched);
  }

  async function setupImage(e:React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0 || !files[0]) return;
    const file = files[0]
    
    const dataObj = new FormData();
    dataObj.append("file", file);
    dataObj.append("upload_preset", "footster");
    dataObj.append("cloud_name", "dcsmtagf7");

    try{
      setLoading(true);
      const { data } = await axios.post("https://api.cloudinary.com/v1_1/dcsmtagf7/image/upload", dataObj);
      setForm(pre => ({...pre , img : data.secure_url}));
    }catch(error){
      console.log(errorFunction(error));
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    setData();
  }, [])

  if(!products)return <Spinner/>
  return (
    <>
      <SideBar />
      <div className="ml-[260px] p-8 min-h-screen bg-gray-50 font-sans text-gray-900">
        
        <div className="flex justify-between items-center pr-[100px] mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
          <input 
            onChange={e => searchProducts(e.target.value)} 
            type="text" 
            placeholder="Search Products"
            className="w-[300px] px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
          />
        </div>

        <hr className="border-none h-[2px] bg-gray-200 mb-8" />

        <div className="flex flex-col gap-8">
          
          <form onSubmit={addProduct} className="flex items-start justify-center gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            
            {/* Image Upload Area */}
            <label 
              htmlFor="imagefile" 
              className="flex flex-col items-center justify-center h-[190px] w-[200px] border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <input onChange={setupImage} id="imagefile" type="file" className="hidden" />
              {
                loading ? "uploading..." :
                form.img 
                ? (<img className="h-[160px] object-contain" src={form.img} alt="Preview" />) 
                : (<img className="h-[50px] opacity-40 grayscale" src="/icons/upload.png" alt="Upload" />)
              }
            </label>

            <div className="flex flex-col gap-3 w-full max-w-sm">
              <input onChange={handleChange} required type="text" placeholder="Products Name" name="name" value={form.name}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input onChange={handleChange} required type="text" placeholder="Category" name="category" value={form.category}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input onChange={handleChange} required type="number" placeholder="Price" name="price" value={form.price}
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input 
                type="submit" 
                value={form.button} 
                className="bg-gray-900 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-black transition-all active:scale-95"
              />
            </div>
          </form>

          {/* Product Table */}
          <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200">
            <table className="w-full border-collapse bg-white text-left">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold text-center">Images</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {
                  products && products.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-500">{i + 1}</td>
                      <td className="p-4 w-[80px]">
                        <img src={v.img} alt="Product" className="h-10 mx-auto rounded object-cover" />
                      </td>
                      <td className="p-4 font-medium text-gray-900">{v.name}</td>
                      <td className="p-4 text-gray-900 font-semibold">₹{v.price}</td>
                      <td className="p-4 space-x-2">
                        <button 
                          onClick={() => removeProduct(v._id)}
                          className="bg-gray-100 text-red-600 border border-red-100 px-3 py-2 rounded-md font-semibold text-sm hover:bg-red-600 hover:text-white transition-all"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => editProduct(v)}
                          className="bg-gray-800 text-white px-3 py-2 rounded-md font-semibold text-sm hover:bg-black transition-all"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}