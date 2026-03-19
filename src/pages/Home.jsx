import { useDispatch, useSelector } from 'react-redux';
import { FaFire } from 'react-icons/fa';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import { openCart } from '../features/cart/cartSlice';

const Home = ({ onOrderSuccess }) => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="container mx-auto px-4 pt-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => dispatch(openCart())}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 text-white font-medium rounded-lg hover:from-rose-600 hover:to-rose-800 transition shadow-md"
            >
            Sepet
            <img src="/public/cart.png" alt="" className="w-6 h-6" aria-hidden />
            {itemCount > 0 && (
              <span className="bg-gray-800 text-rose-300 text-sm font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 text-white font-medium rounded-lg hover:from-rose-600 hover:to-rose-800 transition shadow-md cursor-default">
            
            <span>Trendler</span>
            <img src="/public/fire.png" alt="" className="w-6 h-6" aria-hidden />
          </div>
        </div>
        <ProductList />
      </main>
      <CartModal onOrderSuccess={onOrderSuccess} />
    </div>
  );
};

export default Home;
