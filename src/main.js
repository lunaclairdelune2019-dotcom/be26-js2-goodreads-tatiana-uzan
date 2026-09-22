import { getAllBooks, postBook } from "./modules/firebaserequests.js";
import { Book } from "./modules/Book.js";
import { renderBookCard } from "./modules/renderbookcard.js";
const bookForm = document.querySelector("form");
const bookContainer = document.getElementById("bookContainer");

getAllBooks()
  .then(renderLibrary)
  .catch((error) => {
    console.log(error);
  });

bookForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const bookFormData = new FormData(bookForm);
    const regBookObj = Object.fromEntries(bookFormData.entries());

    const data = await postBook(regBookObj);

    const book = new Book(
      regBookObj.title,
      regBookObj.author,
      false,
      undefined,
      data.name,
    );
    bookContainer.append(renderBookCard(book));
    bookForm.reset();
  } catch (error) {
    console.log(error);
  }
});

function renderLibrary(books) {
  for (const id in books) {
    const book = new Book(
      books[id].title,
      books[id].author,
      books[id].isRead,
      books[id].score,
      id,
    );
    const bookCard = renderBookCard(book);
    bookContainer.append(bookCard);
  }
}
