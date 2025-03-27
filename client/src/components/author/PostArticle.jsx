import React,{useContext} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Useauth } from '../../context/UserAuthorCon';
import {useNavigate} from 'react-router-dom'

function PostArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm();
   const {curr}=useContext(Useauth)
   const navigate=useNavigate()
  async function postArticle(articleObj) {
    // Now articleObj will have title, category, and content
    // create article obj as per article schema
    const authorData={
      nameOfAuthor:curr.firstName,
      email:curr.email,
      profileimg:curr.profileImg,
    }
    articleObj.authorData=authorData;
    articleObj.articleId=Date.now();//timestamp
    let d=new Date();
    articleObj.dateofCreation = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.toLocaleTimeString("en-US", { hour12: true })}`;
articleObj.dateofModification = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.toLocaleTimeString("en-US", { hour12: true })}`;
    // add comments
    articleObj.comments=[];
    articleObj.isArticleActive=true;
    console.log(articleObj); 

  //  Http req
  let res=await axios.post('http://localhost:3010/author-api/article', articleObj);
  if(res.status===201){
    navigate(`/author-profile/${curr.email}/articles`)
  }
  else{
    console.log("error");
  }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3" style={{ color: "goldenrod" }}>Write an Article</h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit(postArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && <p className="text-danger">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">Select a category</label>
                  <select
                    id="category"
                    className="form-select"
                    defaultValue=""
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="" disabled>--categories--</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                  {errors.category && <p className="text-danger">{errors.category.message}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="10"
                    {...register("content", { required: "Content is required" })}
                  ></textarea>
                  {errors.content && <p className="text-danger">{errors.content.message}</p>}
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success add-article-btn">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
