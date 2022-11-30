import { useState } from "react";

function CreatePosts({ newSecret, posts }) {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");

  return (
    <>
      <main>
        <h2>Share your disgusting secret</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newSecret(title, secret);
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
