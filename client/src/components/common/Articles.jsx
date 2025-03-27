import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineCategory } from "react-icons/md";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";

function Articles() {
  const [r, setR] = useState(0);
  const [g, setG] = useState(null);
  const [art, setA] = useState([]);
  const [err, setError] = useState("");
  const navigate = useNavigate();

  const { getToken } = useAuth();

  function handle() {
    setR(1);
  }

  function handleSubmit(value) {
    setG(value);
  }

  async function getArt() {
    const token = await getToken();
    const res = await axios.get("http://localhost:3010/author-api/articles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.message === "articles") {
      if (g === null || g === "") {
        setA(res.data.payload);
      } else {
        setA(res.data.payload.filter((article) => article.category === g));
      }
    } else {
      setError(res.data.message);
    }
  }

  function goto(ao) {
    navigate(`../${ao.articleId}`, { state: ao });
  }

  useEffect(() => {
    getArt();
  }, [g]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="text-end m-5">
        {r === 0 && (
          <motion.button 
            className="btn bg-light" 
            onClick={handle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdOutlineCategory />
          </motion.button>
        )}

        {r === 1 && (
          
          <motion.select
          id="category"
          className="form-select w-25"
           onChange={(e) => handleSubmit(e.target.value)}
           value={g} // Ensure React manages the selected option
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          >
  <option value="" disabled>
    Select a category
  </option>
  <option value="programming">Programming</option>
  <option value="AI&ML">AI & ML</option>
  <option value="database">Database</option>
 </motion.select>

        )}
      </div>

      <div className="container">
        {err && (
          <motion.p 
            className="display-4 text-center mt-5 text-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {err}
          </motion.p>
        )}

        <motion.div 
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {art.map((articleObj) => (
            <motion.div 
              className="col" 
              key={articleObj.articleId}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="card h-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="card-body">
                  <div className="author-details text-end">
                    <img
                      src={articleObj.authorData.profileimg}
                      width="40px"
                      className="rounded-circle"
                      alt=""
                    />
                    <p>
                      <small className="text-secondary">
                        {articleObj.authorData.nameofAuthor}
                      </small>
                    </p>
                  </div>
                  <h5 className="card-title">{articleObj.title}</h5>
                  <p className="card-text">
                    {articleObj.content.substring(0, 80) + "....."}
                  </p>
                  <motion.button
                    className="btn btn-info custom-btn btn-4"
                    onClick={() => goto(articleObj)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read more
                  </motion.button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {articleObj.dateofCreation}
                  </small>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Articles;
