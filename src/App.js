import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import Post from './Post';
import { db, auth } from "./firebase" ;
import Modal from '@material-ui/core/Modal';
import { Button, Input, makeStyles } from "@material-ui/core";
import ImageUpload from "./ImageUpload";



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles();
  const [ModalStyle] = React.useState(getModalStyle);

const [posts, setPosts ] = useState([]);
const [open, setOpen] = useState(false);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);
const [openSignIn, setOpenSignIn] = useState(false);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser)=> {
    if(authUser){
//user has logged in
console.log("user:", authUser);
setUser(authUser);
     } else{
        // user has logged out
        setUser(null)
      }
})
return () => {
  // perform some cleanup action
  unsubscribe();
}
}, [user, username]);

useEffect(() => {
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })
    ))
  })
}, []);

const signUp = (event) => {
  event.preventDefault();

  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
    return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message))

  setOpen(false);
};

const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);
}


  return (
    <div className="app">

      {user?.displayName ? 
      (
        <ImageUpload username={user.displayName} />
      ):
      (
        <h3>Sorry you need to Login to upload</h3>
      )}
      {/* <ImageUpload  /> */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      <div style={ModalStyle} className={classes.paper}>
        <form className="app_signup" type="submit" >
        <center>
        <img
          className="app_headerImage"
          src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/196px-Instagram_logo.svg.png"
          alt=""
        />
      </center>
      <Input
          placeholder="username"
          type="text"
          value={username}
          onChange= {(e)=> setUsername(e.target.value) }
        />      

        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange= {(e)=> setEmail(e.target.value) }
        />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange= {(e)=> setPassword(e.target.value) }
        />

        <Button onClick={signUp} >Sign Up</Button>
        </form>
      
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      <div style={ModalStyle} className={classes.paper}>
        <form className="app_signup" type="submit" >
        <center>
        <img
          className="app_headerImage"
          src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/196px-Instagram_logo.svg.png"
          alt=""
        />
      </center>    

        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange= {(e)=> setEmail(e.target.value) }
        />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange= {(e)=> setPassword(e.target.value) }
        />

        <Button onClick={signIn} >Sign In</Button>
        </form>
      
      </div>
      </Modal>
      {/* Header */}
      <div className="app_header">
        <img
          className="app_headerImage"
          src="//upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/196px-Instagram_logo.svg.png"
          alt=""
        />
      </div>
      {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>): 
      (
        <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      {/* post */}
      {/* post */}
    </div>
  );
}

export default App;
