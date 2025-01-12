import { useState } from "react";
import "./styles.css";
import useFetch from "./useFetch";

export default function App() {
  const [addBookmark, setAddBookmark] = useState(false);
  const [editBookmarkId, setEditBookmarkId] = useState(null);
  const [newBookmark, setNewBookmark] = useState({
    name: "",
    url: "",
    category: "",
  });
  const [editBookmark, setEditBookmark] = useState(null);

  //READ
  const {
    data: bookmarks,
    laoding,
    error,
  } = useFetch("https://bookmarkable-backend.vercel.app/bookmarks");

  //DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`https://bookmarkable-backend.vercel.app/bookmarks/${id}`, {
        method: "DELETE",
      });
      console.log("YOU ARE THE BEST IN THE WORLD");
    } catch (error) {
      console.log("LMAO YOU SUCK CANT EVEN DELETE ONE BOOKMARK", error);
    }
  };

  //UPDATE
  const handleUpdate = async () => {
    try {
      await fetch(
        `https://bookmarkable-backend.vercel.app/bookmarks/${editBookmark._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editBookmark),
        }
      );
      console.log("YOU ARE THE BEST IN THE WORLD");
    } catch (error) {
      console.log("LMAO YOU SUCK CANT EVEN EDIT ONE BOOKMARK", error);
    }
  };

  const handlEditChange = (e, bookmark) => {
    const { name, value } = e.target;
    setEditBookmark({
      ...bookmark,
      [name]: value,
    });
  };

  //CREATE
  const handleAdd = async () => {
    try {
      await fetch("http://localhost:3000/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookmark),
      });
      console.log("YOU ARE THE BEST IN THE WORLD");
      setAddBookmark(false);
      setNewBookmark({
        name: "",
        url: "",
        category: "",
      });
    } catch (error) {
      console.log("LMAO YOU SUCK CANT EVEN ADD ONE BOOKMARK", error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewBookmark({
      ...newBookmark,
      [name]: value,
    });
  };

  return (
    <div className="app">
      <h1>Add Bookmark</h1>
      <button onClick={() => setAddBookmark(!addBookmark)}>
        {!addBookmark ? "Open" : "Collapse"}
      </button>{" "}
      <br />
      {addBookmark && (
        <>
          <label htmlFor="bookmarkName">
            Bookmark Name: <br />
            <input
              type="text"
              name="name"
              id="bookmarkName"
              value={newBookmark.name}
              onChange={handleAddChange}
            />
          </label>
          <br />
          <label htmlFor="bookmarkURL">
            Bookmark URL: <br />
            <input
              type="text"
              name="url"
              id="bookmarkURL"
              value={newBookmark.url}
              onChange={handleAddChange}
            />
          </label>
          <br />
          <label htmlFor="bookmarkGategory">
            Bookmark Category: <br />
            <input
              type="text"
              name="category"
              id="bookmarkGategory"
              value={newBookmark.category}
              onChange={handleAddChange}
            />
          </label>{" "}
          <br />
          <button onClick={handleAdd}>Save</button>
        </>
      )}
      <h1>Bookmark Saver</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <>
            <li>
              {" "}
              <h2>
                {" "}
                <a href={bookmark.url} target="_blank">
                  {bookmark.name}
                </a>{" "}
                ({bookmark.category})
              </h2>
            </li>
            <button
              onClick={() =>
                setEditBookmarkId(
                  editBookmarkId === bookmark._id ? null : bookmark._id
                )
              }
            >
              Edit
            </button>{" "}
            <button onClick={() => handleDelete(bookmark._id)}>Delete</button>
            <br />
            {editBookmarkId === bookmark._id && (
              <>
                <label htmlFor="bookmarkName">
                  Bookmark Name: <br />
                  <input
                    type="text"
                    name="name"
                    id="bookmarkName"
                    defaultValue={bookmark.name}
                    onChange={(e) => handlEditChange(e, bookmark)}
                  />
                </label>
                <br />
                <label htmlFor="bookmarkURL">
                  Bookmark URL: <br />
                  <input
                    type="text"
                    name="url"
                    id="bookmarkURL"
                    defaultValue={bookmark.url}
                    onChange={(e) => handlEditChange(e, bookmark)}
                  />
                </label>
                <br />
                <label htmlFor="bookmarkGategory">
                  Bookmark Category: <br />
                  <input
                    type="text"
                    name="category"
                    id="bookmarkGategory"
                    defaultValue={bookmark.category}
                    onChange={(e) => handlEditChange(e, bookmark)}
                  />
                </label>{" "}
                <br />
                <button onClick={handleUpdate}>Save Changes</button>
              </>
            )}{" "}
          </>
        ))}
      </ul>
    </div>
  );
}
