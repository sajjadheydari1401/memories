import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  firebaseConfig,
  auth,
  db,
  storage,
  postsCollection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "../../firebase";

// Initialize Firebase
initializeApp(firebaseConfig);

export const fetchPosts = async () => {
  return await getDocs(postsCollection)
    .then((posts) => {
      let postsData = posts.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return postsData;
    })
    .catch((err) => {
      console.log(err);
      throw error;
    });
};

export const createPost = async (newPost, file) => {
  try {
    const docRef = await addDoc(postsCollection, newPost);
    const postId = docRef.id;

    if (file) {
      const storageRef = ref(storage, `posts/${postId}/${file.name}`);
      await uploadBytes(storageRef, file);
      // Add the file URL to the newPost object or update it in the Firestore document
      newPost.fileUrl = await getDownloadURL(storageRef);
      await docRef.update({ fileUrl: newPost.fileUrl });
    }

    const createdPost = {
      id: postId,
      ...newPost,
    };
    return createdPost;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const likePost = async (id) => {
  try {
    const postRef = postsCollection.doc(id);
    const post = await postRef.get();
    const likeCount = post.data().likeCount || 0;
    await postRef.update({ likeCount: likeCount + 1 });
    const updatedPost = {
      id: post.id,
      ...post.data(),
      likeCount: likeCount + 1,
    };
    return updatedPost;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    const postRef = postsCollection.doc(id);
    await postRef.update(updatedPost);
    const post = await postRef.get();
    const updatedData = {
      id: post.id,
      ...post.data(),
    };
    return updatedData;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
