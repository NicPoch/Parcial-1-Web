let menu;
const htmlMenu=document.querySelector("#menu");
const htmlCarrito=document.querySelector("#carrito");
const htmlNavbar=document.querySelector("#navCategories");
const htmlCarritoCompras=document.querySelector("#carritoDeCompras");
const url="./menu.json";//"https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let carrito =[];

htmlCarritoCompras.addEventListener("click",()=>{showCarrito();});

async function getInfo()
{
  try 
  {
    info= await fetch(url);
    menu = await info.json();
    return menu;    
  }
  catch (error) 
  {
    return error;
  }
}

async function loadMenu()
{
  htmlCarrito.appendChild(document.createTextNode(carrito.length));
  menu.forEach((c)=>{
    let li = document.createElement("li");
    li.className="nav-item";
    let a = document.createElement("a");
    a.className="nav-link";
    a.addEventListener("click",()=>{display(c.name);});
    let aTxt=document.createTextNode(c.name);
    a.appendChild(aTxt);
    li.appendChild(a);
    htmlNavbar.appendChild(li);
  });
}

const display=(categoria)=>{
  htmlMenu.innerHTML="";
  //filtra los elementos de interés
  let display = menu.filter((a)=>{return a.name===categoria;});
  //agregar el título (nombre de categoría)
  let headRow = document.createElement("row");
  let headRowH=document.createElement("h1");
  let headRowHTxt=document.createTextNode(categoria);
  headRowH.appendChild(headRowHTxt);
  headRow.appendChild(headRowH);
  htmlMenu.appendChild(headRow);
  //agregar las cards
  let foodRow=document.createElement("row");
  foodRow.id="foodRow";
  let cardG= document.createElement("div");
  cardG.className="card-group";
  display[0].products.forEach((comida)=>{
    //crea la card
    let card=document.createElement("div");
    card.className="card";
    //crea y agrega la imagen
    let cardImg=document.createElement("img");
    cardImg.src=comida.image;
    cardImg.className="card-img-top";
    card.appendChild(cardImg);
    //Crea el cuerpo
    let cardBody=document.createElement("div");
    cardBody.className="card-body";
    //agrega el nombre
    let foodName=document.createElement("h5");
    foodName.className="card-title";
    let foodNameTxt=document.createTextNode(comida.name);
    foodName.appendChild(foodNameTxt);
    cardBody.appendChild(foodName);
    //agrega la descripcion
    let foodDesc=document.createElement("p");
    foodDesc.className="card-text";
    let foodDescTxt=document.createTextNode(comida.description);
    foodDesc.appendChild(foodDescTxt);
    cardBody.appendChild(foodDesc);
    //agrega el precio
    let foodPrice=document.createElement("h5");
    foodPrice.className="card-title";
    let foodPriceTxt=document.createTextNode(`$${comida.price}`);
    foodPrice.appendChild(foodPriceTxt);
    cardBody.appendChild(foodPrice);
    //agrega el botón para agregar a carrito
    let foodBtn=document.createElement("a");
    foodBtn.classList.add("btn","btn-primary");
    foodBtn.addEventListener("click",()=>{addCarrito(comida);});
    let foodBtnTxt=document.createTextNode("Add to car");
    foodBtn.appendChild(foodBtnTxt);
    cardBody.appendChild(foodBtn);
    //agrega el body a la card
    card.appendChild(cardBody);
    cardG.appendChild(card);
  });
  foodRow.appendChild(cardG);
  htmlMenu.appendChild(foodRow);
};

