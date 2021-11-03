"use strict";

fetchData("/news.json", (items) => {
  renderCart(items);
});
