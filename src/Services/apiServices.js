const API_URL = "http://hn.algolia.com/api/v1/";

const ApiServices = {
  fetch(url) {
    return fetch(API_URL + url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        return data;
      })
      .catch(error => console.log(error));
  }
};

export default ApiServices;

