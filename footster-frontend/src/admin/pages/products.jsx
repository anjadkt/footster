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
    category : null,
    price : null,
    add : null

  })

  async function setData(){
    const {data} = await axios.get('http://localhost:3001/admin/products/all',{withCredentials : true});
    setProducts(data);
  }

  function addProduct(e){
    if(inputElem.current.add.value == "Update Product"){
      axios.put(`http://localhost:3001/admin/products/update`,{
        ...product,
        name: e.target[1].value ,
        category: e.target[2].value,
        price: e.target[3].value,
        id : product._id
      },{withCredentials : true})
      return;
    }
    //const {lastId} = products.pop();
    axios.post('http://localhost:3001/admin/products/add',{
      // id: lastId+1,
      // isFav: false,
      // quantity: 1,
      // rating: 0,
      name: e.target[1].value ,
      category: e.target[2].value,
      price: e.target[3].value,
      img
    },{withCredentials : true})
    setData();
  }

  function removeProduct(id){
    axios.put('http://localhost:3001/admin/products/remove',{id},{withCredentials : true});
    setData();
  }

  async function editProduct(id){
    const {data} = await axios.get(`http://localhost:3001/admin/products/${id}`,{withCredentials : true});
    console.log(data[0]);
    inputElem.current.name.value = data[0].name
    inputElem.current.category.value = data[0].category
    inputElem.current.price.value = data[0].price
    inputElem.current.add.value = "Update Product"
    product = data[0];
  }

  function searchProducts (s){
  if(!s)return setData();
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
          <input ref={e => inputElem.current.category = e} required type="text" placeholder="category" />
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
                <td>{i+1}</td>
                <td className="img" ><img  src={v.img} alt="None"  /></td>
                <td>{v.name}</td>
                <td>{v.price}</td>
                <td>
                  <button onClick={()=>removeProduct(v._id)}>Remove</button>
                  <button onClick={()=>editProduct(v._id)}>Edit</button>
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