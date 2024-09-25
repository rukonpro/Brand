import React from "react";

const AdminDashboard = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
            {/* Add your dashboard widgets or content here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                    <p className="text-gray-600 dark:text-slate-400">$15,230</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                    <p className="text-gray-600 dark:text-slate-400">1,234</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                    <p className="text-gray-600 dark:text-slate-400">563</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                    <p className="text-gray-600 dark:text-slate-400">View Detailed Report</p>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;