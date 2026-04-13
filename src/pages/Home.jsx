import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Cake, Gift, Heart } from "lucide-react";
import CustomizeCakePopup from "../components/CustomizeCakePopup";

import choctuffle from "../assets/products/chocolate-tuffle.jpg";
import redvalvet from "../assets/products/red-valvet.jpg";
import garlicBread from "../assets/products/garlic-bread.jpg";
import Blueberrycheese from "../assets/products/blueberry-cheesecake.jpg";

function Home() {
  const [showCustomize, setShowCustomize] = useState(false);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fallbackData = [
      { _id: 1, title: 'Chocolate Truffle', image: choctuffle, category: 'Cakes', price: 499 },
      { _id: 2, title: 'Red Velvet', image: redvalvet, category: 'Cakes', price: 599 },
      { _id: 3, title: 'Garlic Bread', image: garlicBread, category: 'Bread', price: 149 },
      { _id: 4, title: 'Blueberry Cheesecake', image: Blueberrycheese, category: 'Cakes', price: 699 }
    ];

    fetch("http://localhost:5000/api/products/featured")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          setFeatured(data);
        } else {
          setFeatured(fallbackData);
        }
      })
      .catch(err => {
        console.log("Fetch error, using fallback:", err);
        setFeatured(fallbackData);
      });
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section className="landing">
      {/* HERO */}
      <motion.div 
        className="hero"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Freshly Baked. <br/>
            <span style={{color: '#E03131'}}>Daily Happiness.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore premium cakes, cupcakes, pastries & breads made with pure love at Saswin Bakery.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href="/products" className="btn primary hero-btn">
              Shop Now <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-img"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.img
            src={choctuffle}
            alt="Delicious Chocolate Truffle Cake"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          />
        </motion.div>
      </motion.div>

      {/* CATEGORIES */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <h2 className="sec-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gift size={24} color="#E03131"/> Shop by Category
        </h2>
        <motion.div className="category-boxes" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.a variants={fadeIn} whileHover={{ scale: 1.05 }} href="/products?category=Cakes" className="cat-box">
            <Cake size={28} />  Cakes
          </motion.a>
          <motion.a variants={fadeIn} whileHover={{ scale: 1.05 }} href="/products?category=Cupcakes" className="cat-box">
             🧁 Cupcakes
          </motion.a>
          <motion.a variants={fadeIn} whileHover={{ scale: 1.05 }} href="/products?category=Bread" className="cat-box">
             🥖 Breads
          </motion.a>
          <motion.a variants={fadeIn} whileHover={{ scale: 1.05 }} href="/products" className="cat-box">
             🎁 All
          </motion.a>
        </motion.div>
      </motion.div>

      {/* BEST SELLERS / FEATURED */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <h2 className="sec-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={24} color="#E03131" /> Best Sellers
        </h2>
        
        <motion.div className="featured-row" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {featured.map((item, idx) => (
             <motion.div 
               key={item._id || idx} 
               className="product-card" 
               variants={fadeIn}
             >
                <div className="product-image-wrapper">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image} 
                    className="product-image"
                  />
                  <button className="wishlist-btn"><Heart size={16} /></button>
                </div>
                <div className="product-body" style={{ padding: '1.2rem' }}>
                   <h3 className="product-title" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                   <p className="product-category" style={{ fontSize: '0.85rem' }}>{item.category}</p>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                     <span className="product-price">₹{item.price}</span>
                     <button className="btn primary btn-small">Add</button>
                   </div>
                </div>
             </motion.div>
          ))}
        </motion.div>

        <motion.div 
           style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <button className="btn primary customize-btn" onClick={() => setShowCustomize(true)} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            🎂 Customize Your Cake
          </button>
        </motion.div>
      </motion.div>

      {showCustomize && <CustomizeCakePopup onClose={() => setShowCustomize(false)} />}
    </section>
  );
}

export default Home;
