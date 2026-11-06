export function getProducts() {
  return fetch("./data/data.json")
    .then((response) => response.json())
    .then((dataEL) => {
      localStorage.setItem("dataStock", JSON.stringify(dataEL));
    });
}
