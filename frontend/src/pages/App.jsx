//import Home from "./Home";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Add from "./Add.jsx";
import View from "./View.jsx";
import Admin from "./Admin.jsx";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Add' element={<Add/>}></Route>
      <Route path='/View' element={<View/>}></Route>
      <Route path='/Admin' element={<Admin/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
