import React, { useState } from "react";

const CreateCustomer = ({ refreshCustomers }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        companyName: "",
        companyNumber: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5209/api/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Kund skapad!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    address: "",
                    companyName: "",
                    companyNumber: ""
                });
                refreshCustomers();
            } else {
                alert("Misslyckades med att skapa kund.");
            }
        } catch (error) {
            console.error("Fel vid API-anrop:", error);
        }
    };

    return (
        <div className="CreateCustomerForm">
            <h2>Skapa ny kund</h2>
            <form onSubmit={handleSubmit}>
                <label>Förnamn:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label>Efternamn:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label>Adress:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                <label>Företagsnamn:</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

                <label>Företagsnummer:</label>
                <input type="text" name="companyNumber" value={formData.companyNumber} onChange={handleChange} required />

                <button className="CreateBtn" type="submit">Skapa kund</button>
            </form>
        </div>
    );
};

export default CreateCustomer;