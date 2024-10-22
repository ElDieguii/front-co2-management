import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './hooks/ProtectedContext';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import CreateCompany from './Pages/companies/CreateCompany';
import Company from './Pages/Company';
import DashBoard from './Pages/Dashboard';
import InitialAdmin from './Pages/initial/InitialAdmin';
import InitialUser from './Pages/initial/InitialUser';
import Measure from './Pages/Measure';
import Pricing from './Pages/Pricing';
import Report from './Pages/Report';
import Scope1 from './Pages/scopes/Scope1';
import Scope2 from './Pages/scopes/Scope2';
import Scope3 from './Pages/scopes/Scope3';
import Profile from './Pages/settings/Profile';
import SupplierManage from './Pages/settings/SupplierManage';
import TaskManage from './Pages/settings/TaskManage';
import UserManage from './Pages/settings/UserManage';
import NavBarNewUI from './components/SideBar/NavBarNewUI';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            overflow: 'auto',
            display: 'flex',
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<NavBarNewUI children={<Outlet />} />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/company" element={<Company />} />
                <Route path="/scope1" element={<Scope1 />} />
                <Route path="/scope2" element={<Scope2 />} />
                <Route path="/scope3" element={<Scope3 />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/measure" element={<Measure />} />
                <Route path="/report" element={<Report />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/supplier-management" element={<SupplierManage />} />
                <Route path="/user-management" element={<UserManage />} />
                <Route path="/task-management" element={<TaskManage />} />
                <Route path="/create-company" element={<CreateCompany />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/" element={<Company />} />
              </Route>
              <Route path="/initial-user" element={<InitialUser />} />
              <Route path="/initial-admin" element={<InitialAdmin />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
