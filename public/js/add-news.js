"use strict";

handleSubmitBtn("news");
handleInputUtlis("link");
handleInputUtlis("obraz");
handleInputUtlis("video");
handleInputUtlis("bold");
handleInputUtlis("emphasize");

handleEventListener(".add-btn", "click", (e) => {
  insertAttachment("#news");
  getElementsBy(".form").forEach((el) => (el.style.display = "block"));
  changeClass("#insert", "d-grid", "d-none");
  resetInputLink();
});
