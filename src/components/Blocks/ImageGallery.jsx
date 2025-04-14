import React, { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";
const ImageGallery = ({ autoridP }) => {
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        const fetchUserPosts = async () => {
            const postsRef = collection(firestore, "posts");
            const q = query(postsRef, where("authorId", "==", autoridP));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postsData);
            }
            else {
                console.log("No posts found for this user!");
            }
        };
        fetchUserPosts();
    }, [autoridP]); // Dependencia de autoridP para volver a ejecutar cuando cambie
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };
    const handleClose = () => {
        setSelectedImage(null);
    };
    return (<Box className="animate__animated animate__fadeInUp" sx={{ p: 2 }}>
      <Masonry columns={{ xs: 2, sm: 2, md: 3 }} spacing={2}>
        {posts.map((post) => {
            const imageHeight = Math.random() > 0.5 ? 300 : 200; // Aleatorio para simular diferentes tamaños de imagen
            return (<Box key={post.id} sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: imageHeight,
                    cursor: "pointer",
                }} onClick={() => handleImageClick(post.imageUrl)} // Al hacer clic en la imagen, abrirla en el modal
            >
              <img src={post.imageUrl ||
                    "https://i.pinimg.com/564x/81/16/6d/81166dd8edf47f766426306fb4f51918.jpg" // Imagen predeterminada en caso de no tener una
                } alt="Post" style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}/>
            </Box>);
        })}
      </Masonry>

      {/* Modal para ver la imagen seleccionada */}
      <Modal open={!!selectedImage} onClose={handleClose} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255, 255, 255, 0.8)",
        }}>
        <Box sx={{
            position: "relative",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
        }}>
          <img src={selectedImage || ""} alt="Selected" style={{
            maxWidth: "80%",
            maxHeight: "70vh",
            borderRadius: "8px",
        }}/>
        </Box>
      </Modal>
    </Box>);
};
export default ImageGallery;
