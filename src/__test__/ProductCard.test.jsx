import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./../components/ProductCard";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

// action'ı mockluyoruz
jest.mock("./../features/cart/cartSlice", () => ({
  addToCart: jest.fn((payload) => ({
    type: "cart/addToCart",
    payload,
  })),
}));

describe("ProductCard", () => {
  const mockDispatch = jest.fn();

  const mockProduct = {
    id: 1,
    name: "Vanilyalı Dondurma",
    price: 50,
    image: "vanilla.png",
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  test("ürün bilgileri render edilir", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Vanilyalı Dondurma")).toBeInTheDocument();
    expect(screen.getByText("₺50.00 / top")).toBeInTheDocument();
  });

  test("başlangıçta format butonları görünür", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Külah")).toBeInTheDocument();
    expect(screen.getByText("Bardakta")).toBeInTheDocument();
  });

  test("format seçince 'Sepete Ekle' butonu görünür", () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByText("Külah"));

    expect(screen.getByText("Sepete Ekle")).toBeInTheDocument();
  });

  test("sepete ekle tıklanınca dispatch çalışır", () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByText("Külah"));
    fireEvent.click(screen.getByText("Sepete Ekle"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  test("format seçilmeden sepete ekleme olmaz", () => {
    render(<ProductCard product={mockProduct} />);

    // direkt sepete ekle butonu yok zaten
    expect(screen.queryByText("Sepete Ekle")).not.toBeInTheDocument();
  });

});