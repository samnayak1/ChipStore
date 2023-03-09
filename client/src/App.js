
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Views/Home' 
import { Suspense } from 'react';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Suspense fallback={<h1>...Loading</h1>}>
        <Routes>
          <Route path="/trending" element={<Home/>} />
        </Routes>

        </Suspense>
     
     </BrowserRouter>
     </div>
    
  );
}

export default App;
