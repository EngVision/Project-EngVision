var myHeaders = new Headers();
myHeaders.append(
  "sec-ch-ua",
  '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"'
);
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Referer", "http://localhost:3000/");
myHeaders.append(
  "baggage",
  "sentry-environment=production,sentry-release=bf4e09d1cf8406c876e8d5f26080f36004906a9f,sentry-public_key=d075b2461ba0eea09869df4ef76d45f4,sentry-trace_id=77c5d76f28ca471e8c81b0ad1d7e8075,sentry-sample_rate=0.5,sentry-sampled=true"
);
myHeaders.append(
  "sentry-trace",
  "77c5d76f28ca471e8c81b0ad1d7e8075-b44351190de8894f-1"
);
myHeaders.append("sec-ch-ua-platform", '"Windows"');

var raw = JSON.stringify({
  user: "testdocker1",
  password: {
    digest: "a929cdf3bcf4e67f7dc0d9de99eeab69510f1daac755e451b127632be505f69b",
    algorithm: "sha-256",
  },
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:5001/api/v1/login", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
