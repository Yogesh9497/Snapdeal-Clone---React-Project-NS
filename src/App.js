import './App.css';
import { useSelector } from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Home from './Home';
import NotFound from './NotFound';
import Navigate from './components/Navigate';
import Cart from './Cart';
import PaymentPage from './PaymentPage';
import SingleProductPage from './SingleProductPage';
import SnapdealNavbar from './components/SnapdealNavbar';
function App() {
  const {isLoggedIn} = useSelector((state)=> state.snapdeal_authorised)
  return (
      <BrowserRouter>
        {
          isLoggedIn ?
          <>
            <SnapdealNavbar />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<PaymentPage />}/>
              <Route path="/products/:productId" element={<SingleProductPage />} />
              <Route path='*' element={<NotFound />}/>
            </Routes>
          </>
          :
          <>
            <Routes>
              <Route exact path='/login' element={<Login />}/>
              <Route path='*' element={<Navigate location={'/login'} />} />
            </Routes>
          </>
        }
      </BrowserRouter>
  )
}

export default App;
