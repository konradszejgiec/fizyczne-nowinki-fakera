"use strict";

const routes = (app, bodyParser, controller) => {
  const jsonParser = bodyParser.json();

  app.route("/").get(controller.displayMainPage).post(jsonParser, controller.postArticle);

  app.route("/about").get(controller.displayAbout);

  app.route("/articles").get(controller.displayArticles);

  app.route("/articles.json").get(controller.getArticles);

  app.route("/article/:id").get(controller.getArticle);

  app.route("/add").get(controller.displayAddPage).post(jsonParser, controller.postArticle);
};

module.exports = routes;
