import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { apiUrl } from "../utils/api";

function CustomizeCakePopup({ onClose }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cakeType: "",
    flavor: "",
    size: "",
    shape: "",
    message: "",
    deliveryDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast("Please login to place a custom cake order", "info");
      navigate("/login");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        apiUrl("/api/orders"),
        {
          orderType: "customCake",
          customCake: form,
        },
        { withCredentials: true }
      );

      showToast("Custom cake order sent to admin", "success");
      onClose();
      navigate("/orders");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to place custom cake order",
        "info"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h2>Customize Your Cake</h2>

        <label>
          Cake Type
          <input
            type="text"
            placeholder="Birthday, wedding, photo cake..."
            value={form.cakeType}
            onChange={(e) => updateField("cakeType", e.target.value)}
            required
          />
        </label>

        <label>
          Flavor
          <input
            type="text"
            placeholder="Chocolate, vanilla, mango..."
            value={form.flavor}
            onChange={(e) => updateField("flavor", e.target.value)}
            required
          />
        </label>

        <label>
          Size
          <input
            type="text"
            placeholder="1 kg, 2.5 kg, 8 inch..."
            value={form.size}
            onChange={(e) => updateField("size", e.target.value)}
            required
          />
        </label>

        <label>
          Shape
          <input
            type="text"
            placeholder="Round, square, heart..."
            value={form.shape}
            onChange={(e) => updateField("shape", e.target.value)}
          />
        </label>

        <label>
          Message on Cake
          <input
            type="text"
            placeholder="Happy Birthday Alex!"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
          />
        </label>

        <label>
          Delivery Date
          <input
            type="date"
            value={form.deliveryDate}
            onChange={(e) => updateField("deliveryDate", e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button className="btn secondary" type="button" onClick={onClose}>
            Close
          </button>

          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send to Admin"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomizeCakePopup;
