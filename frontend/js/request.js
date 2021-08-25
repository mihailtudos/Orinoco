function MakeRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 201 || request.status === 200) {
          resolve(JSON.parse(request.response));
        } else {
          reject('Something went wrong!');
        }
      }
    };
    if (method === 'POST') {
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
    } else {
      request.send();
    }
  });
}

export default MakeRequest;