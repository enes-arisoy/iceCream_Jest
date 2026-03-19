import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import Home from './pages/Home';

const App = () => {
  const handleOrderSuccess = () => {
    toast.success('Siparişiniz alındı. Teşekkür ederiz!');
  };

  return (
    <Provider store={store}>
      <Home onOrderSuccess={handleOrderSuccess} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
};

export default App;
