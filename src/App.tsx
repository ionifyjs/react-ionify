import './styles.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Navigate to='/' replace />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
