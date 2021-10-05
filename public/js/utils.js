"use strict";

const getElementBy = (elementSelector) => {
  return document.querySelector(elementSelector);
};

const getElementValue = (elementSelector) => {
  return getElementBy(elementSelector).value;
};
const getDate = (elementSelector) => {
  return getElementBy(elementSelector).valueAsDate;
};
const setElementValue = (selector, newValue) => {
  return (getElementBy(selector).value = newValue);
};
const insertItemHTML = (existingElementSelector, newElementHtml) => {
  return getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
};

const getItemHTML = (item) => {
  return `<a href="/article/${item._id}" class="list-group-item list-group-item-action text-center">${item.title}</a>`;
};

const getContentHTML = (item) => {
  return `${item.content.split("\n").join("<br />")}`;
};

const handleEventListener = (elementSelector, eventListener, callback) => {
  return getElementBy(elementSelector).addEventListener(eventListener, callback);
};

const sortArticles = (articles) => {
  let sortedArray = articles.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });
  return sortedArray;
};

const renderCart = (articles) => {
  sortArticles(articles).forEach((item) => {
    insertItemHTML(".list-group", getItemHTML(item));
  });
};

const renderLastArticles = (article1, article2, article3) => {
  insertItemHTML(".list-group", getItemHTML(article1));
  insertItemHTML(".list-group", getItemHTML(article2));
  insertItemHTML(".list-group", getItemHTML(article3));
};

const notFilledInput = () => {
  return getElementValue("#title") == ""
    ? true
    : getElementValue("#article") == ""
    ? true
    : getElementValue("#name") == ""
    ? true
    : getElementValue("#source") == ""
    ? true
    : getElementValue("#date") == ""
    ? true
    : false;
};

const renderArticleContent = (items) => {
  items.forEach((element, index) => {
    if (items[index]._id == getElementBy(".post-title").id) return insertItemHTML(".font-weight-bold", getContentHTML(items[index]));
  });
};
