import { printProducts } from './ui.js';

const baseURL = 'https://academlo-api-production.up.railway.app/api';
let editingID = null;


function getProducts () {
    axios.get(`${baseURL}/products`)
        .then(function (response){
            const products = response.data;
            printProducts(products);
        })
        .catch(function(error){
            console.log(error)
        })
};

let productStorage = JSON.parse(localStorage.getItem('products')) || [];


function addProduct (id) {
    axios.get(`${baseURL}/products/${id}`)
        .then(function (response) {
            editingID = id;
            const product = response.data;
            console.log("product",product)
            productStorage.push(product)
            localStorage.setItem('products', JSON.stringify(productStorage))

            const data=[];
            let cant=0;

            data.push(
                {
                    "idF": cant,
                    "imageFD":product.images.image1,
                    "imageFA":product.images.image2,
                    "productF":product.name,
                    "priceF":product.price,
                }
            );
            let id_row='row'+cant;
            let fila=`<tr id="${id_row}">
                        <td>
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner ">
                                <div class="carousel-item active">
                                    <img class="d-block w-50" src="${product.images.image1}" alt="First slide">
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-50" src="${product.images.image2}" alt="Second slide">
                                </div>
                                </div>
                            </div>
                        </td>
                        <td>${product.name}</td>
                        <td>$ ${product.price.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteF(${cant})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>`;
            $("#lista").append(fila);
            cant++;
        })
        .catch(function(error){
            alert('No se pudo cargar la tarea')
        })
};

function deleteTask (id) {
    axios.get(`${baseURL}/products/${id}`)
        .then(function (response) {
            editingID = id;
            let productsDelete = JSON.parse(localStorage.getItem('products'))           
            let products = productsDelete.filter(element => element.id !== editingID)
            localStorage.clear();
            localStorage.setItem('products', JSON.stringify(products));
            location.reload();
        })
        .catch(function(error){
            alert('No se pudo cargar la tarea')
        })
}

function pushProduct(products) {
    let html = '';
    for(let i = 0; i < products.length; i++) {
        html += `<tr>
                    <td>
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner ">
                              <div class="carousel-item active">
                                <img class="d-block w-50" src="${products[i].images.image1}" alt="First slide">
                              </div>
                              <div class="carousel-item">
                                <img class="d-block w-50" src="${products[i].images.image2}" alt="Second slide">
                              </div>
                            </div>
                        </div>
                    </td>
                    <td>${products[i].name}</td>
                    <td>$ ${products[i].price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteTask(${products[i].id})">
                            <i class="fas fa-trash-alt"></i>
                         </button>
                    </td>
                </tr>`;
    }
    const container = document.getElementById("product-id");
    container.innerHTML += html;
}
pushProduct(productStorage);

export { getProducts, addProduct, deleteTask };