import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {

    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    
    return (
        <div>
            <h2>Dashboard Home</h2>
        </div>
    );
};

export default DashboardHome;