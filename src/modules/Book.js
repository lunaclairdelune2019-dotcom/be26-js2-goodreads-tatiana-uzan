import { baseURL } from "./firebaserequests.js";

export class Book {
  #title;
  #author;
  #isRead;
  #score;
  #id;
  #url;

  constructor(title, author, isRead, score, id) {
    this.#title = title;
    this.#author = author;
    this.#isRead = isRead;
    this.#score = score;
    this.#id = id;
    this.#url = `${baseURL}/${this.#id}.json`;
  }

  async patchBookIsRead(newReadingStatus) {
    const option = {
      method: "PATCH",
      body: JSON.stringify({ isRead: newReadingStatus }),
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const response = await fetch(this.#url, option);
      if (!response.ok) {
        throw new Error("Patch could't be achieved");
      }
      const data = await response.json();
      return "Patch achieved";
    } catch (error) {
      throw error;
    }
  }

  async patchBookScore(newScore) {
    const option = {
      method: "PATCH",
      body: JSON.stringify({ score: newScore }),
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(this.#url, option);
      if (!response.ok) {
        throw new Error("Patch could't be achieved");
      }
      const data = await response.json();
      return "Patch achieved";
    } catch (error) {
      throw error;
    }
  }
  
  async deleteBook() {
    const option = {
      method: "DELETE",
    };
    try {
      const response = await fetch(this.#url, option);
      if (!response.ok) {
        throw new Error("Patch could't be achieved");
      }
      const data = await response.json();
      return "Book removed from library";
    } catch (error) {
      throw error;
    }
  }

  getTitle() {
    return this.#title;
  }

  getAuthor() {
    return this.#author;
  }
  getIsRead() {
    return this.#isRead;
  }
  getScore() {
    return this.#score;
  }

  setScore(newScore) {
    this.#score = newScore;
  }
  setIsRead(newReadingStatus) {
    this.#isRead = newReadingStatus;
  }
}
