var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var updateInput = document.getElementById("updateIput");

var rowData = document.getElementById("rowData");

var productList = [];

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProduct(productList);
}

function addProduct() {
  if (
    validateForm(productNameInput) &&
    validateForm(productPriceInput) &&
    validateForm(productCategoryInput) &&
    validateForm(productDescInput) &&
    validateForm(productImageInput)
  ) {
      var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
    image: `./images/${productImageInput.files[0]?.name}`,
  };

  productList.push(product);
  localStorage.setItem("products", JSON.stringify(productList));
  console.log(productList);

  clearForm();
  displayProduct(productList);
  }
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = "";
  productImageInput.value = "";
}

function displayProduct(product) {
  var cartoona = "";
  for (var i = 0; i < product.length; i++) {
    cartoona += `
  <div class="col-md-3">
    <div class="card h-100 shadow">
      <img
        src=${product[i].image}
        class="card-img-top"
        alt="${product[i].name}"
      />
      <div class="card-body">
        <h2>${product[i].name}</h2>
        <p>
          ${product[i].desc}
        </p>
        <h2 class="h4">${product[i].price}</h2>
        <h2 class="h4">${product[i].category}</h2>
      </div>
      <div class="card-footer">
        <button onclick="deleteProduct(${i})" class="btn btn-danger w-100 btn-sm mb-2">Delete</button>
        <button onclick="setFormForUpdate(${i})" class="btn btn-warning w-100 btn-sm">Update</button>
      </div>
    </div>
  </div>`;
  }
  rowData.innerHTML = cartoona;
}

function search() {
  var searchResult = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      searchResult.push(productList[i]);
    }
  }
  displayProduct(searchResult);
}

function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProduct(productList);
}

// function updateProduct() {}

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var update = "";
var image = "";

function setFormForUpdate(index) {
  update = index;
  // element.value = productList[updateIndex].name;
  // productPriceInput.value = productList[updateIndex].price;
  // productCategoryInput.value = productList[updateIndex].category;
  // productDescInput.value = productList[updateIndex].desc;
  var product = productList[index];
  productNameInput.value = product.name;
  productPriceInput.value = product.price;
  productCategoryInput.value = product.category;
  productDescInput.value = product.desc;
  img = product.image;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateNewData() {
  productList[update] = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
    image:
      productImageInput.files.length > 0
        ? `./images/${productImageInput.files[0].name}`
        : img,
  };
  localStorage.setItem("products", JSON.stringify(productList));
  clearForm();
  validateForm()
  displayProduct(productList);
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function validateForm(element) {
  var regex = {
    productName: /^[A-Z]\w{2,10}[\s-]?\w{0,10}$/,
    productPrice: /^([1-9]\d{3,4}|100000)$/,
    productCategory: /^(mobile|laptop|tap|watch|tv|airpods)$/i,
    productDesc: /^.{4,100}$/,
    productImage: /(jpg|webp|png|jpeg)$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    element.nextElementSibling.classList.remove("d-none");
    return false;
  }

  console.log(regex[element.id]);
}
