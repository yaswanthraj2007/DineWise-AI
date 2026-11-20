import { useEffect, useState } from "react";
import OrderForm from "../../components/OrderForm.jsx";
import { api } from "../../api.js";

const LABEL = { order: "Ordered", received: "Received", billed: "Billed" };
const NEXT = { order: "Received", received: "Billed" };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [reorderId, setReorderId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setOrders(await api("/orders"));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addOrder = async ({ table, items, price }) => {
    try {
      await api("/orders", {
        method: "POST",
        body: { tableno: table, items, price },
      });
      setShowNew(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const reorder = async ({ items, price }) => {
    try {
      await api(`/orders/${reorderId}/reorder`, {
        method: "PATCH",
        body: { items, price },
      });
      setReorderId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const advanceStatus = async (id) => {
    try {
      await api(`/orders/${id}/status`, { method: "PATCH" });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const reorderTarget = orders.find((o) => o.orderid === reorderId);

  return (
    <>
      <div className="page-head page-head-row">
        <div>
          <h1>Orders</h1>
          <p>Live orders grouped by table number.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(true)}>
          + Order
        </button>
      </div>

      {error && <p style={{ color: "#c0392b" }}>{error}</p>}

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Table No.</th>
                <th>Order ID</th>
                <th>Items</th>
                <th>Price</th>
                <th>Status</th>
                <th>Order Time</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    No orders yet. Orders placed from tables will appear here.
                  </td>
                </tr>
              ) : (
                orders.map((o) => {
                  const billed = o.status === "billed";
                  return (
                    <tr key={o.orderid}>
                      <td>{o.tableno}</td>
                      <td>ORD-{String(o.orderid).padStart(3, "0")}</td>
                      <td>
                        {o.items.map((it, i) => (
                          <div key={i}>{it}</div>
                        ))}
                      </td>
                      <td>₹{Number(o.price).toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${o.status === "order" ? "ordered" : o.status}`}>
                          {LABEL[o.status]}
                        </span>
                      </td>
                      <td>
                        {new Date(o.ordertime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="actions-col">
                        <button
                          className="icon-btn"
                          title={billed ? "Already billed" : `Mark as ${NEXT[o.status]}`}
                          disabled={billed}
                          onClick={() => advanceStatus(o.orderid)}
                        >
                          ⚑
                        </button>
                        <button
                          className="icon-btn"
                          title={billed ? "Order is billed" : "Add to this order"}
                          disabled={billed}
                          onClick={() => setReorderId(o.orderid)}
                        >
                          ✎
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showNew && (
        <OrderForm mode="new" onSubmit={addOrder} onClose={() => setShowNew(false)} />
      )}
      {reorderTarget && (
        <OrderForm
          mode="reorder"
          order={{
            orderId: `ORD-${String(reorderTarget.orderid).padStart(3, "0")}`,
            table: reorderTarget.tableno,
          }}
          onSubmit={reorder}
          onClose={() => setReorderId(null)}
        />
      )}
    </>
  );
}