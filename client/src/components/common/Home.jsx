// import React, { useContext, useEffect, useState } from "react";
// import { Useauth } from "../../context/UserAuthorCon";
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import Lottie from 'lottie-react';
// function Home() {
//   const { curr, setcurr } = useContext(Useauth);
//   const { isSignedIn, user, isLoaded } = useUser();
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   console.log("isSignedIn :", isSignedIn);

//   async function fetchReport(email) {
//     try {
//       const res = await axios.get(`http://localhost:3010/admin-api/admin/${email}`);
//       setcurr((prev) => ({
//         ...prev,
//         report: res.data.report || 0, // Ensure it's set properly
//       }));
//     } catch (error) {
//       console.error("Error fetching report:", error);
//       setcurr((prev) => ({
//         ...prev,
//         report: 0, // Default to 1 if there's an error
//       }));
//     }
//   }
//   useEffect(() => {
//     const storedUserData = localStorage.getItem("userData");
//   if (storedUserData) {
//     setcurr(JSON.parse(storedUserData));
//   }
//     if (!isSignedIn) {
//       localStorage.removeItem("userData");
//       setcurr({});
//     } else if (isSignedIn && user) {
//       const storedRole = localStorage.getItem("userRole");
//       const parsedRole = storedRole ? JSON.parse(storedRole) : {};
      
//       setcurr((prev) => ({
//         ...prev,
//         firstName: user?.firstName,
//         lastName: user?.lastName,
//         email: user?.emailAddresses[0].emailAddress,
//         profileImg: user?.imageUrl,
//         role: parsedRole?.role || "", // Ensure role is restored properly
//       }));
//       const email = user.emailAddresses[0].emailAddress;
//       fetchReport(email);
//     }
//   }, [isLoaded, user]);
 
//   // console.log(curr.role);
//   useEffect(() => {
//     if (curr?.role && curr?.email && error.length === 0) {
//       navigate(`/${curr.role}-profile/${curr.email}`);
//     }
//   }, [curr.role, curr.email, error]);
  

//   async function onSelectRole(e) {
//     setError("");
//     const selectedRole = e.target.value;
  
//     const updatedState = { ...curr, role: selectedRole };
  
//     try {
//       const res = await updateRoleOnServer(updatedState);
//       console.log("Role API Response:", res.data);
  
//       if (res.data.message === selectedRole) {
//         const updatedUserData = {
//           ...curr,
//           ...res.data.payload,
//         };
  
//         // ✅ Update Context & Store in Local Storage
//         localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Store full object
//         setcurr(updatedUserData);
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError("Error connecting to server");
//     }
//   }
  

