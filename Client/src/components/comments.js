import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

import '../styles/comments.css';

export default function Comments(props) {
  const [commentsList, setCommentsList] = useState([]);
  const [updatedComment, setUpdatedComment] = useState('');
  const [showNewCommentInput, setShowNewCommentInput] = useState(false);
  const username = JSON.parse(localStorage.getItem('user')).username;
  console.log('username: ', username);
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  console.log('username: ', userEmail);

  const post_id = props.p.id;

  async function importComments() {
    try {
      const fetchedData = await fetch(`http://localhost:3000/api/comments?postId=${post_id}`);
      const data = await fetchedData.json();
      setCommentsList(data);
      setShowNewCommentInput(false); // Hide the new comment input box when loading comments

      // Toggle the visibility of the "Show Comments" button
      const showButton = document.getElementById(`showB-${props.p.id}`);
      showButton.classList.toggle('hidden');
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  const handleUpdateComment = (id) => {
    setUpdatedComment(''); // Reset the input field for each comment
    setCommentsList((prevList) =>
      prevList.map((comment) =>
        comment.id === id ? { ...comment, isInputVisible: true } : { ...comment, isInputVisible: false }
      )
    );

    // Hide the "Show Comments" button
    const showButton = document.getElementById(`showB-${props.p.id}`);
    showButton.classList.add('hidden');
  };

  const handleInputChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleUpdateSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ body: updatedComment }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setCommentsList((prevList) =>
          prevList.map((comment) =>
            comment.id === id ? { ...comment, body: updatedComment, isInputVisible: false } : comment
          )
        );
      } else {
        console.error('Failed to update the comment.');
      }
    } catch (error) {
      console.error('Error updating the comment:', error);
    }
  };

  const handleNewComment = async () => {
    setShowNewCommentInput(true);
  };

  const handleNewCommentSubmit = async () => {
    try {
      // Perform the API POST request to send the new comment
      const response = await fetch('http://localhost:3000/api/comments/post', {
        method: 'POST',
        body: JSON.stringify({
          postId: post_id,
          username: username,
          email: userEmail,
          body: updatedComment,
          isDeleted: false,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current date and time
          lastModified: new Date().toISOString().slice(0, 19).replace('T', ' ') // Current date and time
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // If the comment was successfully posted, update the comments list
        importComments();
      } else {
        console.error('Failed to post the new comment.');
      }
    } catch (error) {
      console.error('Error posting the new comment:', error);
    }

    // Reset the state after submitting the new comment
    setUpdatedComment('');
    setShowNewCommentInput(false);
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/delete/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        importComments();
        // Show the "Show Comments" button again after deleting a comment
        const showButton = document.getElementById(`showB-${props.p.id}`);
        showButton.classList.remove('hidden');
      } else {
        console.error('Failed to delete the comment.');
      }
    } catch (error) {
      console.error('Error deleting the comment:', error);
    }
  };

  return (
    <>
      <div className={`post_card ${props.isSelected ? 'selected' : ''}`} onClick={() => props.handleClick(props.p.id)}>
        <div className="post_title">
          <label>{props.p.title}</label>
        </div>
        <div className="post_body">
          <label>{props.p.body}</label>
        </div>
        <div className="comments_btn_div">
          <button id={`showB-${props.p.id}`} className={`comments_btn ${props.isSelected ? '' : 'hidden'}`} onClick={importComments}>
            Show Comments
          </button>

          {/* "Hide Comments" button */}
          <button
            className={`comments_btn ${commentsList.length === 0 ? 'hidden' : ''}`}
            onClick={() => {
              setCommentsList([]);
              document.getElementById(`showB-${props.p.id}`).classList.remove('hidden');
            }}
          >
            Hide Comments
          </button>

          {/* "New Comment" button */}
          <button className="new_comment_btn" onClick={handleNewComment}>
            New Comment
          </button>
        </div>

        <div className={`comments_list ${commentsList.length === 0 ? 'hidden' : ''}`}>
          {showNewCommentInput && (
            <div className="comment_input">
              <input
                type="text"
                value={updatedComment}
                onChange={handleInputChange}
                placeholder="Write your new comment..."
              />
              <button onClick={handleNewCommentSubmit}>Submit</button>
            </div>
          )}

          {commentsList.map((comment) => (
            <div key={comment.id} className="comment_item">
              <div className="post_title">
                <label>Name: </label>
                <label>{comment.username}</label>
              </div>
              <div className="post_body">
                <label>Body: </label>
                <label>{comment.body}</label>
              </div>
              <span className="update_comment_icon" onClick={() => handleUpdateComment(comment.id)}>
                <FiEdit className="icon" />
              </span>
              <span className="delete_comment_icon" onClick={() => handleDeleteComment(comment.id)}>
                <MdDelete className="icon" />
              </span>

              {/* Input box below the comment details */}
              {comment.isInputVisible && (
                <div className="comment_input">
                  <input
                    type="text"
                    value={updatedComment}
                    onChange={handleInputChange}
                    placeholder="Write your updated comment..."
                  />
                  <button onClick={() => handleUpdateSubmit(comment.id)}>Update</button>
                </div>
              )}

              <hr className="horizontal-line" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
