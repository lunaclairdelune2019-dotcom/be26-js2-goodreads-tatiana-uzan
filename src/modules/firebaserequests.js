export const baseURL =
  "https://goodreads-9e293-default-rtdb.europe-west1.firebasedatabase.app/Goodreads";

export async function getAllBooks() {
  try {
    const response = await fetch(baseURL + ".json");
    if (!response.ok) {
      throw new Error("Your books could not be loaded...");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postBook(newBook) {
  try {
    const option = {
      method: "POST",
      body: JSON.stringify({
        title: newBook.title,
        author: newBook.author,
        isRead: false,
        score: undefined,
      }),
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await fetch(baseURL + ".json", option);
    if (!response.ok) {
      throw new Error("Your book couldn't be added");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
