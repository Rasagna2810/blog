import { NavLink, Outlet } from "react-router-dom";
import { Useauth } from "../../context/UserAuthorCon";
import { useEffect,useContext} from "react"
import { motion } from "framer-motion";

function AuthorProfile() {
  const { curr, setcurr } = useContext(Useauth);
  // useEffect(() => {
  //   setcurr(prevState => ({ ...prevState, role: "author" }));
  // }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="author-profile m-5">
        <p className="jj">Hey {curr?.role}</p>
        <motion.ul 
          className="d-flex justify-content-between g-5 list-unstyled fs-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.li 
            className="nav-item"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink to="articles" className="nav-link jj">
              Articles
            </NavLink>
          </motion.li>
          <motion.li 
            className="nav-item ms-5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <NavLink to="article" className="nav-link ms-5 jj">
              New Articles
            </NavLink>
          </motion.li>
        </motion.ul>
      </div>

      <motion.div 
        className="mt-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default AuthorProfile;
