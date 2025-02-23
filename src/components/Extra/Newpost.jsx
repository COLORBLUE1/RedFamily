import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Contenedormain } from "../../assets/style/stylecomponets/styled.js";
import styled from "styled-components";
import { NavBarDef } from "../Home/NavBarDef.jsx";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebaseConfig.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Div = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Newpost = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userEmail = userData?.email;

  useEffect(() => {
    const fetchAuthorId = async () => {
      if (!userEmail) return;
      
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setAuthorId(userData.id);
      } else {
        console.log("No se encontró el usuario con ese email");
      }
    };

    fetchAuthorId();
  }, [userEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authorId) {
      alert("No se encontró el ID del autor. Por favor, inténtalo de nuevo.");
      return;
    }

    const newPost = {
      content,
      authorId,
      postId: `postId${Date.now()}`,
    };

    if (file) {
      setLoading(true); // Indicamos que estamos cargando
      const storage = getStorage();
      const storageRef = ref(storage, `posts/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newPost.imageUrl = downloadURL;
      } catch (error) {
        console.error("Error al subir el archivo:", error.message);
        alert("No se pudo subir la imagen. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }
    }

    try {
      await addDoc(collection(firestore, "posts"), newPost);
      setContent("");
      setFile(null);
      navigate("/home");
    } catch (error) {
      console.error("Error al agregar el post:", error.message);
      alert("Ocurrió un error al publicar el post. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Al finalizar la publicación, dejamos de mostrar el loading
    }
  };

  return (
    <Contenedormain>
      <Div>
        <h2>Comparte tus mejores momentos</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="¿Qué estás pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <input
            type="file"
            label="Subir archivo"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading} // Deshabilitamos el botón mientras se sube el post
          >
            {loading ? "Publicando..." : "Publicar"}
          </Button>
        </form>
      </Div>
      <NavBarDef />
    </Contenedormain>
  );
};
