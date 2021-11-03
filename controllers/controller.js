"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Article = require("../models/article");
const News = require("../models/news");

exports.displayMainPage = async (req, res) => {
  res.render("main");
};

exports.displayAbout = async (req, res) => {
  res.render("about");
};

exports.displayArticles = async (req, res) => {
  res.render("articles");
};

exports.displayNews = async (req, res) => {
  res.render("news");
};

exports.displayAddTranslation = async (req, res) => {
  res.render("add-translation");
};

exports.displayAddNews = async (req, res) => {
  res.render("add-news");
};

exports.displayAddPage = async (req, res) => {
  res.render("add");
};

exports.getArticles = async (req, res) => {
  try {
    const article = await Article.find();
    res.status(200).send(article);
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).send(news);
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render("article", {
      id: article._id,
      title: article.title,
      author: article.author,
      date: article.date.toLocaleString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      source: article.source,
    });
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.render("single-news", {
      id: news._id,
      author: news.author,
      date: news.date.toLocaleString("pl-PL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    });
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.postArticle = async (req, res) => {
  try {
    if (req.body.password != process.env.ARTICLE_PASSWORD) res.status(403).send("Sorry, bad password");
    else {
      const article = await Article.create(req.body.content);
      res.status(200).end();
    }
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};

exports.postNews = async (req, res) => {
  try {
    if (req.body.password != process.env.ARTICLE_PASSWORD) res.status(403).send("Sorry, bad password");
    else {
      const news = await News.create(req.body.content);
      res.status(200).end();
    }
  } catch (err) {
    res.status(404).end();
    console.log(err);
  }
};
