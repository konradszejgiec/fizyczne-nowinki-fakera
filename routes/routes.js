"use strict";

const routes = (app, bodyParser, controller) => {
  const jsonParser = bodyParser.json();

  app.route("/").get(controller.displayMainPage).post(jsonParser, controller.postArticle);

  app.route("/about").get(controller.displayAbout);

  app.route("/articles").get(controller.displayArticles);

  app.route("/news").get(controller.displayNews);

  app.route("/articles.json").get(controller.getArticles);

  app.route("/article/:id").get(controller.getArticle);

  app.route("/news.json").get(controller.getNews);

  app.route("/news/:id").get(controller.getSingleNews);

  app.route("/add/translation").get(controller.displayAddTranslation).post(jsonParser, controller.postArticle);

  app.route("/add/news").get(controller.displayAddNews).post(jsonParser, controller.postNews);

  app.route("/add").get(controller.displayAddPage);
};

module.exports = routes;
