export async function getProducts() {
  if(localStorage.getItem("dataStock")) return;
  const response = await fetch("./data/data.json");
  if (!response.ok) {
    throw new Error("Error lors du chargement des produits");
  }
  const dataEL = await response.json();
  localStorage.setItem("dataStock", JSON.stringify(dataEL));
}
