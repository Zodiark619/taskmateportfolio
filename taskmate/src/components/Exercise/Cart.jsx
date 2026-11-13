 import { useSelector } from "react-redux";
const Cart = () => {
   const products=useSelector(state=>state.cartState.cartList)
   const total=useSelector(state=>state.cartState.total)
  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
          <button  >Remove</button>
        </div>
      ))}

      <h3>Total: {total}</h3>

      <button >Clear Cart</button>
    </div>
  );
};

export default Cart;
