export default function sendGroceries(label, groceries, email) {
  fetch("/addgroceries", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordernumber: label,
      groceries: groceries,
      email: email,
    }),
  }).then((response) => response.json());
}
