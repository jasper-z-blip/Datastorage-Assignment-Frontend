import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateProject from './components/CreateProject';
import ProjectList from './components/ProjectList';
import ProjectEdit from './components/ProjectEdit';
import ProjectDetails from './components/ProjectDetails';
import CustomerPage from './components/CustomerPage';
import EditCustomer from './components/EditCustomer';
import NoAccessPage from './components/NoAccessPage';
import './index.css';
import './styles.css';

function App() {
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);

    const location = useLocation();

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
            <h1 className='HeadLine'>Mattin-Lassei Group AB</h1>
            {location.pathname !== "/" && location.pathname !== "/no-access" && (
            <nav>
                <Link to="/projects">Projektlista</Link> | 
                <Link to="/create">Skapa nytt Projekt</Link> | 
                <Link to="/customers">Skapa och hantera kunder</Link> 
            </nav>
            )}

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/no-access" element={<NoAccessPage />} />
                <Route path="/projects" element={<ProjectList projects={projects} refreshProjects={fetchProjects} />} />
                <Route path="/create" element={<CreateProject refreshProjects={fetchProjects} />} />
                <Route path="/edit/:id" element={<ProjectEdit refreshProjects={fetchProjects} />} />
                <Route path="/project/:id" element={<ProjectDetails refreshProjects={fetchProjects} />} />
                <Route path="/customers" element={<CustomerPage customers={customers} refreshCustomers={fetchCustomers} />} />
                <Route path="/edit-customer/:id" element={<EditCustomer />} />
            </Routes>
        </div>
    );
}

export default App;