import { useCart } from "../context/CartContext";

export default function ShoppingCart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty 🛒</h2>;
  }

  return (
    <div>
      <h1>My Shopping Cart</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cartItems.map((car) => (
          <li
            key={car.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <img
              src={car.image}
              alt={car.make}
              style={{
                width: "100px",
                height: "auto",
                maxHeight: "100px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <p style={{ margin: 0 }}>
                {car.make} {car.model} ({car.year}) - ${car.price}/day
              </p>
              <button
                onClick={() => removeFromCart(car.id)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



