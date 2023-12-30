const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyJWTOptional = require("../middleware/verifyJWTOptional");
const articleController = require("../controllers/articlesController");
const parser = require("../config/cloudinary");

// feed endpoint must go before :slug endpoint
router.get("/feed", verifyJWT, articleController.feedArticles);

router.get("/", verifyJWTOptional, articleController.listArticles);

router.get("/:slug", articleController.getArticleWithSlug);

router.post(
  "/",
  verifyJWT,
  parser.single("image"),
  articleController.createArticle
);

router.delete("/:slug", verifyJWT, articleController.deleteArticle);

router.post("/:slug/favorite", verifyJWT, articleController.favoriteArticle);

router.delete(
  "/:slug/favorite",
  verifyJWT,
  articleController.unfavoriteArticle
);

router.put("/:slug", verifyJWT, articleController.updateArticle);

module.exports = router;
