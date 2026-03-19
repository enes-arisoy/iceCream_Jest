import { render, screen, fireEvent } from "@testing-library/react";
import CartModal from "./../components/CartModal";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./../features/cart/cartSlice", () => ({
  closeCart: jest.fn(() => ({ type: "closeCart" })),
  removeFromCart: jest.fn((id) => ({ type: "removeFromCart", payload: id })),
  updateQuantity: jest.fn((payload) => ({
    type: "updateQuantity",
    payload,
  })),
  clearCart: jest.fn(() => ({ type: "clearCart" })),
}));

describe("CartModal", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  test("cart kapalıysa hiçbir şey render edilmez", () => {
    useSelector.mockReturnValue({
      items: [],
      isCartOpen: false,
    });

    const { container } = render(<CartModal />);

    expect(container.firstChild).toBeNull();
  });

  test("sepet boşsa mesaj görünür", () => {
    useSelector.mockReturnValue({
      items: [],
      isCartOpen: true,
    });

    render(<CartModal />);

    expect(screen.getByText("Sepetiniz boş")).toBeInTheDocument();
  });

  test("ürünler listelenir", () => {
    useSelector.mockReturnValue({
      isCartOpen: true,
      items: [
        {
          id: 1,
          name: "Vanilyalı",
          price: 50,
          quantity: 3,
          format: "külah",
          image: "a.png",
        },
      ],
    });

    render(<CartModal />);

    expect(screen.getByText("Vanilyalı")).toBeInTheDocument();
    expect(screen.getByText("külah")).toBeInTheDocument();
    expect(screen.getByText("₺170.00")).toBeInTheDocument();
  });

  test("toplam fiyat doğru hesaplanır", () => {
    useSelector.mockReturnValue({
      isCartOpen: true,
      items: [{ id: 1, name: "A", price: 50, quantity: 2, format: "külah" }],
    });

    render(<CartModal />);

    // Ara toplam
    const subtotalRow = screen.getByText("Ara Toplam").closest("div");
    expect(subtotalRow).toHaveTextContent("₺100.00");

    // Kargo
    const shippingRow = screen.getByText("Kargo").closest("div");
    expect(shippingRow).toHaveTextContent("₺20.00");

    // Toplam
    const totalRow = screen.getByText("Toplam").closest("div");
    expect(totalRow).toHaveTextContent("₺120.00");
  });

  test("ürün silme dispatch edilir", () => {
    useSelector.mockReturnValue({
      isCartOpen: true,
      items: [{ id: 1, name: "A", price: 50, quantity: 1, format: "külah" }],
    });

    render(<CartModal />);

    fireEvent.click(screen.getByText("Çıkar"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  test("adet artırma dispatch edilir", () => {
    useSelector.mockReturnValue({
      isCartOpen: true,
      items: [{ id: 1, name: "A", price: 50, quantity: 1, format: "külah" }],
    });

    render(<CartModal />);

    fireEvent.click(screen.getByLabelText("Artır"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  test("sipariş ver butonu çalışır", () => {
    const onOrderSuccess = jest.fn();

    useSelector.mockReturnValue({
      isCartOpen: true,
      items: [{ id: 1, name: "A", price: 50, quantity: 1, format: "külah" }],
    });

    render(<CartModal onOrderSuccess={onOrderSuccess} />);

    fireEvent.click(screen.getByText("Sipariş Ver"));

    expect(mockDispatch).toHaveBeenCalled(); // clearCart + closeCart
    expect(onOrderSuccess).toHaveBeenCalled();
  });
});
