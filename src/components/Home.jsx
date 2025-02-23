import { Contenedormain } from "../assets/style/stylecomponets/styled.js";
import { Main } from "./Home/Main";


export function Home() {
  //Agragar collecion a base de datos

  //  async function add() {
  //   posts.forEach(async (posts) => {
  //      await createAsync./Home/NavBarDef.jsx
  //    });
  //  }

  return (
    <Contenedormain>
      {/* Cntenedor del contenido del home */}
  
      <Main />
     {/* Agregar collecion
      <Button onClick={add}>Agregar</Button>*/}
    </Contenedormain>
  );
}
