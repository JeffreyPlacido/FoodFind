export default function deleteFavorite(
  label,
  groceries,
  email,
  dietLabels,
  url,
  image
) {
  fetch("/deletefavorite", {
    method: "delete",
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
  }).then((response) => window.location.reload(true));
  // .then((json) => console.log(response, "-------JSON"));
}
