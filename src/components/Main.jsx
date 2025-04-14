import { TbBackground } from "react-icons/tb";
import { Contenedormain } from "../assets/style/stylecomponets/styled.js";
import { Home } from "./Home";
import { NavBarDef } from "./Home/NavBarDef";

export function Main() {
  return (
    <Contenedormain>
      <Home />
    </Contenedormain>
  );
}
