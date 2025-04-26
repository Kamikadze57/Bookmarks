const linkInput = document.querySelector("[URL]");
const addBtn = document.querySelector("[addBtn]");
const bookmarkList = document.querySelector("[bookmarkList]");

function getSavedBookmarks() {
  const saved = localStorage.getItem("bookmarks");
  return saved ? JSON.parse(saved) : [];
}

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function renderBookmark(bookmark, index) {
  const listItem = document.createElement("li");
  listItem.classList.add("bookmark_item");
  listItem.innerHTML = `
    <a class="bookmark_text" href="${bookmark.url}">${bookmark.url}</a>
    <button class="bookmark_del_btn" data-index="${index}">X</button>
  `;
  const deleteButton = listItem.querySelector(".bookmark_del_btn");
  deleteButton.addEventListener("click", function () {
    removeBookmark(index);
  });
  bookmarkList.appendChild(listItem);
}

function renderAllBookmarks(bookmarks) {
  bookmarkList.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    renderBookmark(bookmark, index);
  });
}

function addBookmark() {
  const url = linkInput.value.trim();
  if (url) {
    const bookmarks = getSavedBookmarks();
    bookmarks.push({ url });
    saveBookmarks(bookmarks);
    renderAllBookmarks(bookmarks);
    linkInput.value = "";
  }
}

function removeBookmark(indexToDelete) {
  const bookmarks = getSavedBookmarks();
  bookmarks.splice(indexToDelete, 1);
  saveBookmarks(bookmarks);
  renderAllBookmarks(bookmarks);
}

addBtn.addEventListener("click", addBookmark);

document.addEventListener("DOMContentLoaded", function () {
  const initialBookmarks = getSavedBookmarks();
  renderAllBookmarks(initialBookmarks);
});
