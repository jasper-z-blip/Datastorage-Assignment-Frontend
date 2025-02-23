import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        address: "",
        companyNumber: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5209/api/customers/${id}`)
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(error => console.error("❌ Fel vid hämtning av kund:", error));
    }, [id]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5209/api/customers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });

            if (response.ok) {
                alert("Kunden har uppdaterats!");
                navigate("/customers");
            } else {
                alert("Misslyckades med att uppdatera kunden.");
            }
        } catch (error) {
            console.error("❌ Fel vid uppdatering av kund:", error);
        }
    };

    return (
        <div className="EditCustomerForm">
            <h2>Redigera kund</h2>
            <form onSubmit={handleSubmit}>
                <label>Förnamn:</label>
                <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} required />

                <label>Efternamn:</label>
                <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} required />

                <label>Företagsnamn:</label>
                <input type="text" name="companyName" value={customer.companyName} onChange={handleChange} required />

                <label>Adress:</label>
                <input type="text" name="address" value={customer.address} onChange={handleChange} required />

                <label>Företagsnummer:</label>
                <input type="text" name="companyNumber" value={customer.companyNumber} onChange={handleChange} required />

                <button className="SaveChangesBtn" type="submit">Spara ändringar</button>
            </form>
        </div>
    );
};

export default EditCustomer;
