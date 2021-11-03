"use strict";

fetchData("/articles.json", (items) => {
  renderLastArticles(sortArticles(items)[0], sortArticles(items)[1], sortArticles(items)[2]);
});

fetchData("/news.json", (items) => {
  renderLastNews(sortArticles(items)[0]);
});
