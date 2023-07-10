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
  updateDoc,
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
  return await getDocs(postsCollection)
    .then(async (posts) => {
      let likedPost = posts.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((post) => post.id === id);
      const likeCount = likedPost[0].likeCount || 0;
      const updatedLikeCount = likeCount + 1;
      const updatedPost = {
        ...likedPost[0],
        likeCount: updatedLikeCount,
      };

      await updateDoc(doc(db, "posts", id), { likeCount: updatedLikeCount });
      return updatedPost;
    })
    .catch((err) => {
      console.log(err);
      throw error;
    });
};

export const updatePost = async (id, updatedPost) => {
  try {
    await updateDoc(doc(db, "posts", id), updatedPost);
    return updatedPost;
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
