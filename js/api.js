export async function getProducts() {
  const response = await fetch("./data/data.json");
  if (!response.ok) {
    throw new Error("Error lors du chargement des produits");
  }
  const dataEL = await response.json();
  localStorage.setItem("dataStock", JSON.stringify(dataEL));
}