const showCarrito=()=>{
  htmlMenu.innerHTML="";
  //crear el row para el header
  let rowHead=document.createElement("div");
  rowHead.className="row";
  let head=document.createElement("h1");
  let headTxt=document.createTextNode("Order Detail");
  head.appendChild(headTxt);
  rowHead.appendChild(head);
  htmlMenu.appendChild(rowHead);
  //crea la tabla 
  let table = document.createElement("table");
  table.classList.add("table","table-striped");
  let thead = document.createElement("thead");
  let theadRow=document.createElement("tr");
  let itemCol = document.createElement("th");
  let itemColTxt = document.createTextNode("item");
  itemCol.appendChild(itemColTxt);
  itemCol.setAttribute("scope","col");
  theadRow.appendChild(itemCol);
  let qtyCol = document.createElement("th");
  let qtyColTxt = document.createTextNode("Qty.");
  qtyCol.appendChild(qtyColTxt);
  qtyCol.setAttribute("scope","col");
  theadRow.appendChild(qtyCol);
  let descCol = document.createElement("th");
  let descColTxt = document.createTextNode("Description");
  descCol.appendChild(descColTxt);
  descCol.setAttribute("scope","col");
  theadRow.appendChild(descCol);
  let upCol = document.createElement("th");
  let upColTxt = document.createTextNode("Unit Price");
  upCol.appendChild(upColTxt);
  upCol.setAttribute("scope","col");
  theadRow.appendChild(upCol);
  let amtCol = document.createElement("th");
  let amtColTxt = document.createTextNode("Amount");
  amtCol.appendChild(amtColTxt);
  amtCol.setAttribute("scope","col");
  theadRow.appendChild(amtCol);
  let modCol = document.createElement("th");
  let modColTxt = document.createTextNode("Modify");
  modCol.appendChild(modColTxt);
  modCol.setAttribute("scope","col");
  theadRow.appendChild(modCol);
  thead.appendChild(theadRow);
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  let index=1;
  let cost=0;
  carrito.forEach((obj)=>{
    let bodyTr=document.createElement("tr");
    let rowTh=document.createElement("th");
    rowTh.setAttribute("scope","row");
    let rowThTxt=document.createTextNode(index);        
    rowTh.appendChild(rowThTxt);
    bodyTr.appendChild(rowTh);
    let qtyTd= document.createElement("td");
    let qtyTxt=document.createTextNode(obj.qty);
    qtyTd.appendChild(qtyTxt);
    bodyTr.appendChild(qtyTd);
    let dTd= document.createElement("td");
    let dTxt=document.createTextNode(obj.description);
    dTd.appendChild(dTxt);
    bodyTr.appendChild(dTd);
    let prTd= document.createElement("td");
    let prTxt=document.createTextNode(obj.price);
    prTd.appendChild(prTxt);
    bodyTr.appendChild(prTd);
    let aTd= document.createElement("td");
    let aTxt=document.createTextNode(obj.amount);
    aTd.appendChild(aTxt);
    bodyTr.appendChild(aTd);
    cost+=obj.amount;
    let modTd= document.createElement("td");
    let plusBtn=document.createElement("button");
    let plustBtnTxt=document.createTextNode("+");
    plusBtn.appendChild(plustBtnTxt);
    plusBtn.addEventListener("click",()=>{inc(obj.description);});
    modTd.appendChild(plusBtn);
    let minBtn=document.createElement("button");
    let minBtnTxt=document.createTextNode("-");
    minBtn.appendChild(minBtnTxt);
    minBtn.addEventListener("click",()=>{dec(obj.description);});
    modTd.appendChild(minBtn);        
    bodyTr.appendChild(modTd);
    cost+=obj.amount;
    tbody.appendChild(bodyTr);
    index++;
  });
  table.appendChild(tbody);
  htmlMenu.appendChild(table);
  //Total y confirm/cancel
  let ttlRow=document.createElement("div");
  ttlRow.className="row";
  let c6=document.createElement("div");
  c6.className="col-10";
  let ttlH=document.createElement("h3");
  ttlH.appendChild(document.createTextNode(`Total:$${cost}`));
  c6.appendChild(ttlH);
  ttlRow.appendChild(c6);
  let c31=document.createElement("div");
  c31.className="col-1";
  let cancelBtn = document.createElement("button");
  let cancelTxt=document.createTextNode("Cancel");
  cancelBtn.appendChild(cancelTxt);
  //Toca agregar modal
  cancelBtn.type="button";
  cancelBtn.className="btn";
  cancelBtn.setAttribute("data-bs-toggle","modal");
  cancelBtn.setAttribute("data-bs-target","#cancelModal");

  let cancelModal=document.createElement("div");
  cancelModal.classList.add("modal","fade");
  cancelModal.id="cancelModal";
  cancelModal.tabIndex=-1;
  cancelModal.setAttribute("aria-labelledby","cancelModalLabel");
  cancelModal.setAttribute("aria-hidden","true");

  let modalDiag=document.createElement("div");
  modalDiag.className="modal-dialog";
  let modalCont=document.createElement("div");
  modalCont.className="modal-content";
  let modalHead=document.createElement("div");
  modalHead.className="modal-header";
  let headM=document.createElement("h5");
  headM.className="modal-title";
  headM.id="cancelModalLabel";
  let headMTxt=document.createTextNode("Cancle the order");
  headM.appendChild(headMTxt);
  modalHead.appendChild(headM);
  let headBtn=document.createElement("button");
  headBtn.className="btn-close";
  headBtn.type="button";
  headBtn.setAttribute("data-bs-dismiss","modal");
  headBtn.setAttribute("aria-label","Close");
  modalHead.appendChild(headBtn);
  modalCont.appendChild(modalHead);
  let modalBody=document.createElement("div");
  modalBody.className="modal-body";
  let modalBodyP=document.createElement("p");
  let modalBodyPTxt=document.createTextNode("Are you sure about canceling the order?");
  modalBodyP.appendChild(modalBodyPTxt);
  modalCont.appendChild(modalBody);

  let modalFdooter=document.createElement("div");
  modalFdooter.className="modal-footer";

  let modalAccept=document.createElement("button");
  modalAccept.type="button";
  modalAccept.className="btn";
  modalAccept.setAttribute("data-bs-dismiss","modal");
  modalAccept.addEventListener("click",()=>{clearCarrito();});
  let modalAcceptTxt=document.createTextNode("Yes, I want to cancel my order");
  modalAccept.appendChild(modalAcceptTxt);
  modalFdooter.appendChild(modalAccept);

  let modalClose=document.createElement("button");
  modalClose.type="button";
  modalClose.className="btn";
  modalClose.setAttribute("data-bs-dismiss","modal");
  let modalCloseTxt=document.createTextNode("No, I want to continue adding products");
  modalClose.appendChild(modalCloseTxt);
  modalFdooter.appendChild(modalClose);
  modalCont.appendChild(modalFdooter);
  
  modalDiag.appendChild(modalCont);
  cancelModal.appendChild(modalDiag);
  c31.appendChild(cancelBtn);
  c31.appendChild(cancelModal);
  ttlRow.appendChild(c31);
  let c32=document.createElement("div");
  c32.className="col-1";
  let confBtn = document.createElement("button");
  let confTxt=document.createTextNode("Confirm");
  confBtn.appendChild(confTxt);
  confBtn.addEventListener("click",()=>{console.log(carrito);});
  c32.appendChild(confBtn);
  ttlRow.appendChild(c32);
  htmlMenu.appendChild(ttlRow);
};
const inc=(name)=>{
  let ind=carrito.indexOf(carrito.filter((p)=>{return p.description===name;})[0]);
  carrito[ind].qty++;
  carrito[ind].amount+=carrito[ind].price;
  showCarrito();
};

