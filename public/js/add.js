"use strict";

handleEventListener("#submitBtn", "click", (e) => {
  if (notFilledInput()) {
    return alert("Uzupełnij wszystkie puste miejsca.");
  }
  sendData("/add", {
    password: getElementValue("#password"),
    article: new Article(
      getElementValue("#title"),
      getElementValue("#article"),
      getElementValue("#source"),
      getElementValue("#name"),
      getDate("#date")
    ),
  });
});
