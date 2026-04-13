import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useToast } from "../context/ToastContext";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { dispatch } = useCart();
  const { showToast } = useToast();

  //  Backend uses _id, so find by _id
  const product = products.find((p) => p._id === id);

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    showToast("Added to cart!", "success");
  };

  return (
    <section className="product-details">
      <div className="details-grid">
        {/* image */}
        <img src={product.image} alt={product.title} className="details-image" />

        <div className="details-info">
          {/* Backend uses title */}
          <h2>{product.title}</h2>

          <p className="details-category">{product.category}</p>

          <p className="details-price">₹{product.price}</p>

          <p className="details-desc">
            {product.description ||
              "This is a freshly baked item made to perfection. Perfect for celebrations and cravings!"}
          </p>

          <button className="btn primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
