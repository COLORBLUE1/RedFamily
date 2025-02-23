import { useEffect, useState } from "react";
import styled from "styled-components";
import { Contenedormain } from "../../../assets/style/stylecomponets/styled";
import { Header } from "../../Blocks/Header";
import { NavBarDef } from "../../Home/NavBarDef";

const Contenedornoty = styled.div`
  font-family: Raleway;
  width: 100%;
  height: auto;
  display: grid;
  justify-items: center;
  align-content: center;
  margin-top: 50px;
`;

const NotificationCard = styled.div`
  background: #eaf5f5;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NoNotificationsText = styled.p`
  font-size: 1.2rem;
  color: #888;
  text-align: center;
`;

export function Notificaciones() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Añadido para manejar el estado de carga.

  useEffect(() => {
    // Simulando las notificaciones, puedes reemplazar esto por un fetch real
    const welcomeNotification = "¡Bienvenido a nuestra aplicación!";
    const loginNotification = "¡Has iniciado sesión exitosamente!";

    // Simulando la llegada de notificaciones
    setNotifications([welcomeNotification, loginNotification]);

    // Limpiar las notificaciones después de un tiempo (opcional)
    const timer = setTimeout(() => {
      setNotifications([]); // Eliminar las notificaciones después de 10 segundos
    }, 10000);

    setLoading(false); // Terminar el estado de carga

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  return (
    <Contenedormain>
      <Header volver="/home" app="Notificaciones" />
      <Contenedornoty>
        {loading ? (
          <p>Cargando notificaciones...</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationCard key={index}>
              {notification}
            </NotificationCard>
          ))
        ) : (
          <NoNotificationsText>No hay notificaciones.</NoNotificationsText>
        )}
      </Contenedornoty>
      <NavBarDef />
    </Contenedormain>
  );
}