//   async function updateRoleOnServer(updatedCurr) {
//     try {
//       let res = null;
//       if (updatedCurr.role === "author") {
//         res = await axios.post("http://localhost:3010/author-api/author", updatedCurr);
//       } else if (updatedCurr.role === "user") {
//         res = await axios.post("http://localhost:3010/user-api/user", updatedCurr);
//       } else {
//         res = await axios.post("http://localhost:3010/admin-api/admin", updatedCurr);
//       }
//       return res;
//     } catch (err) {
//       throw new Error("Error updating role");
//     }
//   }
//   return (
//     <div className="w-75">
//       {!isSignedIn && (
//         <div className="d-flex ah">
//          <iframe src="https://lottie.host/embed/50b16733-02fa-4bff-b16a-9a81ae82b712/kyrfzFy1Fa.lottie" width="700rem" height="600rem" ></iframe>
//           <p className="lead jj ">Welcome to the platform!</p>
//         </div>
//       )}
//       {isSignedIn &&(
//         curr.report===0?(
//         <div className="ac"> 
//           <div className="d-flex p-2 ab align-items-center">
//             <img src={user.imageUrl} width="40px" className="rounded-circle" alt="" />
//             <p className="jj">{user.firstName}</p>
//           </div>
//           <p className="jj">Select Role</p>
//           <hr className="jj"/>
//           {error && <p className="text-danger fs-5">{error}</p>}
//           <div className="d-flex role-radio justify-content-center ">
//             {["author", "user", "admin"].map((role) => (
//               <div className="form-check p-3 jj" key={role}>
//                 <input
//                   type="radio"
//                   name="role"
//                   id={role}
//                   value={role}
//                   className="form-check-input "
//                   checked={curr?.role === role}
//                   onChange={onSelectRole}
//                 />
//                 <label htmlFor={role} className="form-check-label">
//                   {role.charAt(0).toUpperCase() + role.slice(1)}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       ):
//       (
//      <div className="text-warning">You are Reported .Contact admin</div>
//       ))}
//     </div>
//   );
// }
// export default Home;
import React, { useContext, useEffect, useState } from "react";
import { Useauth } from "../../context/UserAuthorCon";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { curr, setcurr } = useContext(Useauth);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("isSignedIn:", isSignedIn);

  // Fetch report count
  async function fetchReport(email) {
    try {
      const res = await axios.get(`http://localhost:3010/admin-api/admin/${email}`);
      setcurr((prev) => {
        const updatedData = { ...prev, report: res.data.report || 0 };
        localStorage.setItem("userData", JSON.stringify(updatedData)); // Persist update
        return updatedData;
      });
    } catch (error) {
      console.error("Error fetching report:", error);
      setcurr((prev) => ({
        ...prev,
        report: 0, // Default to 0 on error
      }));
    }
  }

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setcurr(JSON.parse(storedUserData));
    }

    if (!isSignedIn) {
      localStorage.removeItem("userData");
      // setcurr({});
    } else if (isSignedIn && user) {
      const email = user.emailAddresses[0].emailAddress;
      setcurr((prev) => {
        const updatedUserData = {
          ...prev,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: email,
          profileImg: user?.imageUrl,
          role: prev?.role || "", // Preserve existing role if available
        };

        console.log("Setting curr:", updatedUserData);
        console.log(curr)
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        return updatedUserData;
      });

      fetchReport(email);
    }
    console.log(curr)
  }, [user,isLoaded]);

  // Redirect user after role selection
  useEffect(() => {
    if (curr?.role && curr?.email && error.length === 0) {
      navigate(`/${curr.role}-profile/${curr.email}`);
    }
  }, [curr, error, navigate]);

  // Handle role selection
  async function onSelectRole(e) {
    setError("");
    const selectedRole = e.target.value;

    try {
      const res = await updateRoleOnServer({ ...curr, role: selectedRole });

      if (res.data.message === selectedRole) {
        setcurr((prev) => {
          const updatedUserData = { ...prev,role: selectedRole, ...res.data.payload };
          console.log("Saving to localStorage:", updatedUserData);
          localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Persist updated role
          return updatedUserData;
        });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  }

  // API request to update role
  async function updateRoleOnServer(updatedCurr) {
    try {
      let res;
      if (updatedCurr.role === "author") {
        res = await axios.post("http://localhost:3010/author-api/author", updatedCurr);
      } else if (updatedCurr.role === "user") {
        res = await axios.post("http://localhost:3010/user-api/user", updatedCurr);
      } else {
        res = await axios.post("http://localhost:3010/admin-api/admin", updatedCurr);
      }
      return res;
    } catch (err) {
      throw new Error("Error updating role");
    }
  }

  return (
    <div className="w-75">
      {!isSignedIn && (
        <div className="d-flex ah">
          <iframe
            src="https://lottie.host/embed/50b16733-02fa-4bff-b16a-9a81ae82b712/kyrfzFy1Fa.lottie"
            width="700rem"
            height="600rem"
          ></iframe>
          <p className="lead jj">Welcome to the platform!</p>
        </div>
      )}

      {isSignedIn && (
        curr.report === 0 ? (
          <div className="ac">
            <div className="d-flex p-2 ab align-items-center">
              <img src={user.imageUrl} width="40px" className="rounded-circle" alt="" />
              <p className="jj">{user.firstName}</p>
            </div>
            <p className="jj">Select Role</p>
            <hr className="jj" />
            {error && <p className="text-danger fs-5">{error}</p>}
            <div className="d-flex role-radio justify-content-center">
              {["author", "user", "admin"].map((role) => (
                <div className="form-check p-3 jj" key={role}>
                  <input
                    type="radio"
                    name="role"
                    id={role}
                    value={role}
                    className="form-check-input"
                    checked={curr?.role === role}
                    onChange={onSelectRole}
                  />
                  <label htmlFor={role} className="form-check-label">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-warning">You are reported. Contact admin.</div>
        )
      )}
    </div>
  );
}

export default Home;
