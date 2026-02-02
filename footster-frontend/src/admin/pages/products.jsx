import { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import api from '../../services/axios'

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState(false);
  const [preview, setPreview] = useState(false);
  let product = {}
  const inputElem = useRef({
    name: null,
    category: null,
    price: null,
    add: null
  })

  async function setData() {
    const { data } = await api.get('/admin/products/all');
    setProducts(data);
  }

  function addProduct(e) {
    e.preventDefault();
    if (inputElem.current.add.value === "Update Product") {
      api.put(`/admin/products/update`, {
        ...product,
        name: e.target[1].value,
        category: e.target[2].value,
        price: e.target[3].value,
        id: product._id
      })
      return;
    }

    api.post('/admin/products/add', {
      name: e.target[1].value,
      category: e.target[2].value,
      price: e.target[3].value,
      img
    }).then(() => setData());
  }

  function removeProduct(id) {
    api.put('/admin/products/remove', { id }).then(() => setData());
  }

  async function editProduct(id) {
    const { data } = await api.get(`/admin/products/${id}`);
    inputElem.current.name.value = data[0].name
    inputElem.current.category.value = data[0].category
    inputElem.current.price.value = data[0].price
    inputElem.current.add.value = "Update Product"
    product = data[0];
  }

  function searchProducts(s) {
    if (!s) return setData();
    const search = s.toLowerCase();
    const searched = products.filter((v) => v.name.toLowerCase().includes(search));
    setProducts(searched);
  }

  async function setupImage(e) {
    const file = e.target.files[0]
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const dataObj = new FormData();
    dataObj.append("file", file);
    dataObj.append("upload_preset", "footster");
    dataObj.append("cloud_name", "dcsmtagf7");

    const { data } = await api.post("https://api.cloudinary.com/v1_1/dcsmtagf7/image/upload", dataObj);
    setImg(data.secure_url);
  }

  useEffect(() => {
    setData();
  }, [])

  return (
    <>
      <SideBar />
      <div className="ml-[260px] p-8 min-h-screen bg-gray-50 font-sans text-gray-900">
        
        {/* Header Section */}
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
          
          {/* Add Product Form */}
          <form onSubmit={(e) => addProduct(e)} className="flex items-start justify-center gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            
            {/* Image Upload Area */}
            <label 
              htmlFor="imagefile" 
              className="flex flex-col items-center justify-center h-[190px] w-[200px] border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <input onChange={e => setupImage(e)} id="imagefile" type="file" className="hidden" />
              {
                preview 
                ? (<img className="h-[160px] object-contain" src={preview} alt="Preview" />) 
                : (<img className="h-[50px] opacity-40 grayscale" src="/icons/upload.png" alt="Upload" />)
              }
            </label>

            {/* Inputs Group */}
            <div className="flex flex-col gap-3 w-full max-w-sm">
              <input ref={e => inputElem.current.name = e} required type="text" placeholder="Products Name" 
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input ref={e => inputElem.current.category = e} required type="text" placeholder="Category" 
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input ref={e => inputElem.current.price = e} required type="number" placeholder="Price" 
                className="p-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors" />
              <input 
                ref={e => inputElem.current.add = e} 
                type="submit" 
                value='Add Product' 
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
                          onClick={() => editProduct(v._id)}
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