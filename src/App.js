// import "bootstrap/dist/css/bootstrap.min.css"
// import Login from "./Login"
// import Dashboard from "./Dashboard"

// const code = new URLSearchParams(window.location.search).get("code")

// function App() {
//   return code ? <Dashboard code={code} /> : <Login />
// }

// export default App

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 */

const client_id = 'c2a4494357864a72a025e47f24f0355c'; 
const client_secret = 'f10394ff7c314d50b9e4c6587ad9028f';

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  return await response.json();
}

async function getTrackInfo(access_token) {
  const response = await fetch("https://api.spotify.com/v1/tracks/c2a4494357864a72a025e47f24f0355c", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
  });

  return await response.json();
}

getToken().then(response => {
  getTrackInfo(response.access_token).then(profile => {
    console.log(profile)
  })
});