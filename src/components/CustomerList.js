import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5209/api/customers");
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("❌ Fel vid hämtning av kunder:", error);
        }
    };

    const deleteCustomer = async (id) => {
        const confirmDelete = window.confirm("Är du säker på att du vill radera denna kund?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5209/api/customers/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`🗑️ Kund med ID ${id} raderad.`);
                fetchCustomers();
            } else {
                console.error("❌ Misslyckades att radera kunden.");
            }
        } catch (error) {
            console.error("⚠️ Fel vid borttagning av kund:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div className="CustomerListContainer">
            <h2>Kundlista</h2>
            <ul>
                {customers.map((customer) => (
                    <li className="CustomerList" key={customer.id}>
                        {customer.companyName} ({customer.firstName} {customer.lastName}) - {customer.address} 

                        <Link to={`/edit-customer/${customer.id}`}>
                            <button className="EditBtn">Redigera</button>
                        </Link>

                        <button className="DeleteBtn" onClick={() => deleteCustomer(customer.id)}>
                            🗑️ Radera
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;