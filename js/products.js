export function getProducts(){
    return fetch("https://dummyjson.com/products?limit=10")
    .then(response => response.json())
    .then(data => data.products);
}