import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserLayout from './user/UserLayout';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/components/Login/AdminLogin';
import Home from './user/components/Home/Home'
import About from './user/components/About/About';
import Login from './user/components/Login/Login';
import RequireAuth from './admin/components/RequireAuth';
import Dashboard from './admin/components/Dashboard/Dashboard';
import Events from './admin/components/Events/Events';
import Notifications from './admin/components/Notifications/Notifications';
import Settings from './admin/components/Settings/Settings';
import UserEvents from './user/components/Events/UserEvents';
import { UserInfoProvider } from './context/UserInfoProvider';
import Profile from './user/components/Profile/Profile';
import { EventProvider } from './context/EventProvider';
function App() {
  return (
   <>
  <UserInfoProvider>
  <EventProvider>
  <Routes>
    <Route path = "/" element = {<UserLayout/>}>
          <Route index element = {<Home/>} />
          <Route path = "profile" element = {<Profile/>} />
          <Route path = "event" element = {<UserEvents/>} />
          <Route path = "about" element = {<About/>}/>
          <Route path = "login" element = {<Login/>} />
        </Route>      
      <Route path = "/adminlogin" element = {<AdminLogin/>}/>
      <Route element = {<RequireAuth/>}>
        <Route path = "/admin" element = {<AdminLayout/>}>
          <Route index element = {<Dashboard/>}/>
          <Route path = "events" element = {<Events/>}/>
          <Route path = "notifications" element = {<Notifications/>}/>
          <Route path = "settings" element = {<Settings/>}/>
        </Route>
      </Route>
    </Routes>
    </EventProvider>
  </UserInfoProvider>
   
    
   </>
  );
}

export default App;
