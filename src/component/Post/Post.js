import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import Modal from '../../common/Modal/Modal';
import Axios from "axios";
import { AuthContext } from '../../context/Auth';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

function Post(props) {
    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);

    const [postName, setPostName] = useState("");
    const [postDetail, setPostDetail] = useState("");
    const [postDate, setPostDate] = useState("");

    const [postData, setPostData] = useState("");
    const [isPostAdded, setIsPostAdded] = useState(false);
    const [isPostDelete, setIsPostDelete] = useState(false);
    const [isPostEdited, setIsPostEdited] = useState(false);

    const [editDetails, setEditDetails] = useState(false);
    const [postId, setPostId] = useState("");

    const postTitles = React.useRef();
    const postDescriptions = React.useRef();
    const scheduleDates = React.useRef();

    const userId = currentUser.uid;

    // to Hide past date
    var today = new Date();
    var month,
        day = null;
    if (today.getMonth() < 10 || today.getDate() < 10) {
        month = "0" + (today.getMonth() + 1);
        day = "0" + today.getDate();
    }
    var date = today.getFullYear() + "-" + month + "-" + day;

    useEffect(() => {
        setIsPostAdded(false);
        setIsPostDelete(false);
        setIsPostEdited(false);
        getPostData(currentUser.email);
    }, [isPostAdded, isPostDelete, isPostEdited, currentUser]);

    const getPostData = (email) => {
        Axios
            .get(`https://safari-kid-387711-default-rtdb.firebaseio.com/post/${userId}.json`)
            .then((response) => {
                setPostData(response.data)
                // setPostData(Object.entries(response.data).filter((e)=>(e.user === email)));
                // console.log(response);
            })
            .catch((error) => console.log(error));
    };

    //  to Add and Edit cardData in DB
    const handleAddPostData = (e) => {
        //   check if all input is taken
        if (postTitles.current.value.length === 0 || postDescriptions.current.value.length === 0 || scheduleDates.current.value.length === 0) {
            setFormComplete(false);
            setFormIncompleteError(true);
        } else {
            // if user wants to edit then put request is used
            if (editDetails) {
                Axios
                    .put(`https://safari-kid-387711-default-rtdb.firebaseio.com//post/${userId}/${postId}.json`,
                        {
                            postName: postName === "" ? postTitle : postName,
                            postDetail: postDetail === "" ? postDescription : postDetail,
                            postDate: postDate === "" ? scheduleDate : postDate,
                            user: currentUser.email,
                        }
                    )
                    .then((response) => {
                        alert("post edited succesfully");
                        setIsPostEdited(true);
                    })
                    .catch((error) => console.log("Error in editDetails" + error));
            }
            //  if user wants to add a new card
            else {
                Axios
                    .post(`https://safari-kid-387711-default-rtdb.firebaseio.com//post/${userId}.json`,
                        {
                            postName: postName,
                            postDetail: postDetail,
                            postDate: postDate,
                            user: currentUser.email,
                        }
                    )
                    .then((response) => {
                        alert("post added succesfully");
                        setIsPostAdded(true);
                    })
                    .catch((error) => console.log("Error" + error));
            }

            setShowModal(false);
            setEditDetails(false);

            setPostName("");
            setPostDetail("");
            setPostDate("");
        }
    };

    // on click of card this function shows details
    const onPostClick = (
        postTitle,
        postDescription,
        scheduleDate,
        postId,
        e
    ) => {
        setShowDetails(true);

        setPostTitle(postTitle);
        setPostDescription(postDescription);
        setScheduleDate(scheduleDate);
        setPostId(postId);
    };

    // handles edit button click
    const handleEdit = (e) => {
        setShowDetails(false);
        setShowModal(true);
        setEditDetails(true);
    };



    // handles archive on card archive click
    const handleDelete = (postId, e) => {
        if (window.confirm("Are you sure you want to delete the Post?")) {
            Axios
                .delete(`https://safari-kid-387711-default-rtdb.firebaseio.com//post/${userId}/${postId}.json`)
                .then((response) => {
                    alert("post deleted succesfully");
                    setIsPostDelete(true);
                })
                .catch((error) => console.log("Error" + error));
        }
    };



    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); };

    const showmodalCloseHandler = () => { setShowDetails(false) };

    //modal of Add and Edit Card
    let modalContent = showModal ?

        (
            <>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-md-12 text-left main1">
                            <h3>{editDetails ? 'Edit Post' : 'Add Post'}</h3>
                            {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                            <div className="form-group">
                                <label htmlFor="postTitle">Post Title</label>
                                <input type="text" id="post_title" defaultValue={editDetails ? postTitle : ""} placeholder="Enter a post title" ref={postTitles} onChange={(event) => setPostName(event.target.value)} className="form-control mb-2" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postDescription">Post Description</label>
                                <input type="text" id="post_description" defaultValue={editDetails ? postDescription : ""} placeholder="Enter a post Description" ref={postDescriptions} onChange={(event) => setPostDetail(event.target.value)} className="form-control mb-2" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="schedule">Schedule Date</label>
                                <input type="date" id="schedule_date" min={date} defaultValue={editDetails ? scheduleDate : ""} ref={scheduleDates} onChange={(event) => setPostDate(event.target.value)} className="form-control mb-2" />
                            </div>
                            <br/>
                            <Button variant="contained" color="success" disabled={formComplete} className="btn btn-info" onClick={handleAddPostData}>{editDetails ? 'Edit Post' : 'Add Post'}</Button>
                        </div>
                    </div>
                </div>      
            </>
        )
        : null;

    //modal of show card details
    let showmodalContent = showDetails ?
        (
            <>
                <div className="container my-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex justify-content-between">
                                <h3 className="text-left">View Post</h3>
                            </div>
                            <hr />
                            <div className="text-left my-2">
                                <h4>Post Title</h4>
                                <h6>{postTitle}</h6>
                            </div>
                            <div className="text-left my-2">
                                <h4>Post Description</h4>
                                <h6>{postDescription}</h6>
                            </div>
                            <div className="text-left my-2">
                                <h4>Post Date</h4>
                                <h6>{scheduleDate}</h6>
                            </div>
                                <Button variant="contained" color="success" type="button" id="editBtn" className="btn btn-info" onClick={handleEdit}>Edit Post</Button>
                        </div>
                    </div>
                </div>


            </>
        )
        : null;

    return (
        <div className="container py-3 post-data">
            <h2>Posts</h2>
            <Button variant="contained" onClick={() => setShowModal(true)}>Add Post</Button>
            <div className="post-table my-4">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Post Tittle</TableCell>
                                <TableCell align="center">Post Description</TableCell>
                                <TableCell align="center">Schedule date</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postData ?
                                Object.entries(postData).map((item) => (
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell key={item[0]} align="center">{item[1].postName}
                                        </TableCell>
                                        <TableCell align="center">{item[1].postDetail}</TableCell>
                                        <TableCell align="center">{item[1].postDate}</TableCell>
                                        <TableCell align="center">
                                            <IconButton variant="contained" id={item[0]} value={item[1].postName} onClick={(e) =>
                                                onPostClick(
                                                    item[1].postName,
                                                    item[1].postDetail,
                                                    item[1].postDate,
                                                    item[0],
                                                    e
                                                )
                                            }>
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" variant="contained" type="button" id={item[0]} onClick={(e) => handleDelete(item[0], e)}><DeleteIcon /></IconButton></TableCell>
                                    </TableRow>
                                )) : <span className="noTaskAdded p-5">No tasks added</span>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br />
            {showModal && (

                <Modal
                    content={modalContent}
                    close={modalCloseHandler} />
            )}

            {showDetails && (

                <Modal
                    content={showmodalContent}
                    close={showmodalCloseHandler} />
            )}



        </div>




    )
}

export default Post;
