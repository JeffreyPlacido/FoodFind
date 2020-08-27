export default function sendFavorites(label, groceries, email) {
  fetch("/addfavorites", {
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
