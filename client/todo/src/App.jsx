import { useCallback, useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './components/Login';
import AuthContext from './context/AuthProvider';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Todo from './components/Todo';

function App() {
  const { auth } = useContext(AuthContext);
  // console.log(auth)

  return (
    <main className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
           <Route path="/todo" element={<Todo></Todo>} ></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App
