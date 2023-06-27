// Thumbnail Pagination
const thumbnailBtnContainer = document.querySelectorAll(
  ".main-display__thumbnail"
);
const arrowNext = document.querySelectorAll(
  ".swiper-navigation__button.next"
);
const arrowBefore = document.querySelectorAll(
  ".swiper-navigation__button.before"
);

const addItem = document.querySelector(
  ".btn-amount__icon--plus"
);
const reduceItem = document.querySelector(
  ".btn-amount__icon--minus"
);
const counterText = document.querySelector(
  ".btn-amount__counter"
);
const addToCart = document.querySelector(
  ".cart-add__submit"
);
const cartPopup = document.querySelector(
  ".cart-popup__wrapper"
);
const checkOutBtn = document.querySelector(".cart__submit");
const emptyPopupMsg = document.querySelector(
  ".cart-popup__content--empty"
);

const checkoutIcon = document.querySelector(
  ".nav-profile__notif"
);
const popupWrapper = document.querySelector(
  ".cart-popup-wrapper"
);
const customProp = document.querySelector(":root");

// Available items (only 1 if we follow frontendmentor's starter code)
const itemList = [
  {
    name: "Fall Limited Edition Sneakers",
    price: "125", // $125.00,
  },
];
const initCartHTML = cartPopup.innerHTML;

// Stores the current slide position, item amount on the + - button & order amount
let currentSlide = 0,
  itemAmount = 0,
  ordered = 0,
  totalOrdered = 0;

const orderArr = [];

// Set initial value of the add to cart counter text
counterText.textContent = 0;

// Checks whether order is empty or not
function isEmpty(arr) {
  return arr.length === 0 ? true : false;
}

// Adds event listener to the thumbnail on desktop mode
thumbnailBtnContainer.forEach((current, index) => {
  const thumbnailBtn = current.querySelectorAll(
    ".main-display__thumbnail-preview"
  );
  const swiperContent =
    current.previousElementSibling.querySelector(
      ".swiper__container"
    );
  for (const [index, thumbnail] of thumbnailBtn.entries()) {
    thumbnail.addEventListener("click", () => {
      resetSelection(
        thumbnailBtn,
        "thumbnail-preview-selected"
      );
      thumbnail.classList.add("thumbnail-preview-selected");

      currentSlide = index;

      changeSlide(swiperContent, index);
    });
  }
  // Switching slide with arrows.
  arrowNext[index].addEventListener("click", () => {
    if (currentSlide < thumbnailBtn.length - 1)
      currentSlide++;
    changeSlide(swiperContent, currentSlide);
    changeThumbnail(thumbnailBtn, currentSlide);
  });

  arrowBefore[index].addEventListener("click", () => {
    if (currentSlide > 0) currentSlide--;
    changeSlide(swiperContent, currentSlide);
    changeThumbnail(thumbnailBtn, currentSlide);
  });
});

// Media querry for > 550px
const mediaQuery = window.matchMedia("(min-width:550px)");

// opening dekstop slider modal
const desktopContainer = document.querySelector(
  ".not-fullscreen"
);

desktopContainer.addEventListener("click", () => {
  if (!mediaQuery.matches) return;
  desktopExit.classList.remove("closed");
});

// Closing dekstop slider modal

const desktopExitBtn = document.querySelector(
  ".desktop-modal__exit"
);
const desktopExit = document.querySelector(
  ".fullscreen-slider"
);

desktopExit.addEventListener("click", (event) => {
  if (event.target.closest(".swiper-wrapper")) return;
  if (event.target.closest(".main-display__thumbnail"))
    return;
  desktopExit.classList.add("closed");
});

desktopExitBtn.addEventListener("click", (event) => {
  desktopExit.classList.add("closed");
});
// remove className from every item in a nodelist
function resetSelection(nodes, className) {
  for (const node of nodes) {
    node.classList.remove(`${className}`);
  }
}

// Transforms the css element to move corresponding the input argument
function changeSlide(swiper, to) {
  swiper.style.transform = `translateX(-${to * 100}%)`;
}

// Changes thumbnail selection indicator so that it follows when we press the arrow navigation
function changeThumbnail(thumbnail, to) {
  resetSelection(thumbnail, "thumbnail-preview-selected");
  thumbnail[to].classList.add("thumbnail-preview-selected");
}

// ==== SLIDER END ====

