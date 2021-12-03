const reviewButton = document.querySelector(".review");
const reviewModal = document.querySelector(".reviewModal_background");

let isReviewModal = false;

const reviewModalVisibility = (modal) => {
  modal.style.display = "block";
  isReviewModal = true;
};

const handleReview = ({ target }) => {
  if (target === reviewButton) {
    reviewModalVisibility(reviewModal);
  } else {
    if (isReviewModal) {
      if (target === reviewModal) {
        reviewModal.style.display = "none";
        isReviewModal = false;
      }
    }
  }
};

document.addEventListener("click", handleReview);
