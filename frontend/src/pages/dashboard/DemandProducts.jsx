import DataTable from "../../components/DataTable.jsx";

const columns = [
  { key: "product", label: "Product" },
  { key: "category", label: "Category" },
  { key: "season", label: "Season" },
  { key: "unitsSold", label: "Units Sold" },
  { key: "demand", label: "Demand Level" },
  { key: "trend", label: "Trend" },
];

export default function DemandProducts() {
  return (
    <>
      <div className="page-head">
        <h1>Demand Products</h1>
        <p>Most ordered food items for the current season.</p>
      </div>
      <DataTable
        columns={columns}
        rows={[]}
        emptyMessage="No demand data yet. Seasonal demand will appear once orders are recorded."
      />
    </>
  );
}
