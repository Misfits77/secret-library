import CreatePosts from "./CreatePosts.js";
import { useEffect, useState } from "react";
import { getDoc, addDoc, collection, doc, getDocs } from "firestorage";

function SeePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const FilthySecrets = getDocs(doc("FilthySecrets")).data();
    setPosts(FilthySecrets);
  }, []);

  const newSecret = (title, secret) => {
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
      {" "}
      {posts.map((post) => {
        const secret = getDoc(doc("FilthySecrets", post.id)).data();
        const date = new Date(secret.date);
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const localDate = date.toLocaleDateString(undefined, options);

        return (
          <div key={secret.id}>
            <h3>{secret.title}</h3>
            <p>{localDate}</p>
            <p>{secret.description}</p>
            <hr />
          </div>
        );
      })}
      <CreatePosts newSecret={newSecret} />
    </>
  );
}

export default SeePosts;
