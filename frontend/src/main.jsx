import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './views/Home.jsx'
import NotFound from './views/NotFound.jsx'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router"; 

createRoot(document.getElementById('root')).render
(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
);
