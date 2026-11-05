// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
//     const { user } = useSelector((state) => state.auth);
//     const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
//     const isSeller = user && user?.roles.includes("ROLE_SELLER");
//     const location = useLocation();

//     if (publicPage) {
//         return user ? <Navigate to="/" /> : <Outlet />
//     }

//     if (adminOnly) {
//         if (isSeller && !isAdmin) {
//             const sellerAllowedPaths = ["/admin/orders", "/admin/products"];
//             const sellerAllowed = sellerAllowedPaths.some(path => 
//                 location.pathname.startsWith(path)
//             );
//             if (!sellerAllowed) {
//                 return <Navigate to="/" replace />
//             }
//         }
//     }

//     if (!isAdmin && !isSeller) {
//         return <Navigate to="/"/>
//     }
    
//     return user ? <Outlet /> : <Navigate to="/login" />;
// }

// export default PrivateRoute



import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    const isAdmin = user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user?.roles?.includes("ROLE_SELLER");

    // Login and Register pages
    if (publicPage) {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    // User must be logged in for protected pages
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Admin and Seller routes
    if (adminOnly) {
        if (isAdmin) {
            return <Outlet />;
        }

        if (isSeller) {
            const sellerAllowedPaths = [
                "/admin/orders",
                "/admin/products"
            ];

            const sellerAllowed = sellerAllowedPaths.some(path =>
                location.pathname.startsWith(path)
            );

            return sellerAllowed ? <Outlet /> : <Navigate to="/" replace />;
        }

        return <Navigate to="/" replace />;
    }

    // Normal logged-in customers can access checkout
    return <Outlet />;
};

export default PrivateRoute;
