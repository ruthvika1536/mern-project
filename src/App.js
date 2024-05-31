import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector} from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyTrainer from './pages/ApplyTrainer';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Trainers from './pages/admin/Trainers';
import Profile from './pages/trainer/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import TrainerAppointments from './pages/trainer/TrainerAppointments';
function App() {
  const {loading} =useSelector(state=>state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading?(
      <Spinner/>
      ):(
        <Routes>
        
        <Route path='/apply-trainer' 
        element={
        <ProtectedRoute>
          <ApplyTrainer/>
        </ProtectedRoute>
        } />
        <Route path='/admin/users' 
        element={
        <ProtectedRoute>
          <Users/>
        </ProtectedRoute>
        } />
        <Route path='/admin/trainers' 
        element={
        <ProtectedRoute>
          <Trainers/>
        </ProtectedRoute>
        } />
        <Route path='/trainer/profile/:id' 
        element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
        } />
        <Route path='/trainer/book-appointment/:trainerId' 
        element={
        <ProtectedRoute>
          <BookingPage/>
        </ProtectedRoute>
        } />
        <Route path='/notification' 
        element={
        <ProtectedRoute>
          <NotificationPage/>
        </ProtectedRoute>
        } />
        <Route path='/login' 
        element={
        <PublicRoute>
        <Login/>
        </PublicRoute>
        }/>
        <Route path='/register' 
        element={
        <PublicRoute>
        <Register/>
        </PublicRoute>
        }/>
        <Route path='/appointments' 
        element={
        <ProtectedRoute>
        <Appointments/>
        </ProtectedRoute>
        }/>
        <Route path='/trainer-appointments' 
        element={
        <ProtectedRoute>
        <TrainerAppointments/>
        </ProtectedRoute>
        }/>
        <Route path='/' 
        element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>
        } />
      </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
