import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { categories } from "../utils/categories";

function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const { products, isRefreshing } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        deferredSearch.length === 0 ||
        item.title.toLowerCase().includes(deferredSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, deferredSearch]);

  return (
    <section className="products-page">
      <div className="products-title-row">
        <h2>Our Products</h2>
        {isRefreshing && <span className="sync-pill">Updating</span>}
      </div>

      <div className="products-header">
        <input
          type="text"
          placeholder="Search cakes, pastries, bread..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found for "{search}".</p>
      ) : (
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
