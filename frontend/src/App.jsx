import { BrowserRouter,Routes,Route } from 'react-router-dom';
import GetDeleteComponent from './components/GetDeleleComponent';
import AddUpdateComponent from './components/AddUpdateComponent';
function App() {
  return (
    <BrowserRouter>
    <Routes>   
       <Route  path='/' element={<GetDeleteComponent/>}></Route> 
       <Route  path='/add' element={<AddUpdateComponent/>}></Route>
       <Route  path='/edit/:id' element={<AddUpdateComponent/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
