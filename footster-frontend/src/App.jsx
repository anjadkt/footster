import './styles/App.css'
import Login,{Register} from './pages/Login'
import { Route,Routes } from 'react-router-dom'
import{ToastContainer} from 'react-toastify'
import ProtectedRoute from './auth/routeProtect'
import PublicRoute from './auth/publicRoute'
import Home from './pages/home'
import Products from './pages/products'
import Blogs from './pages/blogs'
import Cart from './pages/cart'
import Wishlist from './pages/wishlist'
import OrderSummary from './pages/ordersummary'
import OrderSec from './pages/success'
import Orders from './pages/orders'
import Forgot from './components/forget'
import Dashboard from './admin/pages/dashboard'
import AllProducts from './admin/pages/products'
import Users from './admin/pages/users'
import EachUser from './admin/pages/eachUser'
import AdminOrders from './admin/pages/orders'
import Notification from './pages/notifications'
import EachProduct from './pages/eachProduct'
import Profile from './pages/profile'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path={'/signup'} element ={<Register/>}/>
      <Route path={'/login'} element ={<PublicRoute><Login/></PublicRoute>}/>
      <Route path={'/products'} element={<Products />} />
      <Route path={'/product/:id'} element={<EachProduct/>} />
      <Route path={'/blogs'} element={<Blogs />} />
      <Route path={'/cart'} element ={<ProtectedRoute><Cart/></ProtectedRoute>} />
      <Route path={'/wishlist'} element ={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
      <Route path={'/orderSummary'} element ={<ProtectedRoute><OrderSummary/></ProtectedRoute>} />
      <Route path={'/confirm'} element={<ProtectedRoute><OrderSec/></ProtectedRoute>} />
      <Route path={'/orders'} element ={<ProtectedRoute><Orders/></ProtectedRoute>} />
      <Route path={'/notifications'} element ={<ProtectedRoute><Notification/></ProtectedRoute>} />
       {/* <Route path={'/profile'} element ={<ProtectedRoute><Profile/></ProtectedRoute>} /> */}
      <Route path={'/forgot'} element = {<Forgot/>} />
      <Route path={'/dashboard'}  element ={<ProtectedRoute role="admin"><Dashboard/></ProtectedRoute>}/>
      <Route path={'/allproducts'} element ={<ProtectedRoute role="admin"><AllProducts/></ProtectedRoute>} />
      <Route path={'/users'} element ={<ProtectedRoute role="admin"><Users/></ProtectedRoute>} />
      <Route path={'/users/:id'} element ={<ProtectedRoute role="admin"><EachUser/></ProtectedRoute>} />
      <Route path={'/adminOrders'} element ={<ProtectedRoute role="admin"><AdminOrders/></ProtectedRoute>} />
    </Routes>
    <ToastContainer autoClose={1500} />
    
    </>
  )
}

export default App
