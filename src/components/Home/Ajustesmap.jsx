import { TbPencil } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { Button } from "@mui/material";
import { Contenedormenumap, Contenido, Option, Sectionhome } from "../../assets/style/stylecomponets/styled";
import styled from "styled-components";
import { Header } from "../Blocks/Header";

// Botón personalizado
const Boton = styled.button`
  width: 100%;
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #c8f3f4;
  border: none;
  border-radius: 10px;
  color: gray;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
`;

export const Ajustesmap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cityactual = localStorage.getItem("userLocation"); // Obtener ciudad actual

  // Función para manejar la autenticación y la navegación
  const handleAuth = async (provider) => {
    try {
      switch (provider) {
        case "Map":
          navigate("/ajustesmap"); // Navegar a ajustes del mapa
          break;
        case "Facebook":
          // Aquí puedes integrar la lógica de login con Facebook si es necesario
          const user = await facebookLogin();
          if (user) {
            dispatch(setUser(user)); // Disparar acción de usuario
            navigate("/home"); // Redirigir a la página principal
          }
          break;
        case "Salir":
          await logout(); // Llamada para cerrar sesión
          dispatch(logout()); // Asegurarse de que el estado de Redux también se actualice
          navigate("/signin"); // Redirigir a la página de login
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error during social login", error); // Manejo de errores
    }
  };

  return (
    <Sectionhome>
      <Header volver="/home" />
      <Contenedormenumap>
        {/* Imagen con animación */}
        <img
          className="animate__animated animate__pulse"
          src="https://i.postimg.cc/HntT2xgP/map.png"
          alt="Mapa"
        />
        
        {/* Opción para mostrar la ciudad actual */}
        <Option>
          <Contenido>{cityactual || "Ubicación no disponible"}</Contenido>
          <TbPencil aria-label="Editar ubicación" />
        </Option>

        {/* Botones de recordatorio de entrenamiento */}
        <Button
          variant="contained"
          sx={{
            width: 320,
            lineHeight: 1,
            height: 40,
            background: "#eaf5f5",
            borderRadius: 10,
            margin: 2,
            color: "#878686",
          }}
          disableElevation
        >
          Workout reminder
        </Button>

        <Button
          variant="contained"
          sx={{
            width: 320,
            lineHeight: 1,
            height: 40,
            background: "#eaf5f5",
            borderRadius: 10,
            margin: 2,
            color: "#878686",
          }}
          disableElevation
        >
          Workout reminder
        </Button>

        {/* Botón para guardar */}
        <Boton onClick={() => handleAuth("Map")}>Guardar</Boton>
      </Contenedormenumap>
    </Sectionhome>
  );
};
