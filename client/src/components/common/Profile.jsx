import { useContext,useState } from "react";
import { FaChevronRight, FaCheck } from "react-icons/fa";
import { Useauth } from "../../context/UserAuthorCon";

function Profile() {
  // const [isOpen, setIsOpen] = useState(false);
  const { curr } = useContext(Useauth);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [theme, setTheme] = useState("System Default");
  return (
    <div className='container'>
        <div className='d-flex'>
          <div className=" h-100 border ">
           <button>Profile</button>
           <button
            onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}
            className="flex justify-between w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              ⚙️ Appearance
            </span>
            <FaChevronRight />
          </button>
          {isAppearanceOpen && (
        <div className="absolute left-full top-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-2">
          {["System Default", "Light", "Dark"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className="w-full text-left px-4 py-2 flex items-center gap-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              {theme === mode && <FaCheck />}
              {mode}
            </button>
          ))}
          </div>)}</div>
          <div>
          <img src={curr.profileImg} width='60px' className='rounded-circle' alt='' />
          <p>{curr.firstName}</p>
          <p>{curr.email}</p>
          </div>

        </div>

    </div>
  )
}

export default Profile