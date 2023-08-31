var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var productList;
var indexProduct;


if(localStorage.getItem("myData")==null)
{
     productList=[];
}
else
{
    productList=JSON.parse( localStorage.getItem("myData"));
    displayProduct();
}

var products = {
    name:"",
    price:"",
    category:"",
    desc:"",
}


function addProduct()
{
    
    if(productNameInput.value==""){
        window.alert("enter your product name ...");
    }
    else if(productPriceInput.value =="")
    {
        window.alert("enter your product price ...");

    }
    else if(productCategoryInput.value =="")
    {
        window.alert("enter your product Category ...");

    }
    else if(productDescInput.value=="")
    {
        window.alert("enter your product desc ...");

    }
    else
    {
            if(document.getElementById("formButton").innerHTML=="update"){
                clickUpdate(indexProduct);
            }
            else
            {
                products.name = productNameInput.value;
                products.price = productPriceInput.value;
                products.category = productCategoryInput.value;
                products.desc = productDescInput.value;

                productList.push(products);

                localStorage.setItem("myData",JSON.stringify(productList));
                
                displayProduct();
                clearForm();
            }
    }
}

function displayProduct()
{
    var cont = "";
    for( i=0; i<productList.length; i++)
    {
        cont += `
        <tr>
           <td>${i}</td>
           <td>${productList[i].name}</td>
           <td>${productList[i].price}</td>
           <td>${productList[i].category}</td>
           <td>${productList[i].desc}</td> 
           <td><button onclick ="updateProduct(${i})" class=" btn btn-outline-light">update</button></td>
           <td><button onclick ="deleteProduct(${i})" class=" btn btn-outline-danger">delete</button></td>
        </tr>`
    }
    
    
    document.getElementById("tBody").innerHTML = cont;

}
function clearForm()
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function searchProduct(term)
{
    var resultTubal=``;
    var resultName=``;
    
    
    for(i=0; i<productList.length;i++)
    {
        if(productList[i].name.includes(term.trim()))
        {
            resultTubal += ` 
            <tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td> 
                <td><button onclick ="updateProduct(${i})" class=" btn btn-outline-light">update</button></td>
           <td><button onclick ="deleteProduct(${i})" class=" btn btn-outline-danger">delete</button></td>
            </tr>`;

                
            resultName += `<p>${productList[i].name}</p>`.replace(term,`<span class="colorSearch">${term}</span>`);
            
        }       
    }
     document.getElementById("tBody").innerHTML = resultTubal;
     document.getElementById("searchResult").innerHTML = resultName;

    if(term == ``)
    {
        resultName="";
        document.getElementById("searchResult").innerHTML = resultName;
    }

}

function deleteProduct(index)
{
    productList.splice(index,1);

    localStorage.setItem("myData",JSON.stringify(productList));
    displayProduct();

}

function updateProduct(index)
{
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescInput.value = productList[index].desc;
    document.getElementById("formButton").innerHTML="update";
    indexProduct = index;
}
function clickUpdate(index)
{
    productList[index].name = productNameInput.value;
    productList[index].price =  productPriceInput.value;
    productList[index].category = productCategoryInput.value;
    productList[index].desc = productDescInput.value;
    document.getElementById("formButton").innerHTML="addProduct";

    localStorage.setItem("myData",JSON.stringify(productList));
    displayProduct();
    clearForm();
}