const dec=(name)=>{
  let ind=carrito.indexOf(carrito.filter((p)=>{return p.description===name;})[0]);
  carrito[ind].qty--;
  carrito[ind].amount-=carrito[ind].price;
  if(carrito[ind].qty===0)
  {
    carrito.splice(ind,1);
  }
  showCarrito();
};

const clearCarrito=()=>{
  carrito=[];
  showCarrito();
};

const addCarrito=(producto)=>
{
  if(carrito.filter((p)=>{return p.description===producto.name;}).length===0)
  {
    let toAdd={
      qty: 1,
      description: producto.name,
      price: producto.price,
      amount: producto.price
    };
    carrito.push(toAdd);
  }
  else
  {
    carrito[carrito.indexOf(carrito.filter((p)=>{return p.description===producto.name;})[0])].qty++;
    carrito[carrito.indexOf(carrito.filter((p)=>{return p.description===producto.name;})[0])].amount+=carrito[carrito.indexOf(carrito.filter((p)=>{return p.description===producto.name;})[0])].price;
  }
  let total=0;
  carrito.forEach((p)=>{
    total+=p.qty;
  });
  htmlCarrito.replaceChild(document.createTextNode(total),htmlCarrito.childNodes[0]);
};
getInfo().then(()=>loadMenu());