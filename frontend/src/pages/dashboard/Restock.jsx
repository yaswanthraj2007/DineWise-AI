import DataTable from "../../components/DataTable.jsx";

const columns = [
  { key: "item", label: "Item" },
  { key: "currentStock", label: "Current Stock" },
  { key: "reorderLevel", label: "Reorder Level" },
  { key: "suggestedQty", label: "Suggested Qty" },
  { key: "priority", label: "Priority" },
  { key: "supplier", label: "Supplier" },
  { key: "reason", label: "Reason" },
];

export default function Restock() {
  return (
    <>
      <div className="page-head">
        <h1>Restock Suggestions</h1>
        <p>Recommended purchases based on stock levels and seasonal demand.</p>
      </div>
      <DataTable
        columns={columns}
        rows={[]}
        emptyMessage="No restock suggestions yet. Suggestions will be generated from stock and demand data."
      />
    </>
  );
}
