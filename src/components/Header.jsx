import { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const DEFAULT_NAV_LINKS = [
  { id: 'anasayfa', label: 'Anasayfa', href: '#' },
  { id: 'hakkimizda', label: 'Hakkımızda', href: '#hakkimizda' },
  { id: 'yakindakiler', label: 'Yakındakiler', href: '#yakindakiler' },
];

const Header = ({ navLinks = DEFAULT_NAV_LINKS }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-700">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2" aria-label="Drop Cream Ana Sayfa">
          <img src="/images/logo.svg" alt="Drop Cream" className="h-8 w-auto" />
          <span className="font-semibold text-lg text-gray-100">Drop Cream</span>
        </a>
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Ana navigasyon"
        >
          {navLinks.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className="text-gray-300 hover:text-white transition"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800"
            aria-label="Ara"
          >
            <FiSearch size={20} />
          </button>
          <button
            type="button"
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 md:hidden"
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
      {/* Mobil menü */}
      {isMenuOpen && (
        <nav
          className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-700 py-4 px-4"
          aria-label="Mobil navigasyon"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ id, label, href }) => (
              <li key={id}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
export { DEFAULT_NAV_LINKS };
