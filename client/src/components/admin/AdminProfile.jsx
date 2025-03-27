import { useState,useContext, useEffect } from "react";
import { Useauth } from "../../context/UserAuthorCon";
import axios from "axios";

function AdminProfile() {
  const [A, setA] = useState([]);
  const [err, setErr] = useState(null);
  const [ei, setEi] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { curr, setcurr } = useContext(Useauth);
  const itemsPerPage = 10;

  useEffect(() => {
    async function init() {
      try {
        let res = await axios.get(`http://localhost:3010/admin-api/`);
        if (res.data.message === "articles") {
          setA(res.data.payload);
        } else {
          setErr("error");
        }
      } catch (error) {
        setErr("error");
      }
    }
    init();
  }, [ei]);

  async function Report(e) {
    setEi(e);
    let res = await axios.get(`http://localhost:3010/admin-api/${e}`);
    if (res.data.message !== "Update successful") {
      setErr("error");
    }
    setEi(null);
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = A.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(A.length / itemsPerPage);

  return (
    <div>
      {err!==null && <h3>{err.message}</h3>}
      <p>Hey {curr?.role}</p>
      { A.length>0&&(
      <div  className="table-responsive">
      <table className="table w-75  mx-auto p-2 ">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((p, index) => (
            <tr key={index} className="p-4">
              <td className="p-4">{p.firstName}</td>
              <td className="p-4">{p.email}</td>
              <td className="p-4">{p.role}</td>
              {p.report === 0 ? (
                p.isActive === true ? (
                  <td ><button className="bg-success btn">Active </button></td>
                ) : (
                  <td><button className="bg-success btn">Inactive</button></td>
                )
              ) : (
                <td ><button className="bg-danger btn">Blocked</button></td>
              )}
              <td className="p-4">
                <button onClick={() => Report(p.email)} className="btn">
                  {p.report === 0 ? "Report" : "Reported"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>)}
      {/* Pagination Controls */}
      { totalPages>1&&
      <div className="pagination-container d-flex align-items-center justify-content-end gap-3 mt-4 me-5">
  <button
    className="btn jj  px-3"
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    ⬅ Prev
  </button>
  <span className="fs-5  jj">
    Page {currentPage} of {totalPages}
  </span>
  <button
    className="btn jj   px-3"
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next ➡
  </button>
</div>}

    </div>
  );
}

export default AdminProfile;
