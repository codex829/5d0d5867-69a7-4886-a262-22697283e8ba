'use client';

import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useState } from "react";

export default function EmployeeAddForm() {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    position: "",
    phone: "",
    email: ""
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    console.log('fieldName:', fieldName);
    const fieldValue = e.target.value;
    console.log('fieldValue:', fieldValue);

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    console.log('formData:', formData);

    // Turn our formData state into data we can use with a form submission
    // Object.entries(formData).forEach(([key, value]) => {
    //   data.append(key, value);
    // })

    console.log('Ini Data', data);

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { 'Content-Type':'application/json' },
    }).then((response) => response.json())
      .then((data) => {
        setFormData({
          firstname: "",
          lastname: "",
          position: "",
          phone: "",
          email: ""
        })

        // setFormSuccess(true)
        // setFormSuccessMessage(data.submission_text)
      })
  }

  return (
    <div className="mb-3">
      <form action="http://localhost:3000/employee" method="post" onSubmit={submitForm}>
        <InputText name="firstname" onChange={handleInput} value={formData.firstname} placeholder="firstname" />
        <InputText name="lastname" onChange={handleInput} value={formData.lastname} placeholder="lastname" />
        <InputText name="position" onChange={handleInput} value={formData.position} placeholder="position" />
        <InputText name="phone" onChange={handleInput} value={formData.phone} placeholder="phone" />
        <InputText name="email" onChange={handleInput} value={formData.email} placeholder="email" />
        <Button id="btnSubmit" type="submit" label="Submit" />
      </form>
    </div>
  );

}


