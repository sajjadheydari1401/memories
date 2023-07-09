const router = require("express").Router();
const postsController = require("../controllers/posts");

router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPost);
router.post("/", postsController.createPost);
router.patch("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.patch("/:id/likePost", postsController.likePost);

module.exports = router;
