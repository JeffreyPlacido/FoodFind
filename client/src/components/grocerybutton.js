export default function sendGroceries(
  label,
  groceries,
  email,
  dietLabels,
  url,
  image
) {
  fetch("/addgroceries", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordernumber: label,
      groceries: groceries,
      email: email,
      dietLabels: dietLabels,
      url: url,
      image: image,
    }),
  }).then((response) => response.json());
}
