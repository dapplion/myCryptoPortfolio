import credentials from "./credentials";

const INITIAL_DATA = JSON.stringify({});

export default function() {
  let url = window.location.href;
  let hash = window.location.hash;
  console.log("url", url, "hash", hash);

  // initialize database
  const _credentials = credentials.generate();
  // db.put(INITIAL_DATA, _credentials);

  // Redirect to new hash
  const newHash = credentials.stringify(_credentials);
  url = url.replace(hash, "");
  window.location.replace(url + "#" + newHash);
}
