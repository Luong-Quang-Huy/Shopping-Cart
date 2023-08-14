import { useState, useMemo } from "react";
import ProductDataRow from "./ProductDataRow.tsx";
import "./App.css";

type Product = {
  id: number;
  quantity: number;
  photoSrc: string;
  name: string;
  size: string;
  color: string;
  price: number;
  discount: number;
};

const couponCodes = {
  ABC123: 0.1,
  DEF456: 0.2,
  LOL789: 0.3,
};

function App() {
  const [cart, setCart] = useState(fakeData);
  const [input, setInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCoupnStatus] = useState("");

  const total = useMemo(() => {
    const result = cart.reduce((accumulator, product) => {
      const { price, discount, quantity } = product;
      const payOnProduct = (price - price * discount) * quantity;
      return accumulator + payOnProduct;
    }, 0);
    return result;
  }, [cart]);
  const couponUsage = total * discount;
  const subTotal = total - couponUsage;
  const rewardPoin = Math.round(total);

  const handleQuantityChange = (id: number, quantity: number) => {
    const result = cart.map((product) =>
      product.id === id ? { ...product, quantity: quantity } : { ...product }
    );
    setCart(result);
  };
  const handleDeleteProduct = (id: number) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const tableDataElements = cart.map((product) => (
    <ProductDataRow
      key={product.id}
      {...product}
      handleQuantityChange={handleQuantityChange}
      handleDeleteProduct={handleDeleteProduct}
    />
  ));

  const checkCouponCode = () => {
    if (couponCodes.hasOwnProperty(input)) {
      setDiscount(couponCodes[input as keyof typeof couponCodes]);
      setCoupnStatus(
        `Áp dụng mã giảm giá ${couponCodes[input as keyof typeof couponCodes] * 100}% giá trị đơn hàng`
      );
      setInput("");
    } else {
      setCoupnStatus("Mã giảm giá không tồn tại");
      setDiscount(0);
    }
  };

  const clearAllProducts = () => {
    setCart([]);
  }

  return (
    <div className="w-screen lg:w-9/12 flex flex-col mx-auto gap-4">
      <div className="text-center p-1 rounded bg-teal-100 w-full">
        <p className="font-light text-lg">
          <img
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAzIDUxMi4wMDMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDMgNTEyLjAwMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMjU2LjAwMSw2NGMtNzAuNTkyLDAtMTI4LDU3LjQwOC0xMjgsMTI4czU3LjQwOCwxMjgsMTI4LDEyOHMxMjgtNTcuNDA4LDEyOC0xMjhTMzI2LjU5Myw2NCwyNTYuMDAxLDY0eiAgICAgIE0yNTYuMDAxLDI5OC42NjdjLTU4LjgxNiwwLTEwNi42NjctNDcuODUxLTEwNi42NjctMTA2LjY2N1MxOTcuMTg1LDg1LjMzMywyNTYuMDAxLDg1LjMzM1MzNjIuNjY4LDEzMy4xODQsMzYyLjY2OCwxOTIgICAgIFMzMTQuODE3LDI5OC42NjcsMjU2LjAwMSwyOTguNjY3eiIgZmlsbD0iIzUwYzZlOSIvPgoJCQk8cGF0aCBkPSJNMzg1LjY0NCwzMzMuMjA1YzM4LjIyOS0zNS4xMzYsNjIuMzU3LTg1LjMzMyw2Mi4zNTctMTQxLjIwNWMwLTEwNS44NTYtODYuMTIzLTE5Mi0xOTItMTkycy0xOTIsODYuMTQ0LTE5MiwxOTIgICAgIGMwLDU1Ljg1MSwyNC4xMjgsMTA2LjA2OSw2Mi4zMzYsMTQxLjE4NEw2NC42ODQsNDk3LjZjLTEuNTM2LDQuMTE3LTAuNDA1LDguNzI1LDIuODM3LDExLjY2OSAgICAgYzIuMDI3LDEuNzkyLDQuNTY1LDIuNzMxLDcuMTQ3LDIuNzMxYzEuNjIxLDAsMy4yNDMtMC4zNjMsNC43NzktMS4xMDlsNzkuNzg3LTM5Ljg5M2w1OC44NTksMzkuMjMyICAgICBjMi42ODgsMS43OTIsNi4xMDEsMi4yNCw5LjE5NSwxLjI4YzMuMDkzLTEuMDAzLDUuNTY4LTMuMzQ5LDYuNjk5LTYuNGwyMy4yOTYtNjIuMTQ0bDIwLjU4Nyw2MS43MzkgICAgIGMxLjA2NywzLjE1NywzLjU0MSw1LjYzMiw2LjY3Nyw2LjcyYzMuMTM2LDEuMDY3LDYuNTkyLDAuNjQsOS4zNjUtMS4yMTZsNTguODU5LTM5LjIzMmw3OS43ODcsMzkuODkzICAgICBjMS41MzYsMC43NjgsMy4xNTcsMS4xMzEsNC43NzksMS4xMzFjMi41ODEsMCw1LjEyLTAuOTM5LDcuMTI1LTIuNzUyYzMuMjY0LTIuOTIzLDQuMzczLTcuNTUyLDIuODM3LTExLjY2OUwzODUuNjQ0LDMzMy4yMDV6ICAgICAgTTI0Ni4wMTcsNDEyLjI2N2wtMjcuMjg1LDcyLjc0N2wtNTIuODIxLTM1LjJjLTMuMi0yLjExMi03LjMxNy0yLjM4OS0xMC42ODgtMC42NjFMOTQuMTg4LDQ3OS42OGw0OS41NzktMTMyLjIyNCAgICAgYzI2Ljg1OSwxOS40MzUsNTguNzk1LDMyLjIxMyw5My41NDcsMzUuNjA1TDI0Ni43LDQxMS4yQzI0Ni40ODcsNDExLjU2MywyNDYuMTY3LDQxMS44NCwyNDYuMDE3LDQxMi4yNjd6IE0yNTYuMDAxLDM2Mi42NjcgICAgIEMxNjEuOSwzNjIuNjY3LDg1LjMzNSwyODYuMTAxLDg1LjMzNSwxOTJTMTYxLjksMjEuMzMzLDI1Ni4wMDEsMjEuMzMzUzQyNi42NjgsOTcuODk5LDQyNi42NjgsMTkyICAgICBTMzUwLjEwMywzNjIuNjY3LDI1Ni4wMDEsMzYyLjY2N3ogTTM1Ni43NTksNDQ5LjEzMWMtMy40MTMtMS43MjgtNy41MDktMS40NzItMTAuNjg4LDAuNjYxbC01Mi4zNzMsMzQuOTIzbC0zMy42NDMtMTAwLjkyOCAgICAgYzQwLjM0MS0wLjg1Myw3Ny41ODktMTQuMTg3LDEwOC4xNi0zNi4zMzFsNDkuNTc5LDEzMi4yMDNMMzU2Ljc1OSw0NDkuMTMxeiIgZmlsbD0iIzUwYzZlOSIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
            alt=""
            className="w-4 h-4 mr-3 inline"
          />
          With this purchase you will earn
          <span className="mx-1 font-semibold">{rewardPoin}</span>
          Reward Points.
        </p>
      </div>
      <div className="w-full overflow-hidden flex flex-col items-center">
        {cart.length > 0 ? (
          <table className="border-collapse border-black mx-auto w-full overflow-scroll">
            <thead>
              <tr className="border-y-2">
                <th className="min-w-max p-4 text-left">Product Name</th>
                <th className="min-w-max p-4">Quantity</th>
                <th className="min-w-max p-4">Subtotal</th>
                <th className="min-w-max p-4">Discount</th>
                <th>
                  <button
                    onClick={clearAllProducts}
                    className="text-center font-light ring-1 ring-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:ring-red-300 hover:text-white active:ring-2"
                  >
                    Clear all
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>{tableDataElements}</tbody>
          </table>
        ) : (
          <>
          <img src="empty-cart.png" alt="empty cart" className="w-6/12 h-auto"/>
          <h2 className="text-lg">Hiện không có sản phẩm nào trong giỏ hàng</h2>
          </>
        )}
      </div>
      <div className="flex flex-col gap-y-4 md:flex-row md:justify-between items-center w-full">
        <div>
          <div className="inline-block relative">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              className="w-[235px] h-9 p-2 border-0 ring-1 ring-teal-400 focus:ring-4 focus:ring-teal-200 rounded-sm focus-visible:outline-none"
            />
            {couponStatus !== "" && (
              <p
                className={`${
                  discount !== 0 ? "text-green-500" : "text-red-500"
                } absolute`}
              >
                {couponStatus}
              </p>
            )}
          </div>
          <button
            onClick={checkCouponCode}
            className="w-full my-4 md:w-auto md:mx-2 text-center  px-4 py-2 rounded ring-1 active:ring-4 ring-teal-400 text-teal-400 hover:text-white hover:bg-teal-500"
          >
            Apply coupon
          </button>
        </div>
        <details className="relative">
          <summary className="text-lg">${subTotal.toFixed(2)}$</summary>
          <div className="absolute bg-black/90 ring-1 p-2 rounded-lg shadow-xl ring-green-500 w-[220px] text-white">
            <p>
              total: <span className="text-green-500">{total.toFixed(2)}$</span>
            </p>
            <p>
              coupon usage:{" "}
              <span className="text-red-500">{`- ${couponUsage.toFixed(2)}$ (${
                discount * 100
              }%)`}</span>
            </p>
            <p>
              subtotal:{" "}
              <span className="text-green-500">{subTotal.toFixed(2)}$</span>
            </p>
          </div>
        </details>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-between gap-y-4 pt-6">
        <button className="text-center text-gray-400 px-[12px] py-[6px] rounded ring-1 ring-gray-400 hover:bg-gray-500 hover:text-white active:ring-4 active:ring-gray-300">
          Back to shopping
        </button>
        <button className="text-center text-white px-[12px] py-[6px] rounded bg-green-500 ring-1 ring-green-200 hover:bg-green-600 active:ring-4 active:ring-green-300">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default App;

const fakeData: Product[] = [
  {
    id: 0,
    quantity: 1,
    photoSrc: "tshirt-1.webp",
    name: "KÅNKEN T-SHIRT M",
    size: "M",
    color: "Dandelion",
    price: 69.95,
    discount: 0.17,
  },
  {
    id: 1,
    quantity: 1,
    photoSrc: "tshirt-2.webp",
    name: "BAROQUE PRINT TSHIRT",
    size: "L",
    color: "Black",
    price: 35.77,
    discount: 0.12,
  },
  {
    id: 2,
    quantity: 1,
    photoSrc: "1-66.jpg",
    name: "Benee MA.132",
    size: "XL",
    color: "Dark Rose",
    price: 19.32,
    discount: 0,
  },
  {
    id: 3,
    quantity: 1,
    photoSrc: "quan-lot-lot-khe-nu.jpg",
    name: "Quần lọt khoe nữ",
    size: "XXL",
    color: "Rose",
    price: 25.69,
    discount: 0.1,
  },
];
