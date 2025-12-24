import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Home/HomePage/Homepage";
import Covarage from "../pages/Covarage/Covarage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthRelated/Login/Login";
import Register from "../pages/AuthRelated/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendPercel from "../pages/SendPercel/SendPercel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApprovedRiders/ApprovedRiders";

import AdminRoute from "./AdminRoute";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [

        {
            index: true, 
            Component: Homepage,
        },

        {
          path: "rider",
          element: <PrivateRoute><Rider></Rider></PrivateRoute>,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        },

        {
          path: "send-parcel",
          element: <PrivateRoute><SendPercel></SendPercel></PrivateRoute>,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())


        },

        {
          path: "coverage",
          Component: Covarage,
          loader: () => fetch('/serviceCenter.json').then(res => res.json())
        },

        {
          path: 'parcel-track/:trackingId',
          Component: ParcelTrack
        }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [

      {
        path: "login",
        Component: Login

      },


      {
        path: "register",
        Component: Register

      }
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [

      {
        index: true,
        Component: DashboardHome
      },

      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },

      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },

      {
        path: "payment-history",
        Component: PaymentHistory
      },

      // Rider only route

      {
        path: "assigned-deliveries",
        element: <RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>

      },
      {
        path: "completed-deliveries",
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>

      },

      // Admin only route
      {
        path: 'approve-riders',
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>,
        // Component: ApproveRiders,
      },
      {
        path: "assign-riders",
        element:<AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      },

      {
        path: 'users-management',
        // Component: UsersManagement
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },

      
    ]
  }
]);