import { useState } from "react";
import { addDoc, collection } from "firestorage";

function CreatePosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");

  const newSecret = () => {
    const date = new Date();
    const newPost = addDoc(collection("FilthySecrets"), {
      title: title,
      description: secret,
      date: date,
    });

    setPosts([...posts, newPost]);
  };

  return (
    <>
      <main>
        <h2>Share your disgusting secret</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newSecret();
            console.log(posts);
          }}
        >
          <label>
            <p>Title</p>
            <input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label>
            <input
              required
              placeholder="White here..."
              type="textarea"
              value={secret}
              onChange={(e) => {
                setSecret(e.target.value);
              }}
            />
          </label>
          <button>Share</button>
        </form>
      </main>
    </>
  );
}

export default CreatePosts;
