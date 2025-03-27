import { useContext, useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { FaEdit } from "react-icons/fa";
import { Useauth } from "../../context/UserAuthorCon";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { MdDelete, MdRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { IoFlag } from "react-icons/io5";
import axios from "axios";

function ArticleByID() {
  const { state } = useLocation();
  const { curr } = useContext(Useauth);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [editart, setEdit] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    ...state,
    comments: state.comments || [], // Ensure it's always an array
  });
  const [commentActions, setCommentActions] = useState(null); // Track which comment menu is open
  // const [reportedComments, setReportedComments] = useState(new Set()); // Track reported comments

  function enableedit() {
    setEdit(true);
  }
  
  async function onSave(modifiedArticle) {
   
    try{
    const token = await getToken();
     if(!token){
      console.error('Authentication token missing');
      return;
     }
    const articleAfterChanges = { ...state, ...modifiedArticle };
    const currentDate = new Date();
    articleAfterChanges.dateofModification =currentDate.getDate()+"-"
    +currentDate.getMonth()+"-"
    +currentDate.getFullYear();

    let res = await axios.put(
      `http://localhost:3010/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.message === "article modified") {
      setEdit(false);
      // state= res.data.payload;
      setCurrentArticle(res.data.payload);
      
      // navigate(`/author-profile/${curr.email}/${state.articleId}`, {
      //   ,
      // });
      
    }} 
    catch(error){
      console.error('Error saving article:',error);
    }
  }

  async function deleteArticle(){
    const updatedState = { ...currentArticle, isArticleActive: false };
    let res =await axios.put(`http://localhost:3010/author-api/articles/${currentArticle.articleId}`,updatedState)
    if (res.data.message === 'article deleted or restored') {
      console.log('hi')
      setCurrentArticle(res.data.payload)
  
    }
  }
  // restore
  async function restoreArticle(){
    const updatedState = { ...currentArticle, isArticleActive: true };
    let res =await axios.put(`http://localhost:3010/author-api/articles/${currentArticle.articleId}`,updatedState)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  async function addComment(commentobj) {
    try {
        commentobj.nameofUser = curr.firstName;
        let res = await axios.put(
            `http://localhost:3010/user-api/comment/${currentArticle.articleId}`,
            commentobj
        );

        if (res.data.message === "comment added") {
            // setCurrentArticle(prev => ({
            //     ...prev,
            //     comments: [...prev.comments, res.data.payload.newComment] 
            // }));
            setCurrentArticle(res.data.payload)
            reset(); 
        }
    } catch (error) {
        console.error("Error adding comment:", error.response ? error.response.data : error.message);
    }
}

  
 
  
  async function deleteComment(commentId) {
    try {
      let res = await axios.delete(
        `http://localhost:3010/user-api/comment/${currentArticle.articleId}/${commentId}`
      );
  
      if (res.data.message === "comment deleted") {
        setCurrentArticle((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c._id !== commentId),
        }));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
 
  useEffect(() => {
   console.log(curr)
  }, [currentArticle]); 
 

  return (
    <div className="container">
      {editart === false ? (
        <>
         <div className="d-flex" style={{ gap: "10px" }}>
          <div className="xx">
            <div className="mb-5 author-block bh px-4  rounded-2 d-flex justify-content-between align-items-center ">
              <div>
                <p className="display-3 mt-4 jj">{currentArticle.title}</p>
                <br/>
                <span className="py-3">
                  <small className="text-secondary me-4">
                    Created on: {currentArticle.dateofCreation}
                  </small>
                  <small className="text-secondary me-4">
                    Modified on: {currentArticle.dateofModification}
                  </small>
                </span>
              </div>
              <div className="author-details text-center">
                <img
                  src={state.authorData.profileimg}
                  width="40px"
                  className="rounded-circle"
                  alt=""
                />
                <p className="jj">{state.authorData.nameOfAuthor}</p>
              </div>
             </div>
            <hr className=" jj"/>
            <p className="lead  article-content jj p-5" style={{ whiteSpace: "pre-line" }}>
            {currentArticle.content}
            </p>
         </div>
       {
          curr.email===state.authorData.email&&(
            <div className="d-flex me-3">
          <button className="btn me-2 btn-light bb" onClick={enableedit}>
             <FaEdit className='text-warning fs-3'/>
          </button>
          
        
        {
          currentArticle.isArticleActive===true?(
          <button className='btn me-2 btn-light bb' onClick={deleteArticle}>
            <MdDelete className="text-danger "/>
          </button>):(
          <button className='btn me-2 btn-light bb' onClick={restoreArticle}>
          <MdRestore className="text-info " />
        </button>)
        }
      </div>)}
      </div>
        <p className="jj mt-5 "> comments </p>
        <hr className="jj"/>
          <div className="comments mb-5 jj">
            {state.comments.length === 0 ? (
              <p >No comments yet..</p>
            ) : (
              currentArticle.comments.map((co) =>(co?(
                <div key={co._id} className="text-start position-relative">
                  <div className="d-flex justify-content-between">
                    <h4 className="user-name ">{co?.nameofUser}</h4>
                    
                    <div className="position-relative">
                  
                      <button className="btn jj" onClick={() =>
                        setCommentActions((prev) => (prev === co._id ? null : co._id)) }>
                        <BsThreeDotsVertical />
                      </button>
                      {commentActions === co._id && (
                        <div className="dropdown-menu show position-absolute end-0">
                          {co?.nameofUser === (curr?.firstName) &&(
                            <>
                              <button className="dropdown-item text-danger" onClick={() => deleteComment(co._id)}>
                                Delete
                              </button>
                            </>
                          ) }
                        </div>
                         )}
                    </div>
                  </div>

                  <p className="comment">{co?.comment}</p>
                </div>
              ):null))
            )}
          </div>
          {curr.role === "user" && (
            <form onSubmit={handleSubmit(addComment)} className="d-flex" style={{ gap: "10px" }}>
              <input
                type="text"
                {...register("comment")}
                className="form-control mb-4 w-25"
                placeholder="Add a comment..."
              />
              <button className="btn btn-success h-25">Enter</button>
            </form>
          )}
        </>
      ) : 
        <form onSubmit={handleSubmit(onSave)}>
      <div className="mb-4">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          defaultValue={state.title}
          {...register("title")}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="form-label">
          Select a category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          defaultValue={state.category}
        >
          <option value="programming">Programming</option>
          <option value="AI&ML">AI&ML</option>
          <option value="database">Database</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          {...register("content")}
          className="form-control"
          id="content"
          rows="10"
          defaultValue={state.content}
        ></textarea>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </div>
    </form>}
    </div>
  );
}

export default ArticleByID;
