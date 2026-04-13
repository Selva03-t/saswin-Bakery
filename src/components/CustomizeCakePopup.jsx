import { useState } from "react";

function CustomizeCakePopup({ onClose }) {
  const [type, setType] = useState("Birthday Cake");
  const [flavor, setFlavor] = useState("Chocolate");
  const [shape, setShape] = useState("Round");
  const [weight, setWeight] = useState("1 KG");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const handleWhatsApp = () => {
    const text = `
🎂 Custom Cake Order  
--------------------------
🍰 Cake Type: ${type}
🧁 Flavor: ${flavor}
🎨 Shape: ${shape}
⚖  Weight: ${weight}
💬 Message: ${message || "No message"}
📅 Delivery Date: ${date}
--------------------------
Please confirm the price & availability.
`;

    const encoded = encodeURIComponent(text);

    window.open(
      `https://wa.me/919994133272?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>🎂 Customize Your Cake</h2>

        <label> Cake Type </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Birthday Cake</option>
          <option>Wedding Cake</option>
          <option>Anniversary Cake</option>
          <option>Kids Theme Cake</option>
        </select>

        <label> Flavor </label>
        <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
          <option>Chocolate</option>
          <option>Butterscotch</option>
          <option>Black Forest</option>
          <option>Red Velvet</option>
          <option>Vanilla</option>
        </select>

        <label> Shape </label>
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          <option>Round</option>
          <option>Square</option>
          <option>Heart</option>
          <option>Rectangle</option>
        </select>

        <label> Weight </label>
        <select value={weight} onChange={(e) => setWeight(e.target.value)}>
          <option>0.5 KG</option>
          <option>1 KG</option>
          <option>1.5 KG</option>
          <option>2 KG</option>
        </select>

        <label> Message on Cake </label>
        <input
          type="text"
          placeholder="Happy Birthday Alex!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label> Delivery Date </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn secondary" onClick={onClose}>
            Close
          </button>

          <button className="btn primary" onClick={handleWhatsApp}>
            Order via WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}

export default CustomizeCakePopup;
