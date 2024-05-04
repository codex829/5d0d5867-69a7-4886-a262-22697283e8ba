'use client';

import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Firstname',
    selector: row => row.firstname,
    sortable: true,
  },
  {
    name: 'Lastname',
    selector: row => row.lastname,
    sortable: true,
  },
  {
    name: 'Position',
    selector: row => row.position,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
];

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
    <DataTable columns={columns} data={employeeData} />
  );
}