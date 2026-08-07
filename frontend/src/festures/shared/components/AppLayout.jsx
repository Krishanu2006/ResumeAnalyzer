import React from "react";
import { Outlet } from "react-router";
import Header from "./Header.jsx";

const AppLayout = () => {
    return (<div className="app-layout"> <Header />
        <main className="app-layout__content">
            <Outlet />
        </main>
    </div>
    );
};

export default AppLayout;
