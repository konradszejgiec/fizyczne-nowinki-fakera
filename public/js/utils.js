"use strict";

const getElementBy = (elementSelector) => {
  return document.querySelector(elementSelector);
};

const getElementsBy = (elementSelector) => {
  return document.querySelectorAll(elementSelector);
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

const setText = (selector, text) => {
  return (getElementBy(selector).innerText = text);
};

const addElementValue = (selector, newValue) => {
  return (getElementBy(selector).value += newValue);
};

const insertLink = (selector, link, title) => {
  return addElementValue(selector, `<a href=${link}>${title}</a>`);
};

const insertImg = (selector, link, title) => {
  return addElementValue(selector, `<img src=${link} alt=${title} class=img-fluid>`);
};

const insertVideo = (selector, link, title) => {
  return addElementValue(
    selector,
    `<video src=${link} alt=${title} autoplay="autoplay" muted="true" loop="true" playsinline="true" width="100%"></video>`
  );
};

const insertBold = (selector) => {
  return addElementValue(selector, `<b>Tutaj wstaw tekst</b>`);
};

const insertEmphasize = (selector) => {
  return addElementValue(selector, `<em>Tutaj wstaw tekst</em>`);
};

const insertAttachment = (sectionSelector) => {
  if (getElementBy("#insert").classList.contains("link")) {
    insertLink(sectionSelector, getElementValue("#source-link"), getElementValue("#source-title"));
    removeClass("#insert", "link");
  }
  if (getElementBy("#insert").classList.contains("obraz")) {
    insertImg(sectionSelector, getElementValue("#source-link"), getElementValue("#source-title"));
    removeClass("#insert", "obraz");
  }
  if (getElementBy("#insert").classList.contains("video")) {
    insertVideo(sectionSelector, getElementValue("#source-link"), getElementValue("#source-title"));
    removeClass("#insert", "video");
  }
};

const insertItemHTML = (existingElementSelector, newElementHtml) => {
  return getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
};

const getItemHTML = (item) => {
  if (item.title == null)
    return `<a href="/news/${item._id}" class="list-group-item list-group-item-action text-center">Fizyczne nowinki - ${new Date(
      item.date
    ).toLocaleString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}<p class="text-center m-1" style="font-size:15px;"><em>Tematyka wpisu: ${item.description}<em></p></a>`;
  else return `<a href="/article/${item._id}" class="list-group-item list-group-item-action text-center">${item.title}</a>`;
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

const renderContent = (items) => {
  items.forEach((element, index) => {
    if (items[index]._id == getElementBy(".post-title").id) return insertItemHTML(".font-weight-bold", getContentHTML(items[index]));
  });
};

const renderLastArticles = (article1, article2, article3) => {
  insertItemHTML(".articles", getItemHTML(article1));
  insertItemHTML(".articles", getItemHTML(article2));
  insertItemHTML(".articles", getItemHTML(article3));
};

const renderLastNews = (news) => {
  insertItemHTML(".news", getItemHTML(news));
};

const notFilledArticleInput = () => {
  return getElementValue("#title") == ""
    ? true
    : getElementValue("#translation") == ""
    ? true
    : getElementValue("#name") == ""
    ? true
    : getElementValue("#source") == ""
    ? true
    : getElementValue("#date") == ""
    ? true
    : false;
};

const notFilledNewsInput = () => {
  return getElementValue("#name") == "" ? true : getElementValue("#news") == "" ? true : getElementValue("#date") == "" ? true : false;
};

const changeClass = (selector, removedClass, newClass) => {
  removeClass(selector, removedClass);
  setClass(selector, newClass);
};

const resetInputLink = () => {
  setElementValue("#source-link", "");
  setElementValue("#source-title", "");
};

const setClass = (selector, newClass) => {
  return getElementBy(selector).classList.add(newClass);
};

const removeClass = (selector, removedClass) => {
  return getElementBy(selector).classList.remove(removedClass);
};

const handleInputUtlis = (selector) => {
  return handleEventListener(`.${selector}`, "click", (e) => {
    if (selector == "bold") {
      return insertBold("#news" || "#translation");
    }
    if (selector == "emphasize") {
      return insertEmphasize("#news" || "#translation");
    }
    setClass("#insert", selector);
    changeClass("#insert", "d-none", "d-grid");
    getElementsBy(".form").forEach((el) => (el.style.display = "none"));
    setText(".add-btn", `Dodaj ${selector}`);
  });
};

const handleSubmitBtn = (target) => {
  handleEventListener("#submitBtn", "click", (e) => {
    if (getElementBy("#password").classList.contains("d-none")) {
      e.preventDefault();
      changeClass("#password", "d-none", "d-grid");
      getElementsBy(".field").forEach((el) => el.classList.add("d-none"));
    } else {
      if (target == "news") {
        if (notFilledNewsInput()) {
          return alert("Uzupełnij wszystkie puste miejsca.");
        }
        sendData(`/add/${target}`, {
          password: getElementValue("#password-input"),
          content: new News(getElementValue("#name"), getElementValue("#news"), getDate("#date"), getElementValue("#description")),
        });
      }
      if (target == "translation") {
        if (notFilledArticleInput()) {
          return alert("Uzupełnij wszystkie puste miejsca.");
        }
        sendData(`/add/${target}`, {
          password: getElementValue("#password-input"),
          content: new Article(
            getElementValue("#title"),
            getElementValue("#translation"),
            getElementValue("#source"),
            getElementValue("#name"),
            getDate("#date")
          ),
        });
      }
    }
  });
};
