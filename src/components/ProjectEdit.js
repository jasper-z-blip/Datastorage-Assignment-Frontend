import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectEdit = () => {
    const { id } = useParams();
    const [project, setProject] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        customerId: "",
        productId: "",
        statusId: "",
        userId: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5209/api/projects/${id}`)
            .then(response => response.json())
            .then(data => {
                setProject({
                    title: data.title || "",
                    description: data.description || "",
                    startDate: data.startDate || "",
                    endDate: data.endDate || "",
                    customerId: data.customerId || "",
                    productId: data.productId || "",
                    statusId: data.statusId || "",
                    userId: data.userId || ""
                });
            })
            .catch(error => console.error("Error fetching project:", error));
    }, [id]);

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5209/api/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            console.error("Error updating project:", response.statusText);
        } else {
            alert("Project was updated!");
        }
    };

    return (
        <div>
            <h2>Handle Project</h2>
            <form onSubmit={handleSubmit}>
                <label>Titel:</label>
                <input type="text" name="title" value={project.title} onChange={handleChange} required />

                <label>Description:</label>
                <input type="text" name="description" value={project.description} onChange={handleChange} />

                <label>Startdate:</label>
                <input type="date" name="startDate" value={project.startDate} onChange={handleChange} required />

                <label>Enddate:</label>
                <input type="date" name="endDate" value={project.endDate} onChange={handleChange} required />

                <label>Customer ID:</label>
                <input type="number" name="customerId" value={project.customerId} onChange={handleChange} required />

                <label>Product ID:</label>
                <input type="number" name="productId" value={project.productId} onChange={handleChange} required />

                <label>Status ID:</label>
                <input type="number" name="statusId" value={project.statusId} onChange={handleChange} required />

                <label>User ID:</label>
                <input type="number" name="userId" value={project.userId} onChange={handleChange} required />

                <button type="submit">Spara ändringar</button>
            </form>
        </div>
    );
};

export default ProjectEdit;