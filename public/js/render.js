"use strict";

fetchData("/articles.json", (items) => {
  renderArticleContent(items);
});
