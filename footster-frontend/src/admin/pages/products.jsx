import { useEffect, useRef, useState } from "react";
import SideBar from "../components/sidebar";
import '../styles/products.css'
import axios from "axios";

export default function AllProducts (){
  
  const [products,setProducts] = useState([]);
  const [img,setImg] = useState(false);
  const [preview,setPreview] = useState(false);
  let product = {}
  const inputElem = useRef({
    name : null,
    color : null,
    price : null,
    add : null

  })

  async function setData(){
    const {data} = await axios.get(' https://footster-app.onrender.com/products');
    setProducts(data);
  }

  function addProduct(e){
    if(inputElem.current.add.value == "Update Product"){
      axios.put(`https://footster-app.onrender.com/products/${product.id}`,{
        ...product,
        name: e.target[1].value ,
        color: e.target[2].value,
        price: e.target[3].value
      })
      return;
    }
    const {lastId} = products.pop();
    axios.post('https://footster-app.onrender.com/products',{
      id: lastId+1,
      isFav: false,
      quantity: 1,
      rating: 0,
      name: e.target[1].value ,
      color: e.target[2].value,
      price: e.target[3].value,
      img
    })
    setData();
  }

  function removeProduct(id){
    axios.delete(`https://footster-app.onrender.com/products/${id}`);
    setData();
  }

  async function editProduct(id){
    const {data} = await axios.get(`https://footster-app.onrender.com/products/${id}`);
    inputElem.current.name.value = data.name
    inputElem.current.color.value = data.color
    inputElem.current.price.value = data.price
    inputElem.current.add.value = "Update Product"
    product = data;
  }

  function searchProducts (s){
   const search = s.toLowerCase();
   const searched = products.filter((v)=> {
    const n = v.name.toLowerCase();
    return n.includes(search);
   } );
   setProducts(searched);
  }

  async function setupImage(e){
    const file = e.target.files[0]
    if(!file) return ;
    setPreview(URL.createObjectURL(file));
    const dataObj = new FormData();
    dataObj.append("file",file);
    dataObj.append("upload_preset", "footster");
    dataObj.append("cloud_name", "dcsmtagf7");

    const {data} = await axios.post("https://api.cloudinary.com/v1_1/dcsmtagf7/image/upload",dataObj);
    setImg(data.secure_url);
  }

  useEffect(()=>{
    setData();
  },[])
  
  return (
    <>
     <SideBar/> 
     <div className="admin-allproducts-container">
      <div className="header-admin-panel">
        <h1>Manage Products</h1>
        <input onChange={e => searchProducts(e.target.value)} type="text" placeholder="Search Products"/>
      </div>
      <hr />
     <div className="form-table-admin-div">
      <form onSubmit={(e)=>addProduct(e)} className="admin-addproduct-form">       
        <label className="imagefile" htmlFor="imagefile">
          <input onChange={e=>setupImage(e)} id="imagefile" type="file" />
          {
            preview ? (<img className="preview-img" src={preview} />) : (<img className="upload-img" src="/icons/upload.png" alt="" />)
          }
          
        </label> 
        <label className="inputsss">
          <input ref={e => inputElem.current.name = e} required type="text" placeholder="Products Name" />
          <input ref={e => inputElem.current.color = e} required type="number" placeholder="Colors" />
          <input ref={e => inputElem.current.price = e} required type="number" placeholder="Price" />
          <input ref={e=> inputElem.current.add = e} type="submit" value='Add Product' />
        </label>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Images</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((v,i)=>(
              <tr key={i}>
                <td>{v.id}</td>
                <td className="img" ><img  src={v.img} alt="None"  /></td>
                <td>{v.name}</td>
                <td>{v.price}</td>
                <td>
                  <button onClick={()=>removeProduct(v.id)}>Remove</button>
                  <button onClick={()=>editProduct(v.id)}>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
     </div>
     </div>
    </>
  )
}