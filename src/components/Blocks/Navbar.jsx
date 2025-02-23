import React, { useState, useRef, useEffect } from "react";
import { BiSolidBellRing } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  Noty,
  Perfilcontenedor,
} from "../../assets/style/stylecomponets/styled";
import { Avatar } from "@mui/material";
import { Burger, Menu } from "./components"; // Asegúrate de tener Burger y Menu importados correctamente

// Hook para detectar clics fuera del componente
const useOnClickOutside = (ref: React.RefObject<HTMLDivElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export function Navbar() {
  const user = useSelector((store: any) => store.user); // Asegúrate de que el tipo de `store` está correctamente tipado

  const [open, setOpen] = useState<boolean>(false); // Estado para controlar la visibilidad del menú
  const node = useRef<HTMLDivElement>(null); // Ref para el nodo donde detectaremos los clics fuera

  // Usamos el hook para detectar clics fuera
  useOnClickOutside(node, () => setOpen(false));

  return (
    <Perfilcontenedor>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>

      <div>
        <h4>Hi!</h4>
        <p>{user?.displayName || "Usuario"}</p>
      </div>

      <Noty>
        <BiSolidBellRing />
      </Noty>
    </Perfilcontenedor>
  );
}
