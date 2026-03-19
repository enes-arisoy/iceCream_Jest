import { useDispatch, useSelector } from 'react-redux';
import { FiX } from 'react-icons/fi';
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';
import { getImageSrc } from '../utils/imageUrl';

const SHIPPING = 20;

const CartModal = ({ onOrderSuccess }) => {
  const dispatch = useDispatch();
  const { items, isCartOpen } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING;

  const handleClose = () => dispatch(closeCart());
  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleQuantity = (id, delta) => dispatch(updateQuantity({ id, delta }));

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    handleClose();
    if (typeof onOrderSuccess === 'function') onOrderSuccess();
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        role="button"
        tabIndex={0}
        aria-label="Sepeti kapat"
      />
      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-800 shadow-xl border-l border-gray-700 z-50 flex flex-col"
        role="dialog"
        aria-labelledby="cart-title"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="cart-title" className="text-xl font-semibold text-white">
            Sipariş
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
            aria-label="Kapat"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Sepetiniz boş</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                  data-testid="cart-item"
                >
                  <img
                    src={getImageSrc(item.image)}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded bg-gray-600"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-100 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-400 capitalize">
                      {item.format}
                    </p>
                    <p className="text-rose-400 font-medium">
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuantity(item.id, -1)}
                      className="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 text-gray-200 font-medium"
                      aria-label="Azalt"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium text-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantity(item.id, 1)}
                      className="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 text-gray-200 font-medium"
                      aria-label="Artır"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="text-rose-400 hover:text-rose-300 text-sm"
                    aria-label="Ürünü çıkar"
                  >
                    Çıkar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Ara Toplam</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Kargo</span>
              <span>₺{SHIPPING.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-white pt-2">
              <span>Toplam</span>
              <span>₺{total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition mt-4"
            >
              Sipariş Ver
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
