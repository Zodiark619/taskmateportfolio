import { useDispatch } from "react-redux";

import Cart from './Cart';
import { add } from "./redux/cartSlice";
const products = [
  { id: 1, name: "adsad", price: 21.32 },
  { id: 2, name: "dwq", price: 886 },
  { id: 3, name: "213", price: 1 },
  { id: 4, name: "vgfre", price: 23 },
  { id: 5, name: "g4r", price: 64 },
  { id: 6, name: "434f", price: 22 },
];
const Exercise = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <Cart/>
      </div>
      <div>
        {products.map((product) => (
          <p>
            {product.name}-{product.price}
            <button
              onClick={() => {
               dispatch(add(product));
              }}
            >
              add
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Exercise;
