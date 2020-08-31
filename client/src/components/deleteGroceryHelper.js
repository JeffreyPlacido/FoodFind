export default function deleteGrocery(item) {
  fetch("/deletegroceries", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordernumber: item.ordernumber,
    }),
  }).then((response) => window.location.reload(true));
}
