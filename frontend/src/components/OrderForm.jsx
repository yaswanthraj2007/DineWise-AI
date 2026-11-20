import { useState } from "react";

// Used for both "New order" and "Add to order" (reorder).
export default function OrderForm({ mode = "new", order, onSubmit, onClose }) {
  const isNew = mode === "new";
  const [form, setForm] = useState({ table: "", items: "", price: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      table: form.table,
      items: form.items.trim(),
      price: Number(form.price),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h2>{isNew ? "New order" : `Add to ${order.orderId}`}</h2>
        {!isNew && (
          <p className="muted">
            Table {order.table} &middot; new items are added to this order.
            Existing items stay unchanged.
          </p>
        )}

        {isNew && (
          <label>
            Table number
            <input
              type="number"
              min="1"
              name="table"
              value={form.table}
              onChange={onChange}
              placeholder="e.g. 5"
              required
            />
          </label>
        )}
        <label>
          Items
          <input
            name="items"
            value={form.items}
            onChange={onChange}
            placeholder="e.g. Paneer Tikka, Naan"
            required
          />
        </label>
        <label>
          Price (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="0.00"
            required
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isNew ? "Place order" : "Add items"}
          </button>
        </div>
      </form>
    </div>
  );
}