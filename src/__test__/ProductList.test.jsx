import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../components/ProductList";
import axios from "axios";

jest.mock("axios");

// ProductCard'ı sadeleştiriyoruz
jest.mock("./../components/ProductCard", () => ({ product }) => (
  <div data-testid="product-item">{product.name}</div>
));

describe("ProductList", () => {
  test("component mount olunca ürünler fetch edilir", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<ProductList />);

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/products");
  });

  test("loading durumunda yükleniyor mesajı görünür", async () => {
    let resolveFn;
    const promise = new Promise((resolve) => {
      resolveFn = resolve;
    });
  
    axios.get.mockReturnValue(promise);
  
    render(<ProductList />);
  
    expect(screen.getByText(/Yükleniyor/i)).toBeInTheDocument();
  
    resolveFn({ data: [] }); // testin sonunda resolve et
  });

  test("error durumunda hata mesajı görünür", async () => {
    axios.get.mockRejectedValue(new Error("Hata oluştu"));

    render(<ProductList />);

    const errorMessage = await screen.findByText(/Hata oluştu/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("products fetch edildikten sonra liste görünür", async () => {
    const mockProducts = [
      {
        id: 1,
        name: "Bal Badem",
        price: 25,
        image: "/images/ice-2.png",
      },
      {
        id: 2,
        name: "Çikolata Fırtınası",
        price: 20,
        image: "/images/ice-1.png",
      },
    ];

    axios.get.mockResolvedValue({ data: mockProducts });

    render(<ProductList />);

    const items = await screen.findAllByTestId("product-item");

    expect(items.length).toBe(2);
    expect(screen.getByText("Bal Badem")).toBeInTheDocument();
    expect(screen.getByText("Çikolata Fırtınası")).toBeInTheDocument();
  });
});
