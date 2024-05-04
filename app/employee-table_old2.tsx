'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';

export default function EmployeeTable() {

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/employee')
    .then((response) => response.json())
    .then((res) => {
      // console.log(res.data);
      setEmployeeData(res.data);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <DataTable value={employeeData} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
      <Column field="firstname" header="Firstname" editor="text"></Column>
      <Column field="lastname" header="Lastname"></Column>
      <Column field="position" header="Position"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="email" header="Email"></Column>
    </DataTable>
  );
}