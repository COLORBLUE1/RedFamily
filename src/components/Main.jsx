import { TbBackground } from "react-icons/tb";
import { Contenedormain } from "../assets/style/stylecomponets/styled.js";
import { Home } from "./Home.jsx";
import { NavBarDef } from "./Home/NavBarDef.jsx";

export function Main() {
  return (
    <Contenedormain>
      <Home />
    </Contenedormain>
  );
}
