import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetails = ({ refreshProjects }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // 🔹 Statusalternativ
    const statusOptions = [
        { id: 1, name: "Ej påbörjat" },
        { id: 2, name: "Pågående" },
        { id: 3, name: "Avslutat" }
    ];

    useEffect(() => {
        fetch(`http://localhost:5209/api/projects/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Hämtad projektinfo:", data);
                setProject(data);
                setFormData({
                    id: Number(data.id),
                    projectNumber: data.projectNumber || "P-000", 
                    title: data.title || "",
                    description: data.description || "",
                    startDate: data.startDate?.split("T")[0] || "", 
                    endDate: data.endDate?.split("T")[0] || "", 
                    customerId: Number(data.customerId) || 1,
                    productId: Number(data.productId) || 1,
                    statusId: Number(data.statusId) || 1,
                    userId: Number(data.userId) || 1
                });
            })
            .catch(error => console.error("❌ Fel vid hämtning av projekt:", error));
    }, [id, refreshProjects]);    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData({
            ...formData,
            [name]: name.includes("Id") ? Number(value) : value
        });
    };       

    const updateProject = async () => {
        try {
            console.log("Data före API-anrop:", JSON.stringify(formData, null, 2));
    
            const updatedData = { ...formData };
    
            delete updatedData.statusName;
    
            console.log("Data som skickas till API:", JSON.stringify(updatedData, null, 2));
    
            const response = await fetch(`http://localhost:5209/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                alert("Projektet har uppdaterats!");
                const updatedResponse = await fetch(`http://localhost:5209/api/projects/${id}`);
                const updatedProject = await updatedResponse.json();
                setProject(updatedProject);
                setIsEditing(false);
                refreshProjects();
            } else {
                const errorText = await response.text();
                alert(`Misslyckades med att uppdatera projekt: ${errorText}`);
                console.error("API-fel, status:", response.status, "Svar:", errorText);
            }
        } catch (error) {
            console.error("❌ Fel vid uppdatering av projekt:", error);
        }
    };    
    
    const deleteProject = async () => {
        const confirmDelete = window.confirm("Är du säker på att du vill ta bort detta projekt?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5209/api/projects/${id}`, { method: "DELETE" });

            if (response.ok) {
                alert("Projektet har tagits bort!");
                refreshProjects();
                navigate("/");
            } else {
                alert("Något gick fel vid borttagning.");
            }
        } catch (error) {
            console.error("❌ Fel vid borttagning av projekt:", error);
        }
    };

    if (!project) {
        return <p>⏳ Laddar projekt...</p>;
    }

    return (
        <div>
            <h2>Projekt: {project.projectNumber} - {project.title}</h2>

            {isEditing ? (
                <div>
                    <label>Projektnummer:</label>
                    <input type="text" value={project.projectNumber} disabled />

                    <label>Titel:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />

                    <label>Beskrivning:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />

                    <label>Startdatum:</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />

                    <label>Slutdatum:</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

                    <label>Status:</label>
                    <select name="statusId" value={formData.statusId} onChange={handleChange}>
                        {statusOptions.map((option) => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                    </select>

                    <label>Totalpris:</label>
                    <input type="text" value={project.totalPrice + " kr"} disabled />

                    <br />
                    <button onClick={updateProject} style={{ backgroundColor: "green", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
                        Spara ändringar
                    </button>
                    <button onClick={() => setIsEditing(false)} style={{ marginLeft: "10px", padding: "10px", border: "none", cursor: "pointer" }}>
                        ❌ Avbryt
                    </button>
                </div>
            ) : (
                <div>
                    <p><strong>Beskrivning:</strong> {project.description || "Ingen beskrivning"}</p>
                    <p><strong>Startdatum:</strong> {project.startDate}</p>
                    <p><strong>Slutdatum:</strong> {project.endDate}</p>
                    <p><strong>Status:</strong> {project.status?.statusName || "Ingen status"}</p>
                    <p><strong>Totalpris:</strong> {project.totalPrice} kr</p>

                    <button onClick={() => setIsEditing(true)} style={{ backgroundColor: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
                        Redigera projekt
                    </button>
                    <button onClick={deleteProject} style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer", marginLeft: "10px" }}>
                        Ta bort projekt
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;