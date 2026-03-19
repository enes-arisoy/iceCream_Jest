import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { getImageSrc } from '../utils/imageUrl';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const { id, name, price, image } = product;
  const imageSrc = getImageSrc(image);

  useEffect(() => {
    if (selectedFormat == null) return;
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setSelectedFormat(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedFormat]);

  const handleAddToCart = () => {
    if (!selectedFormat) return;
    dispatch(addToCart({ productId: id, name, price, image, format: selectedFormat }));
    setSelectedFormat(null);
  };

  return (
    <article
      ref={cardRef}
      className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition flex flex-col"
      data-testid="product-card"
    >
      <div className="aspect-square p-4 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600">
        <img
          src={imageSrc}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="font-semibold text-gray-100 text-lg">{name}</h3>
          <p className="text-rose-200 font-semibold shrink-0">
            ₺{Number(price).toFixed(2)} / top
          </p>
        </div>
        <div className="flex gap-2 mt-auto min-h-10">
          {selectedFormat == null ? (
            <>
              <button
                type="button"
                onClick={() => setSelectedFormat('külah')}
                className="flex-1 py-2 px-3 text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-700 text-white rounded-lg hover:from-amber-600 hover:to-amber-800 transition"
              >
                Külah
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('bardak')}
                className="flex-1 py-2 px-3 text-sm font-medium bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-lg hover:from-rose-600 hover:to-rose-800 transition"
              >
                Bardakta
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2 px-3 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Sepete Ekle
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
