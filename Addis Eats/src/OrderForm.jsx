import { useState } from "react";
import PropTypes from "prop-types";

function OrderForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  const phoneIsValid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  const formIsValid =
    form.name.trim().length >= 2 && phoneIsValid && form.area !== "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid) return;

    console.log("Order submitted:", {
      ...form,
      total,
    });

    alert("Order submitted successfully!");
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Delivery Information</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </label>

      {form.name.length > 0 && form.name.trim().length < 2 && (
        <p className="error">Name must be at least 2 characters.</p>
      )}

      <label>
        TeleBirr Phone
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09xxxxxxxx"
        />
      </label>

      {form.phone.length > 0 && !phoneIsValid && (
        <p className="error">Enter a valid TeleBirr number.</p>
      )}

      <label>
        Delivery Area
        <select name="area" value={form.area} onChange={handleChange}>
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Piassa">Piassa</option>
        </select>
      </label>

      <h3>Total: {total.toFixed(2)} ETB</h3>

      <button type="submit" disabled={!formIsValid}>
        Place Order
      </button>
    </form>
  );
}

OrderForm.propTypes = {
  total: PropTypes.number.isRequired,
};

export default OrderForm;
