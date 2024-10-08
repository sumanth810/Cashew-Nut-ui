import React, { useState, useEffect } from "react";
import FormContainer from "./FormContainer";

const CashewForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    todayIntake: "",
    shellingIntake: "",
    peelingIntake: "",
    gradingIntake: "",
    todayOutput: "",
    shellingOutput: "",
    peelingOutput: "",
    whiteWholesOutput: "",
    scorchedWholesOutput: "",
    cashewFormsOutput: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      date: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken"); // Get the JWT token from localStorage

    console.log("Form data on submit:", formData);

    fetch("/api/cashew-process/batchdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          const text = await response.text();
          throw new Error(`Expected JSON response, but got: ${text}`);
        }
      })
      .then((data) => {
        alert("Form submitted successfully!");
        console.log("Success:", data);
        setFormData({
          date: new Date().toISOString().split("T")[0],
          todayIntake: "",
          shellingIntake: "",
          peelingIntake: "",
          gradingIntake: "",
          todayOutput: "",
          shellingOutput: "",
          peelingOutput: "",
          whiteWholesOutput: "",
          scorchedWholesOutput: "",
          cashewFormsOutput: "",
        });
      })
      .catch((error) => {
        alert("Failed to submit form: " + error.message);
        console.error("Error:", error);
      });
  };

  return (
    <>
      <FormContainer
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default CashewForm;
