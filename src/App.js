import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Policy from './pages/policy/Policy';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './component/routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './component/routes/AdminRoute';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProducts from './pages/admin/CreateProducts';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/admin/Product';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/search/Search';
import ProductDetails from './pages/productDetails/ProductDetails';
import Categories from './pages/categories/Categories';
import CategoryProduct from './pages/categoryProduct/CategoryProduct';
import Cart from './pages/cart/Cart';
import AdminOrders from './pages/admin/AdminOrders';
import TransReport from './pages/admin/TransReport';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/search' element={<Search />} />
        <Route path='/dashboard' element={<PrivateRoute/>} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/myProfile' element={<AdminProfile />} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProducts />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Product />} />
          <Route path='admin/orders' element={<AdminOrders />} />
          <Route path='admin/transactions' element={<TransReport />} />
          <Route path='admin/users' element={<Users/>} />
        </Route>
        
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={ <About/>} />
        <Route path='/contact' element={ <Contact/>} />
        <Route path='/policy' element={ <Policy/>} />
        <Route path='*' element={ <PageNotFound/>} />
      </Routes>
    </>
  );
}

export default App;