// Desktop Navigation bar
const mobileNavBtn = document.querySelector(".nav__expand");
const mobileNav = document.querySelector(".mobile__nav");
const mobileNavClose = document.querySelector(
  ".mobile__nav-close"
);

mobileNavBtn.addEventListener("click", () => {
  mobileNav.classList.add("opened");
});

window.addEventListener("click", (event) => {
  if (event.target.closest(".nav__expand")) return;
  if (event.target.closest(".mobile__nav")) return;
  mobileNav.classList.remove("opened");
});

mobileNavClose.addEventListener("click", () => {
  mobileNav.classList.remove("opened");
});

addItem.addEventListener("click", () => {
  itemAmount++;
  updateAmount(itemAmount);
});

reduceItem.addEventListener("click", () => {
  itemAmount > 0 ? itemAmount-- : 0;
  updateAmount(itemAmount);
});

// Updates the dislayed item value on the + - button
function updateAmount(amount) {
  counterText.textContent = amount;
}

// Appends a new element everytime the submit button is clicked
function displayItem(name, price, amount) {
  const newItem = `
  <div class="cart-popup__content">
    <img src="images/image-product-1-thumbnail.jpg" alt=""/>
    <div class="cart-popup__content--info">
      <h4 class="paragraph">
        ${name}
      </h4>
      <p class="paragraph">
        $${price}.00 x ${amount}
          <span class="paragraph--bold">
            $${price * amount}.00
          </span>  
      </p>
    </div>
    <i class="bx bx-trash"></i>
  </div>`;

  orderArr.push(newItem);
}

function printOrder() {
  let printed = "";
  for (const order of orderArr) {
    printed += order;
  }
  cartPopup.innerHTML = printed;
}

// Adds to cart functionality
addToCart.addEventListener("click", () => {
  if (counterText.textContent === "0") {
    displaySuccessText(false);
    return;
  }

  displaySuccessText(true);

  displayItem(
    itemList[0].name,
    itemList[0].price,
    counterText.textContent
  );
  printOrder();

  updateNotif(orderArr.length);

  updateAmount("0");

  updateCheckoutBtn();

  itemAmount = 0;
});

// Updates the checkout button visibility
function updateCheckoutBtn() {
  orderArr.length > 0
    ? checkOutBtn.classList.remove("cart-empty")
    : checkOutBtn.classList.add("cart-empty");

  emptyPopupMsg.style.display =
    orderArr.length > 0 ? "none" : "flex";
}

// Opens the checkout accordion
checkoutIcon.addEventListener("click", () => {
  popupWrapper.classList.toggle("open");
});

// Hiding the element when we click outside of the popup
document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-profile__notif")) return;
  if (event.target.closest(".bx-trash")) return;
  if (!event.target.closest(".cart-popup-wrapper"))
    popupWrapper.classList.remove("open");
});

// Displays the indicator if an add to cart action is successful or not,
// state manages the condition whether to send the success or fail msg
function displaySuccessText(state) {
  state
    ? setAddToCartMsg("Item Has Been Added")
    : setAddToCartMsg("No Item Detected");
  addToCart.classList.add("success");
  setTimeout(() => {
    addToCart.classList.remove("success");
  }, 1000);
}

// Sets the custom property value for the add to cart ::after pseudo element
function setAddToCartMsg(msg) {
  customProp.style.setProperty(
    "--msg-add-to-cart",
    `"${msg}"`
  );
}

function updateNotif(amount) {
  orderArr.length > 0
    ? checkoutIcon.classList.remove("empty")
    : checkoutIcon.classList.add("empty");
  customProp.style.setProperty(
    "--msg-notif-amount",
    `"${amount}"`
  );
}

// Remove Item functionality, adds an event listener every time add to cart is pressed
function addEventlistenerTrash() {
  trashIcon = [...document.querySelectorAll(".bx-trash")];
  for (const [index, trash] of trashIcon.entries()) {
    trash.addEventListener("click", () => {
      orderArr.splice(index, 1);
      trashIcon.splice(index, 1);
      updateNotif(orderArr.length);
      printOrder();

      if (orderArr.length === 0) {
        updateCheckoutBtn();
      }
    });
  }
}

// Everytime the child element is removed, run the event listener
const mutationObserver = new MutationObserver((entries) => {
  addEventlistenerTrash();
});

mutationObserver.observe(cartPopup, { childList: true });
