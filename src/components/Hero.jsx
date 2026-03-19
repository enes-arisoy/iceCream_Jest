import { FiMoreVertical } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const CATEGORY_ICONS = [
  { src: '/images/icon-1.svg', label: 'Kategori 1' },
  { src: '/images/icon-2.svg', label: 'Kategori 2' },
  { src: '/images/icon-3.svg', label: 'Kategori 3' },
  { src: '/images/icon-4.svg', label: 'Kategori 4' },
];

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 py-16 md:py-24 overflow-hidden border-b border-gray-700">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Sol: Başlık ve butonlar */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Karadutlu Dondurma
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Karadutlu Dondurma, doğanın en taze lezzetlerinden ilham alarak üretilen eşsiz bir tatlı deneyimi sunar. Özenle seçilmiş karadutlar, yoğun ve ferahlatıcı aromasıyla her lokmada doğal bir serinlik hissi yaratır.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#urunler"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition"
              >
                Sipariş Et
              </a>
              <a
                href="#rezervasyon"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-700 text-white font-medium rounded-lg hover:from-rose-600 hover:to-rose-800 transition shadow-md"
              >
                Rezervasyon
              </a>
            </div>
          </div>

          {/* Sağ: Müşteri yorumu, kategori, trendler */}
          <div className="space-y-6">
            {/* Müşteri yorumu kartı */}
            <div className="bg-white/90 backdrop-blur border border-white/10 rounded-xl shadow-lg p-4 md:p-5 relative text-gray-800">
              <button
                type="button"
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded"
                aria-label="Seçenekler"
              >
                <FiMoreVertical size={20} />
              </button>
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-rose-300 flex items-center justify-center text-rose-600 font-semibold text-lg shrink-0">
                  E
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Enes</p>
                  <div className="flex gap-0.5 text-amber-400 mt-0.5" aria-label="5 yıldız">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 pr-8">
                Karşı konulmaz dondurma lezzetlerimizle donmuş mutluluğun tadını çıkarın!
              </p>
            </div>

            {/* Kategori seçiniz */}
            <div>
              <h3 className="text-white font-medium mb-3">Kategori Seçiniz</h3>
              <div className="flex gap-3 flex-wrap">
                {CATEGORY_ICONS.map(({ src, label }, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-500 border border-gray-500 flex items-center justify-center p-2 hover:from-gray-500 hover:to-gray-600 transition"
                    title={label}
                    aria-label={label}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain" aria-hidden />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
