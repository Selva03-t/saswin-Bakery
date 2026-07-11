import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowRight, Star, Cake, Gift, Heart } from "lucide-react";
import CustomizeCakePopup from "../components/CustomizeCakePopup";
import { featuredProducts, normalizeProduct } from "../utils/productData";
import { apiUrl } from "../utils/api";

function Home() {
  const [showCustomize, setShowCustomize] = useState(false);
  const [featured, setFeatured] = useState(featuredProducts);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);

    fetch(apiUrl("/api/products/featured"), {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeatured(data.map((product, index) => normalizeProduct(product, index)));
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.log("Fetch error, using local featured products:", err);
        }
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <section className="landing">
      <Motion.div
        className="hero"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="hero-content">
          <Motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Freshly Baked. <br />
            <span style={{ color: "#E03131" }}>Daily Happiness.</span>
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Explore premium cakes, cupcakes, pastries & breads made with pure love at Saswin Bakery.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <a href="/products" className="btn primary hero-btn">
              Shop Now <ArrowRight size={18} />
            </a>
          </Motion.div>
        </div>

        <Motion.div
          className="hero-img"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <img
            src={featuredProducts[2].image}
            alt="Delicious Chocolate Truffle Cake"
            loading="eager"
            decoding="async"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          />
        </Motion.div>
      </Motion.div>

      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeIn}
      >
        <h2 className="sec-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Gift size={24} color="#E03131" /> Shop by Category
        </h2>
        <Motion.div
          className="category-boxes"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Motion.a variants={fadeIn} whileHover={{ scale: 1.03 }} href="/products?category=Cakes" className="cat-box">
            <Cake size={28} /> Cakes
          </Motion.a>
          <Motion.a variants={fadeIn} whileHover={{ scale: 1.03 }} href="/products?category=Cupcakes" className="cat-box">
            Cupcakes
          </Motion.a>
          <Motion.a variants={fadeIn} whileHover={{ scale: 1.03 }} href="/products?category=Bread" className="cat-box">
            Breads
          </Motion.a>
          <Motion.a variants={fadeIn} whileHover={{ scale: 1.03 }} href="/products" className="cat-box">
            All
          </Motion.a>
        </Motion.div>
      </Motion.div>

      <Motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeIn}
      >
        <h2 className="sec-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Star size={24} color="#E03131" /> Best Sellers
        </h2>

        <Motion.div
          className="featured-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((item) => (
            <Motion.div key={item._id} className="product-card" variants={fadeIn}>
              <div className="product-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                  loading="lazy"
                  decoding="async"
                />
                <button className="wishlist-btn" type="button" aria-label="Wishlist">
                  <Heart size={16} />
                </button>
              </div>
              <div className="product-body" style={{ padding: "1.2rem" }}>
                <h3 className="product-title" style={{ fontSize: "1.1rem" }}>{item.title}</h3>
                <p className="product-category" style={{ fontSize: "0.85rem" }}>{item.category}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                  <span className="product-price">Rs. {item.price}</span>
                  <button className="btn primary btn-small" type="button">Add</button>
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        <Motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            className="btn primary customize-btn"
            onClick={() => setShowCustomize(true)}
            style={{ padding: "0.8rem 2rem", fontSize: "1.1rem" }}
            type="button"
          >
            Customize Your Cake
          </button>
        </Motion.div>
      </Motion.div>

      {showCustomize && <CustomizeCakePopup onClose={() => setShowCustomize(false)} />}
    </section>
  );
}

export default Home;
