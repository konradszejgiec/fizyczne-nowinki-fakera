"use strict";

fetchData("/articles.json", (items) => {
  renderCart(items);
});
