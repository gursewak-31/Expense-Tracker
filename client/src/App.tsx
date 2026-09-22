// import tailwindcss from '@tailwindcss/vite'
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import AddExpense from './pages/addExpense';
import AllExpenses from "./pages/allExpense";
import Profile from './pages/profile';
import AccountSettings2 from './pages/accountSettings2';
import AccountSettings from './pages/accountSettings';
import ProtectedRoute from './components/protectedRoute';
import UserProvider from './context/userContext';
import Layout from './components/Layout';

function App() {

  return (
    <>
      <UserProvider>
        <Routes>
            <Route path='/login' element = {<Login/>} />
            <Route path='/signup' element = {<SignUp/>} />
            <Route element = {<ProtectedRoute/>}>
              <Route element = {<Layout/>}>
                <Route path='/' element = {<Navigate to = "/dashboard" />} />
                <Route path='/dashboard' element = {<Dashboard/>} />
                <Route path='/profile' element = {<Profile/>} />
                <Route path='/addExpense' element = {<AddExpense/>}></Route>
                <Route path='/allExpenses' element = {<AllExpenses/>}></Route>
                <Route path='/AccountSettings2' element = {<AccountSettings2/>}></Route>
                <Route path='/AccountSettings' element = {<AccountSettings/>}></Route>
              </Route>
            </Route>
          </Routes>
      </UserProvider>
    </>
  )
}

export default App
