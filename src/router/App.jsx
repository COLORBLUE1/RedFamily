import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "../components/SplasScreen.jsx";
import { Home } from "../components/Home.jsx";
import { Ajustecuenta } from "../components/Home/Ajustescuenta.jsx";
import { Buscar } from "../components/Home/Buscar.jsx";
import { Singing } from "../components/singin.jsx";
import { Signun } from "../components/singun.jsx";
import { Map } from "../components/Map.jsx";
import { Perfil } from "../components/Extra/Perfil.jsx";
import { Perfil_all } from "../components/Blocks/Perfil_all.jsx";
import { Notificaciones } from "../components/Extra/Notificaciones/Notificaciones.jsx";
import { Ajustesmap } from "../components/Home/Ajustesmap.jsx";
import { Landing } from "../components/Landing/Landing.tsx";
import { Newpost } from "../components/Extra/Newpost.jsx";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rutas antes del Home*/}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signin" element={<Singing />} />
        <Route path="/signun" element={<Signun />} />

        {/*Ruta de error
        <Route path="*" element={<Error />} />*/}

        {/*Ruta al home*/}
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Rutas del home */}
      <Routes>
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/newpost" element={<Newpost />} />
      </Routes>
      {/*Rutas extra*/}
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<Perfil_all />} />
        <Route path="/ajustesmap" element={<Ajustesmap />} />
        <Route path="/ajustecuenta" element={<Ajustecuenta />} />
      </Routes>
    </BrowserRouter>
  );
}
