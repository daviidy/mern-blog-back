import express from 'express';
import asyncHandler from 'express-async-handler';

const articleRouter = express.Router();

// Route to fetch a list of articles
articleRouter.get('/index', asyncHandler(async (req, res) => {
  const response = await fetch('https://dev.to/api/articles');
  const articles = await response.json();
  res.json(articles);
}));

// Route to fetch one article by ID
articleRouter.get('/:id', asyncHandler(async (req, res) => {
  const articleId = req.params.id;
  const response = await fetch(`https://dev.to/api/articles/${articleId}`);
  const article = await response.json();
  res.json(article);
}));

export default articleRouter;
