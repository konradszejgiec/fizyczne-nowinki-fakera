"use strict";

fetchData("/articles.json", (items) => {
  renderContent(items);
});
