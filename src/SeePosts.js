import CreatePosts from "./CreatePosts.js";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, updateDoc } from "firestorage";

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
      likes: 0,
      dislikes: 0,
    });

    setPosts([...posts, newPost]);
  };

  const postLiked = (secret) => {
    const likedPost = posts.map((post) => {
      if (secret.id === post.id) {
        const postCopy = { ...post };
        postCopy.likes += 1;
        return postCopy;
      } else {
        return post;
      }
    });
    setPosts(likedPost);
    updateDoc(doc("FilthySecrets", secret.id), { likes: secret.likes + 1 });
  };

  const postDisliked = (secret) => {
    const dislikedPost = posts.map((post) => {
      if (secret.id === post.id) {
        const postCopy = { ...post };
        postCopy.dislikes += 1;
        return postCopy;
      } else {
        return post;
      }
    });
    setPosts(dislikedPost);
    updateDoc(doc("FilthySecrets", secret.id), {
      dislikes: secret.dislikes + 1,
    });
  };

  const sortByHandler = (value) => {
    const postCopy = [].concat(posts);

    if (value === "Liked") {
      postCopy.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    } else if (value === "Disliked") {
      postCopy.sort((a, b) => (a.dislikes > b.dislikes ? -1 : 1));
    }

    setPosts(postCopy);
  };

  return (
    <>
      <div>
        <p>Sort by</p>
        <select
          onChange={(e) => {
            sortByHandler(e.target.value);
          }}
        >
          <option value="Liked">Most voted</option>
          <option value="Disliked">Less voted</option>
        </select>
      </div>
      {posts.map((post) => {
        const date = new Date(post.date);
        const options = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        const localDate = date.toLocaleDateString(undefined, options);

        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{localDate}</p>
            <p>{post.description}</p>
            <button
              onClick={(e) => {
                postLiked(post);
              }}
            >
              Like
            </button>{" "}
            {post.likes}
            <button
              onClick={(e) => {
                postDisliked(post);
              }}
            >
              Dislike
            </button>{" "}
            {post.dislikes}
            <hr />
          </div>
        );
      })}
      <CreatePosts newSecret={newSecret} />
    </>
  );
}

export default SeePosts;
