import { useState } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useProducts } from "../context/ProductContext";
import { categories } from "../utils/categories";

function Products() {
  const { products } = useProducts(); // backend data from context
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Still loading?
  const loading = products.length === 0;

  // 🔥 Filter Products (Backend Data)
  const filteredProducts = products
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section className="products-page">
      <h2>Our Products</h2>

      {/* Search Bar */}
      <div className="products-header">
        <input
          type="text"
          placeholder="Search cakes, pastries, bread..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="category-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="product-grid">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {/* Empty Search / No results */}
      {!loading && filteredProducts.length === 0 && (
        <p>No products found for “{search}”.</p>
      )}

      {/* Products Grid */}
      {!loading && (
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
