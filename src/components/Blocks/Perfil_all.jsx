import { useEffect, useState } from "react";
import { Header } from "./Header";
import { imgpruebas, portada } from "../const";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef";
import ImageGallery from "./ImageGallery";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig";
import { query, where, getDocs, collection, updateDoc } from "firebase/firestore";

// Botón estilizado
export const Boton = styled.button`
  width: clamp(11.25rem, 6.786rem + 11.905vw, 17.5rem);
  height: 50px;
  font-size: clamp(1.25rem, 0.804rem + 1.19vw, 1.875rem);
  text-align: center;
  padding: 10px;
  background-color: #ff7674;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 20px;
  transition: all 0.3s ease-in-out;
`;

const Sectioncontenido = styled.section`
  width: 100%;
  height: auto;
  background: #ffffff85;
  border-radius: 25px 25px 0 0;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Contenedoruser = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Contenedorall = styled.section`
  position: relative;
  top: 50px;
  background-color: transparent;
  height: 100vh;
  width: clamp(25rem, 16.071rem + 23.81vw, 37.5rem);
  overflow-y: auto;
  margin: auto;
  border-radius: 40px;
  font-family: Roboto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Contenedorbotones = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
`;

const Follow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  div {
    display: grid;
    justify-items: center;
    strong {
      color: #fff;
    }

    p {
      margin: 0;
      color: gray;
    }
  }
`;

const Avataruser = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  div:nth-child(2) {
    display: grid;
    align-items: center;

    p {
      margin: 0;
      color: gray;
    }
  }
`;

export const Perfil_all = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserProfile(userData);
          setIsFollowing(userData.followers.includes(id)); // Verificamos si el usuario ya sigue a este usuario
        } else {
          console.log("No se encontró el usuario en la colección.");
        }
      } catch (error) {
        console.error("Error al obtener el perfil de usuario:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleFollow = async () => {
    if (userProfile) {
      const userRef = collection(firestore, "users");
      const userDocRef = userProfile.id;

      try {
        // Realizamos la consulta para obtener el documento del usuario.
        const q = query(userRef, where("id", "==", userDocRef));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error("No se encontró el documento del usuario.");
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const newFollowers = isFollowing
          ? userProfile.followers.filter((followerId) => followerId !== userDocRef)
          : [...userProfile.followers, userDocRef];

        // Actualizamos los seguidores.
        await updateDoc(userDoc.ref, {
          followers: newFollowers,
        });

        // Actualizamos el estado local
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          followers: newFollowers.length,
        }));

        // Cambiar el estado de seguimiento
        setIsFollowing(!isFollowing);

        console.log("Seguidores actualizados correctamente");
      } catch (error) {
        console.error("Error al actualizar los seguidores:", error);
      }
    }
  };

  return (
    <Contenedorall>
      {/* Header y portada */}
      <section style={{ width: "100%", height: 150, overflow: "hidden" }}>
        <Header volver="/home" app="Perfil" />
        <img
          style={{ width: "100%", height: 150, objectFit: "cover" }}
          src={portada}
          alt="Portada de usuario"
        />
      </section>

      {/* Contenido del perfil */}
      <section style={{ padding: 20 }}>
        <Contenedoruser>
          {/* Avatar y Descripción */}
          <Avataruser>
            <div>
              <Avatar
                alt={userProfile?.name || "Usuario"}
                src={userProfile?.profilePic || imgpruebas}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            <div>
              <strong>{userProfile?.name || "Usuario"}</strong>
              <p>{userProfile?.bio || "Descripción"}</p>
            </div>
          </Avataruser>

          {/* Seguidores */}
          <Follow>
            <div>
              <strong>Seguidores</strong>
              <p>{userProfile?.followers.length || "0"}</p>
            </div>
            <div>
              <strong>Seguidos</strong>
              <p>{userProfile?.following || "0"}</p>
            </div>
          </Follow>
        </Contenedoruser>

        {/* Botón para seguir o dejar de seguir */}
        <Contenedorbotones>
          <Boton onClick={handleFollow}>
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </Boton>
        </Contenedorbotones>
      </section>

      {/* Galería de imágenes */}
      <Sectioncontenido>
        <ImageGallery autoridP={id} />
      </Sectioncontenido>

      {/* Barra de navegación */}
      <NavBarDef />
    </Contenedorall>
  );
};
