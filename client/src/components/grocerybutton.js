export default function sendGroceries(
  label,
  groceries,
  email,
  dietLabels,
  url
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
    }),
  }).then((response) => response.json());
}
