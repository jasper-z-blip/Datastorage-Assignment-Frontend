import React, { useState } from "react";
import CreateCustomer from "./CreateCustomer";
import CustomerList from "./CustomerList";

const CustomerPage = () => {
    const [refresh, setRefresh] = useState(false);

    const refreshCustomers = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <div>
            <h1>Hantera Kunder</h1>
            <CreateCustomer refreshCustomers={refreshCustomers} />
            <CustomerList key={refresh} refreshCustomers={refreshCustomers} />
        </div>
    );
};

export default CustomerPage;