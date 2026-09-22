function bookCardElements(book) {
  const readingStatusBtn = document.createElement("button");
  const scoreLabel = document.createElement("label");
  const scoreForm = document.createElement("form");
  const removeBookBtn = document.createElement("button");
  const giveScoreInput = document.createElement("input");
  const submitScoreBtn = document.createElement("button");
  const bookTitle = document.createElement("h3");
  const bookAuthorP = document.createElement("p");
  const bookImage = document.createElement("img");
  const bookCardDiv = document.createElement("div");

  bookImage.src = "/bookimage.png";
  giveScoreInput.classList.add("giveScoreInput");
  giveScoreInput.type = "number";
  giveScoreInput.max = "5";
  giveScoreInput.min = "1";
  submitScoreBtn.type = "submit";
  removeBookBtn.classList.add("delBtn");
  readingStatusBtn.classList.add("readingStatusBtn");
  bookAuthorP.classList.add("bookAuthorP");
  bookCardDiv.classList.add("bookCardDiv");

  readingStatusBtn.innerText = "Mark as read";
  removeBookBtn.innerText = "X";
  bookTitle.innerText = `${book.getTitle()}`;
  bookAuthorP.innerText = `Author: ${book.getAuthor()}`;
  scoreLabel.innerText = "Rating out of 5:";
  submitScoreBtn.innerText = "Rate";
  giveScoreInput.value = book.getScore();

  scoreForm.append(scoreLabel, giveScoreInput, submitScoreBtn);
  bookCardDiv.append(
    removeBookBtn,
    bookImage,
    readingStatusBtn,
    scoreForm,
    bookTitle,
    bookAuthorP,
  );
  return {
    bookCardDiv,
    readingStatusBtn,
    scoreForm,
    removeBookBtn,
    giveScoreInput,
    submitScoreBtn,
  };
}

export function renderBookCard(book) {
  const elements = bookCardElements(book);
  setReadingStatus(book, elements);
  deleteBookEvent(book, elements);
  readingStatusEvent(book, elements);
  submitScoreEvent(book, elements);

  return elements.bookCardDiv;
}

function setReadingStatus(book, elements) {
  const { scoreForm, readingStatusBtn, bookCardDiv } = elements;
  if (book.getIsRead() === false) {
    scoreForm.classList.add("hidden");

    readingStatusBtn.innerText = "Mark as read";
  } else {
    bookCardDiv.classList.add("read");

    readingStatusBtn.innerText = "Unmark as read";
  }
}

function deleteBookEvent(book, elements) {
  const { removeBookBtn, bookCardDiv } = elements;
  removeBookBtn.addEventListener("click", async () => {
    try {
      await book.deleteBook();
      bookCardDiv.remove();
    } catch (error) {
      throw new Error("Your book couldn't be removed from your library!");
    }
  });
}

function readingStatusEvent(book, elements) {
  const { readingStatusBtn, bookCardDiv, scoreForm } = elements;

  readingStatusBtn.addEventListener("click", async () => {
    try {
      const newReadingStatus = !book.getIsRead();

      await book.patchBookIsRead(newReadingStatus);

      book.setIsRead(newReadingStatus);

      if (book.getIsRead() === true) {
        readingStatusBtn.innerText = "Unmark as read";

        bookCardDiv.classList.add("read");
        scoreForm.classList.remove("hidden");
      } else {
        readingStatusBtn.innerText = "Mark as read";
        scoreForm.classList.add("hidden");
        bookCardDiv.classList.remove("read");
      }
    } catch (error) {
      throw new Error(error);
    }
  });
}

function submitScoreEvent(book, elements) {
  const { submitScoreBtn, giveScoreInput, scoreForm } = elements;
  submitScoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const newScore = Number(giveScoreInput.value);

    if (newScore > 5 || newScore < 1) {
      scoreForm.reset();
      return undefined;
    } else {
      try {
        await book.patchBookScore(newScore);

        book.setScore(newScore);
      } catch (error) {
        throw new Error(error);
      }
    }
  });
}
