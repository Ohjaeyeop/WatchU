const body = document.querySelector("body");
const loginButton = document.querySelector("#login");
const loginModal = document.querySelector(".modal_background1");

const signUpButton = document.querySelector("#signUp");
const signUpModal = document.querySelector(".modal_background2");

let isModal = false;

const modalVisibility = (modal) => {
  modal.style.display = "block";
  isModal = true;
};

const handleClick = ({ target }) => {
  if (target === loginButton) {
    modalVisibility(loginModal);
  } else if (target === signUpButton) {
    modalVisibility(signUpModal);
  } else {
    if (isModal) {
      if (target === loginModal || target === signUpModal) {
        loginModal.style.display = "none";
        signUpModal.style.display = "none";
        isModal = false;
      }
    }
  }
};

document.addEventListener("click", handleClick);
