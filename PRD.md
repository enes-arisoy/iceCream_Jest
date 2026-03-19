## 📄 PRD.md - CoolCream Dondurma Uygulaması

### 🧁 Proje Adı

**Drop Cream - Dondurma Satış Uygulaması**

---

### 🎯 Amaç

Kullanıcıların çeşitli dondurmaları bardak veya külah seçeneğiyle sepete ekleyip, kolayca sipariş verebileceği, modern ve kullanıcı dostu bir tek sayfa web uygulaması oluşturmak.

---

### ⚙️ Teknoloji Yığını

- **ReactJS (Vite)**
- **TailwindCSS**
- **Redux Toolkit**
- **Axios**
- **json-server (Fake API)**
- **React Icons**
- **Vitest + React Testing Library** (Unit Test için)

---

### 🧱 Uygulama Bileşenleri

#### 1. **Header**

- Sol tarafta "Drop Cream" logosu
- Ortada navigasyon linkleri: "Anasayfa", "Hakkımızda", "Yakındakiler"
- Sağda: Arama ikonu ve hamburger menü ikonu

#### 2. **Hero Bölümü**

- "Karadutlu Dondurma" başlığı ve tanıtım metni
- İki adet buton: "Sipariş Et" ve "Rezervasyon"

#### 3. **Ürün Listeleme**

- Kategori seçimi için ikonlar
- JSON verisinden gelen dondurma ürünleri card olarak listelenir
- Her kartta:
  - Ürün adı
  - Ürün görseli
  - Fiyat (`₺{fiyat} / top`)
  - "Külah" ve "Bardakta" butonları (tıklanınca sepete ekler)

#### 4. **Sepet (Ayrı Buton & Modal)**

- Hero bölümünün altında "Sepet" butonu bulunur ve tıklandığında modal açılır.
- Modal'da:
  - "Sipariş" başlığı ve kapatma (x) butonu
  - Sepete eklenen ürünler listelenir
  - Her ürün: fotoğraf, ad, format (külah/bardak), adet, toplam fiyat
  - Adet arttırma / azaltma butonları
  - Ürün çıkarma butonu
  - Sepet özeti:
    - Ara Toplam
    - Kargo (`20₺` sabit)
    - Toplam
  - "Sipariş Ver" butonu

---

### 🧠 Veri Yapısı

#### 📁 JSON Server (`db.json`)

```json
{
  "products": [
    {
      "id": 1,
      "name": "Bal Badem",
      "price": 25,
      "image": "/images/bal-badem.png"
    },
    {
      "id": 2,
      "name": "Çikolata Fırtınası",
      "price": 20,
      "image": "/images/cikolata-firtinasi.png"
    },
    {
      "id": 3,
      "name": "Mango Serinliği",
      "price": 28,
      "image": "/images/mango-serinligi.png"
    },
    {
      "id": 4,
      "name": "Vanilya Düşleri",
      "price": 22.5,
      "image": "/images/vanilya-dusleri.png"
    },
    {
      "id": 5,
      "name": "Karamel Dalgalanması",
      "price": 32,
      "image": "/images/karamel-dalgalanmasi.png"
    },
    {
      "id": 6,
      "name": "Fıstık Rüyası",
      "price": 34,
      "image": "/images/fistik-ruyasi.png"
    }
  ]
}
```

#### 🛒 Redux Sepet State

```js
cart = {
  items: [
    {
      id: "1-külah", // Benzersiz ID için ürün id ve format birleşimi
      productId: 1,
      name: "Bal Badem",
      price: 25,
      image: "/images/bal-badem.png",
      format: "külah",
      quantity: 1,
    },
  ],
  isCartOpen: false,
};
```

---

### 🔄 Kullanıcı Akışı

1.  Kullanıcı siteye gelir → hero ve ürünler görünür
2.  Kullanıcı bir ürünün "Külah" veya "Bardakta" butonuna tıklar
3.  Ürün sepete eklenir. Aynı ürün aynı formatla tekrar eklenirse adedi artar.
4.  Kullanıcı "Sepet" butonuna tıklar → Sepet modal'ı açılır.
5.  Sepette:
    - Ürün miktarını arttırır/azaltır
    - Ürünü çıkarabilir
    - Toplam tutarı (kargo dahil) görebilir
6.  "Sipariş Ver" butonuna basınca:
    - Sepet temizlenir
    - Modal kapanır
    - Siparişin başarılı olduğuna dair bir bildirim gösterilir.

---

### 🧪 Test Senaryoları

- [ ] Ürünler `json-server` üzerinden doğru çekiliyor mu?
- [ ] "Külah" veya "Bardakta" butonuna basınca ürün doğru formatla sepete ekleniyor mu?
- [ ] Aynı ürün aynı formatla eklendiğinde miktar artıyor mu?
- [ ] Aynı ürün farklı formatla eklendiğinde sepete ayrı bir kalem olarak ekleniyor mu?
- [ ] Sepet modal'ı doğru açılıp kapanıyor mu?
- [ ] Ürün miktarı arttırılıp azaltılabiliyor mu?
- [ ] Sepetten ürün çıkarılabiliyor mu?
- [ ] Kargo ücreti toplama doğru ekleniyor mu?
- [ ] "Sipariş Ver" sonrası sepet temizleniyor mu?
- [ ] Başarılı sipariş bildirimi gösteriliyor mu?

---

### 🪄 UI/UX Detayları

- Mobil ve masaüstü uyumluluğu (responsive)
- Sepet modal açıldığında arka plan karartılmalı
- Sepet boşken "Sepetiniz boş" mesajı gösterilmeli
- Başarılı sipariş sonrası toast mesajı (`react-toastify` veya benzeri)

---

### 🗂️ Klasör Yapısı Önerisi

```
src/
├── assets/
│   └── images/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── CartModal.jsx
├── features/
│   ├── cart/
│   │   ├── cartSlice.js
│   │   └── Cart.jsx
│   └── products/
│       ├── productsSlice.js
│       └── ProductsList.jsx
├── app/
│   └── store.js
├── pages/
│   └── Home.jsx
├── App.jsx
└── main.jsx
```

---

### 🚀 Geliştirme Sonrası

- Kodlar ESLint + Prettier ile formatlanmalı
- Proje GitHub'a yüklenecekse `README.md` oluşturulmalı
