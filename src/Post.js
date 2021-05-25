import React from 'react';
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ imageUrl, username, caption }) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="dibs"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
                {/* header -> avatar+username */}   
            </div>
            
             <img className="post_image" src={imageUrl} alt="" />
            {/* image */}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
            {/* username + caption */}
            
        </div>
    )
}

export default Post
