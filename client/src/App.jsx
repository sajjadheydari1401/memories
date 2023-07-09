/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import Posts from "./components/posts";
import Form from "./components/Form/Form";
import { getPosts } from "./redux/postSlice";
import { firebaseConfig, postsCollection, getDocs } from "../firebase";
import memories from "../public/memories.png";

import useStyles from "./styles";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);

    const fetchData = async () => {
      try {
        const docsSnap = await getDocs(postsCollection);

        if (docsSnap.docs) {
          await dispatch(getPosts());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

        // const snapshot = await postsCollection.once("value");
        // const postsData = await snapshot.val();
        // Do something with the posts data
        // console.log("postsData", postsData);
        // await dispatch(getPosts());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
