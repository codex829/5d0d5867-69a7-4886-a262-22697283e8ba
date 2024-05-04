import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function PrimeReactTable() {

  let products = [
    {
      code: "123",
      name: "Danu Ciptadi",
      category: "Pengusaha",
      quantity: "500",
    }
  ];

  return (
    <DataTable value={products} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  );
}