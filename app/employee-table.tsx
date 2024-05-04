'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';
// import { ProductService } from './service/ProductService';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  const columns = [
    { field: 'firstname', header: 'Firstname' },
    { field: 'lastname', header: 'Lastname' },
    { field: 'position', header: 'position' },
    { field: 'phone', header: 'Phone' },
    { field: 'email', header: 'Email' }
  ];

  useEffect(() => {
    // ProductService.getProductsMini().then((data) => setEmployees(data));

    fetch('http://localhost:3000/employee')
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.data);
      setEmployees(res.data);
    })
    .catch((error) => console.log(error));

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
      return false;
    }

    str = str.replace(/^0+/, '') || '0';
    let n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    type ReqBody = {[key: string] : string}
    let reqBody: ReqBody = {[field]: newValue};

    console.log(reqBody);

    // update employee data on database
    fetch('http://localhost:3000/employee/' + rowData._id, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(reqBody)
    })
    .then((response) => response.json())
    .then((res) => {
      rowData[field] = newValue;
    })
    .catch((error) => console.log(error));


    /*
    switch (field) {
      case 'quantity':
      case 'price':
        if (isPositiveInteger(newValue)) rowData[field] = newValue;
        else event.preventDefault();
        break;

      default:
        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
        break;
    }
    */
  };

  const cellEditor = (options) => {
    return textEditor(options);
  };

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
  };

  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" onKeyDown={(e) => e.stopPropagation()} />;
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
  };

  return (
    <div className="card p-fluid">
      <DataTable value={employees} editMode="cell" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        {columns.map(({ field, header }) => {
          return <Column key={field} field={field} header={header} sortable style={{ width: '25%' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
        })}
      </DataTable>
    </div>
  );
}
