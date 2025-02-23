// import styled from "styled-components";
// import { readAsync, setExercises } from "../../redux/slices/Post_users";
// import { useDispatch, useSelector } from "react-redux";
// import { Cards } from "./Cards_all";
// import { useEffect, useState } from "react";
// import { Boton } from "../../assets/style/stylecomponets/styled";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router";

// async function refreshStore(dispatch: any) {
//   console.log("Actualizando");
//   const response = await readAsync();
//   dispatch(setExercises(response));
// }

// // Función que maneja el clic en los botones para cambiar el estado
// const handleClick = (value: string, setSelectedValue: React.Dispatch<React.SetStateAction<string>>, setShowCreateButton: React.Dispatch<React.SetStateAction<boolean>>) => {
//   console.log("Valor del botón:", value);
//   setSelectedValue(value);
//   setShowCreateButton(value === "Myexercises");
// };

// // Estilos
// export const Contenedorsroll = styled.div`
//   margin: 10px;
//   display: flex;
//   overflow: hidden;
//   overflow-x: scroll;
//   width: 70vw;
//   padding: 30px;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// export const Contenedormainsroll = styled.div`
//   padding: 30px;
//   div {
//     display: flex;
//     gap: 10px;
//   }
// `;

// export const Opcionmain = styled.div`
//   display: flex;
//   gap: 10px;
//   justify-content: center;
//   background: #2e3562;
//   border-radius: 50px;
// `;

// export const Botoncrearcontent = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// export const Menuscroll = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedValue, setSelectedValue] = useState<string>("exercises");
//   const [showCreateButton, setShowCreateButton] = useState<boolean>(false);

//   useEffect(() => {
//     refreshStore(dispatch);
//   }, [dispatch]);

//   // Estilos reutilizables para los botones
//   const buttonStyle = {
//     minWidth: 150,
//     lineHeight: 1,
//     height: 40,
//     background: "#2E3562",
//     borderRadius: 10,
//   };

//   return (
//     <section>
//       <Contenedormainsroll>
//         <Opcionmain>
//           <Button
//             variant="contained"
//             sx={{ ...buttonStyle }}
//             disableElevation
//             onClick={() =>
//               handleClick("exercises", setSelectedValue, setShowCreateButton)
//             }
//           >
//             Discover
//           </Button>

//           <Button
//             variant="contained"
//             sx={{ ...buttonStyle, color: "gray" }}
//             disableElevation
//             onClick={() =>
//               handleClick("Myexercises", setSelectedValue, setShowCreateButton)
//             }
//           >
//             My workouts
//           </Button>
//         </Opcionmain>

//         <Contenedorsroll className="animate__animated animate__bounceIn">
//           {["All body", "Triceps", "Biceps", "Breast", "Back", "Legs"].map((muscle, index) => (
//             <Button
//               key={index}
//               variant="contained"
//               sx={{
//                 minWidth: muscle === "All body" ? 110 : 80,
//                 lineHeight: 1,
//                 height: 25,
//                 background: "#2E3562",
//                 borderRadius: 10,
//                 color: muscle === "All body" ? "white" : "gray",
//               }}
//               disableElevation
//               onClick={() =>
//                 handleClick(muscle, setSelectedValue, setShowCreateButton)
//               }
//             >
//               {muscle}
//             </Button>
//           ))}
//         </Contenedorsroll>
//       </Contenedormainsroll>

//       <Cards musculo={selectedValue} refreshStore={refreshStore} />

//       {/* Mostrar el botón para crear ejercicios si es necesario */}
//       {showCreateButton && (
//         <Botoncrearcontent>
//           <Boton
//             className="animate__animated animate__backInUp"
//             variant="contained"
//             sx={{
//               minWidth: 300,
//               lineHeight: 1,
//               height: 40,
//               background: "#2E3562",
//               borderRadius: 10,
//             }}
//             disableElevation
//             onClick={() => {
//               navigate("/createexersices");
//             }}
//           >
//             Create new workout
//           </Boton>
//         </Botoncrearcontent>
//       )}
//     </section>
//   );
// };
