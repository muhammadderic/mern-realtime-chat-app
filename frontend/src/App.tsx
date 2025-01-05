import { Navigate, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route
          path='/signup'
          element={authUser ? <Navigate to='/' /> : <SignupPage />}
        />
        <Route
          path='/login'
          element={authUser ? <Navigate to='/' /> : <LoginPage />}
        />
        {/* catch all routes */}
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
    </div>
  )
}

export default App
