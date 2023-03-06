import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


// style sheets
import './stylesheets/alignments.css'
import './stylesheets/sizes.css'
import './stylesheets/form-elements.css'
import './stylesheets/custom.css'
import './stylesheets/theme.css'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import TheatresForMovie from './pages/TheatresForMovie'
import BookShow from './pages/BookShow'
//
function App() {
    const { loading } = useSelector(state=>state.loaders)
  return (
    <div>
    {loading && (
        <div className='loader-parent'><div className="loader"></div></div>
    )}
        <BrowserRouter>
            <Routes>
                <Route exact='true' path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
                <Route exact='true' path='/movie/:id' element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>}/>
                <Route exact='true' path='/book-show/:id' element={<ProtectedRoute><BookShow /></ProtectedRoute>}/>
                <Route exact='true' path='/login' element={<Login />}/>
                <Route exact='true' path='/register' element={<Register />}/>
                <Route exact='true' path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
                <Route exact='true' path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
