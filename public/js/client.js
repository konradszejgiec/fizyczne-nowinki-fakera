"use strict";

const sendData = (route, item) => {
  if (!item) return;
  return fetch(`${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const fetchData = (route, callback) => {
  fetch(`${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((items) => callback(items));
};
