"use strict";

fetchData("/news.json", (items) => {
  renderContent(items);
});
