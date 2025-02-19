import React, { useState, useEffect } from "react";

const CreateProject = ({ refreshProjects }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("Auto-generated description");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [statusId, setStatusId] = useState(1);
    const [productId, setProductId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [projectNumber, setProjectNumber] = useState(""); // Backend genererar numret
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);

    // 📌 Kostnad per dag baserat på produkt (developer-nivå)
    const productRates = {
        1: 4000, // Junior Developer
        2: 6000, // Midlevel Developer
        3: 9600, // Senior Developer
    };

    // 📌 Funktion för att räkna endast **arbetsdagar** (måndag-fredag)
    const computeBusinessDays = (start, end) => {
        let date = new Date(start);
        let endDate = new Date(end);
        let businessDays = 0;

        while (date <= endDate) {
            const dayOfWeek = date.getDay(); // 0 = Söndag, 6 = Lördag
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                businessDays++;
            }
            date.setDate(date.getDate() + 1); // Gå till nästa dag
        }

        return businessDays;
    };

    // 📌 Beräkna totalpriset baserat på **arbetsdagar** och **produkt**
    const totalPrice =
        startDate && endDate && productId
            ? computeBusinessDays(startDate, endDate) * (productRates[Number(productId)] || 0)
            : 0;

    useEffect(() => {
        fetch("http://localhost:5209/api/customers")
            .then((res) => res.json())
            .then((data) => setCustomers(data))
            .catch((error) => console.error("❌ Kunde inte hämta kunder:", error));

        fetch("http://localhost:5209/api/projects/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("❌ Kunde inte hämta produkter:", error));
    }, []);

    const handleSubmit = async () => {
        const projectData = {
            title,
            description,
            startDate,
            endDate,
            statusId,
            customerId,
            productId,
        };

        console.log("Skickar detta till API:", projectData);

        try {
            const response = await fetch("http://localhost:5209/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                alert("Projekt skapat!");
                refreshProjects();
            } else {
                console.error("❌ Fel vid skapande av projekt:", await response.text());
            }
        } catch (error) {
            console.error("❌ API-fel:", error);
        }
    };

    return (
        <div className="CreateProjectForm">
            <h2>Skapa nytt projekt</h2>

            <input
                type="text"
                placeholder="Projektets namn"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="Projektnummer (genereras automatiskt)"
                value={projectNumber}
                readOnly
                onClick={() => alert("Projektnummer genereras automatiskt och kan inte ändras!")}
                style={{ cursor: "not-allowed", backgroundColor: "#f0f0f0" }}
            />

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <select value={statusId} onChange={(e) => setStatusId(e.target.value)}>
                <option value="1">Ej påbörjat</option>
                <option value="2">Pågående</option>
                <option value="3">Avslutat</option>
            </select>

            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                <option value="">Välj kund</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.companyName} ({customer.firstName} {customer.lastName})
                    </option>
                ))}
            </select>

            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
                <option value="">Välj Service</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>

            <p>Totalpris: {totalPrice} kr</p>

            <button className="CreateProjectBtn" onClick={handleSubmit}>
                Skapa projekt
            </button>
        </div>
    );
};

export default CreateProject;

