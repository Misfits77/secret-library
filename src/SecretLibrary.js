import SeePosts from "./SeePosts.js";
import CreatePosts from "./CreatePosts.js";

function SecretLibrary() {
  return (
    <>
      <h1>Secret Library</h1>
      <p>
        A place where everyone can, anonymously, share their most repulsive and
        ashaming secrets. Ugh.
      </p>
      <SeePosts />
      <CreatePosts />
    </>
  );
}

export default SecretLibrary;
