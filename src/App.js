import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateProject from './components/CreateProject';
import ProjectList from './components/ProjectList';
import ProjectEdit from './components/ProjectEdit';
import ProjectDetails from './components/ProjectDetails';
import CustomerPage from './components/CustomerPage';
import './index.css';
import './styles.css';

function App() {
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch("http://localhost:5209/api/projects");
            const data = await response.json();
            console.log("Uppdaterad projektlista:", data);
            setProjects(data);
        } catch (error) {
            console.error("❌ Fel vid hämtning av projekt:", error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5209/api/customers");
            const data = await response.json();
            console.log("Uppdaterad kundlista:", data);
            setCustomers(data);
        } catch (error) {
            console.error("❌ Fel vid hämtning av kunder:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Mattin-Lassei Group AB</h1>
            <nav>
                <Link to="/">Projektlista</Link> | 
                <Link to="/create">Skapa nytt Projekt</Link> | 
                <Link to="/customers">Skapa och hantera kunder</Link> 
            </nav>

            <Routes>
                <Route path="/" element={<ProjectList projects={projects} refreshProjects={fetchProjects} />} />
                <Route path="/create" element={<CreateProject refreshProjects={fetchProjects} />} />
                <Route path="/edit/:id" element={<ProjectEdit refreshProjects={fetchProjects} />} />
                <Route path="/project/:id" element={<ProjectDetails refreshProjects={fetchProjects} />} />
                <Route path="/customers" element={<CustomerPage customers={customers} refreshCustomers={fetchCustomers} />} />
            </Routes>
        </div>
    );
}

export default App;