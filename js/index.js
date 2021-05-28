const baseURL = "http://18.231.42.102:3000/api/produtos";

async function HandlePostProduct() {
  const inputDescripton = document.querySelector("#POST-input-description");
  const data = {descricao: inputDescripton.value}

  if (!inputDescripton.value) {
    alert("Digite a descrição para o produto")
    return
  } 

  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Produto adicionado com sucesso!")
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.log(err);
    alert("Erro ao adicionar produto produto");
  }
  inputDescripton.value = ""
}

async function HandleGetOneProduct() {
  const inputId = document.querySelector("#GET-input-id");

  if (!inputId.value) {
    alert("Digite o id do produto")
    return
  } 

  try {
    const response = await fetch(`${baseURL}/${inputId.value}`, {method: "GET"});
    if (!response.ok) throw new Error(response.statusText);
    
    const data = await response.json();
    const productsWrapper = document.querySelector("#get-one .products-wrapper");
    productsWrapper.innerHTML = "";

    productsWrapper.innerHTML += `
      <div class="product">
        <p>${data.descricao}</p>
        <p>${data._id}</p>
      </div>
    `;

  } catch (err) {
    console.log(err);
    alert("Erro ao tentar listar produto");
  }
  inputId.value = ""
}

async function HandlePutProduct() {
  const inputId = document.querySelector("#PUT-input-id");
  const inputDescripton = document.querySelector("#PUT-input-description");

  if (!inputDescripton.value) {
    alert("Digite a nova descrição para o produto")
    return
  } 

  if (!inputId.value) {
    alert("Digite o id do produto")
    return
  }

  const data = {descricao: inputDescripton.value}
  
  try {
    const response = await fetch(`${baseURL}/${inputId.value}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("Produto editado com sucesso!")
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.log(err);
    alert("Erro ao editar produto");
  }
  inputId.value = ""
  inputDescripton.value = ""
}

async function HandleDeleteProduct() {
  const inputId = document.querySelector("#DELETE-input-id");

  if (!inputId.value) {
    alert("Digite a nova descrição para o produto")
    return
  } 
  
  try {
    const response = await fetch(`${baseURL}/${inputId.value}`, {method: "DELETE"});
    if (response.ok) {
      alert("Produto deletado com sucesso!")
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.log(err);
    alert("Erro ao deletar produto");
  }
  inputId.value = ""
}

async function HandleGetAllProducts() {

  try {
    const response = await fetch(baseURL);
    const data = await response.json();
  
    const productsWrapper = document.querySelector("#get-all .products-wrapper");
    productsWrapper.innerHTML = "";
  
    
    data.forEach((product) => {
      productsWrapper.innerHTML += `
        <div class="product">
          <p>${product.descricao}</p>
          <p>${product._id}</p>
        </div>
      `;
    });
  } catch (err) {
    console.log(err);
    alert("Erro ao listar produtos");
  }

}
