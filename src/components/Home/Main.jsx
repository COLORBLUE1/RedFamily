import { Sectionhome } from "../../assets/style/stylecomponets/styled";
import { NavBarDef } from "./NavBarDef";
import Cards from "../Blocks/Cards_all";
import "animate.css";
import { motion } from "framer-motion"; // Asegurándote de importar motion de framer-motion

export function Main() {
  return (
    <>
      <Sectionhome>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Cards />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavBarDef />
        </motion.div>
      </Sectionhome>
    </>
  );
}
