import React, { useEffect, useState } from "react";
import Comments from "./comments";
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const Posts = () => {
    let [data, setData] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isNewPostOpen, setNewPostOpen] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [updatePostId, setUpdatePostId] = useState(null); // Track which post's update section is open
    const [updatePostTitle, setUpdatePostTitle] = useState("");
    const [updatePostBody, setUpdatePostBody] = useState("");
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    async function importData() {
        try {
            const fetchedData = await fetch(`http://localhost:3000/api/posts?userId=${user_id}`);
            const data = await fetchedData.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        importData();
    }, []);

    const handlePostClick = (postId) => {
        setSelectedPostId(postId);
    };

    const handleNewPostClick = () => {
        setNewPostOpen(true);
    };

    const handleNewPostTitleChange = (event) => {
        setNewPostTitle(event.target.value);
    };

    const handleNewPostBodyChange = (event) => {
        setNewPostBody(event.target.value);
    };

    const handlePublishPost = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/posts/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newPostTitle,
                    body: newPostBody,
                    userId: user_id,
                }),
            });
            if (response.ok) {
                importData();
                setNewPostOpen(false);
                setNewPostTitle("");
                setNewPostBody("");
            } else {
                console.error('Error publishing post:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/delete/${postId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                importData();
            } else {
                console.error('Error deleting post:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleUpdatePostClick = (postId, title, body) => {
        // Toggle the update section open or close for the clicked post
        setUpdatePostId(postId);
        setUpdatePostTitle(title);
        setUpdatePostBody(body);
    };

    const handleUpdatePostCancelClick = () => {
        // Close the update section without updating the post
        setUpdatePostId(null);
        setUpdatePostTitle("");
        setUpdatePostBody("");
    };

    const handleUpdatePostSaveClick = async (postId) => {
        try {
            console.log("update post function: ", postId, " ", updatePostTitle, " ", updatePostBody);
            const response = await fetch(`http://localhost:3000/api/posts/update/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: postId,
                    title: updatePostTitle,
                    body: updatePostBody,
                }),
            });
            console.log(response);
            if (response.ok) {
                importData();
                setUpdatePostId(null); // Close the update section after saving
                setUpdatePostTitle("");
                setUpdatePostBody("");
            } else {
                console.error('Error updating post:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <>
            <h1 className="title">Posts</h1>
            <button onClick={handleNewPostClick}>New Post</button>
            {isNewPostOpen && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter post title"
                        value={newPostTitle}
                        onChange={handleNewPostTitleChange}
                    />
                    <input
                        type="text"
                        placeholder="Enter post body"
                        value={newPostBody}
                        onChange={handleNewPostBodyChange}
                    />
                    <button onClick={handlePublishPost}>Publish Post</button>
                </div>
            )}
            <ol>
                {data.map((post) => (
                    <li key={post.id}>
                        {updatePostId === post.id ? (
                            // Update section with input boxes
                            <div>
                                <input
                                    type="text"
                                    placeholder="Update post title"
                                    value={updatePostTitle}
                                    onChange={(e) => setUpdatePostTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Update post body"
                                    value={updatePostBody}
                                    onChange={(e) => setUpdatePostBody(e.target.value)}
                                />
                                <button onClick={() => handleUpdatePostSaveClick(post.id)}>
                                    Save
                                </button>
                                <button onClick={handleUpdatePostCancelClick}>Cancel</button>
                            </div>
                        ) : (
                            // Comments section
                            <>
                                <Comments
                                    p={post}
                                    isSelected={selectedPostId === post.id}
                                    handleClick={handlePostClick}
                                />
                                {/* Update Icon */}
                                <FiEdit
                                    style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                                    onClick={() =>
                                        handleUpdatePostClick(post.id, post.title, post.body)
                                    }
                                />
                                {/* Delete Icon */}
                                <MdDelete
                                    style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                                    onClick={() => handleDeletePost(post.id)}
                                />
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </>
    );
};

export default Posts;
