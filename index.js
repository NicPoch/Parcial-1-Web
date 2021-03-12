let menu;
const htmlMenu=document.querySelector("#menu");
const url="https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

async function getInfo()
{
    try 
    {
        //info= await fetch(url);
        //menu = await info.json();
        info= await fetch('./menu.json');
        menu = await info.json();
        return menu;    
    }
    catch (error) 
    {
        return 
    }
}

async function loadMenu()
{
    menu.forEach(c => {
        console.log(c);
        //crea accordion obj
        let accItem=document.createElement("div");
        accItem.className="accordion-item";
        //boton accordion
        let headerAccIt=document.createElement("h2");
        headerAccIt.className="accordion-header";
        let headerBtn=document.createElement("button");
        headerBtn.className="accordion-button";
        headerBtn.type="button";
        headerBtn.setAttribute("data-bs-toggle","collapse");
        headerBtn.setAttribute("data-bs-target",`#${c.name}`);
        headerBtn.setAttribute("aria-controls",`${c.name}`);
        let btnTxt=document.createTextNode(c.name);
        headerBtn.appendChild(btnTxt);
        headerAccIt.appendChild(headerBtn)
        accItem.appendChild(headerAccIt);
        //agregar elementos a categoria
        let products=document.createElement("div");
        products.setAttribute("data-bs-parent","menu");
        products.className="accordion-collapse collapse show";
        products.id=c.name;
        c.products.forEach(p=>{
            //Crea card
            let card=document.createElement("div");
            card.className="card";
            //crea y agrega imagen
            let cardImg=document.createElement("img");
            cardImg.src=p.image;
            cardImg.alt=p.name;
            card.appendChild(cardImg);
            //crea el cuerpo
            let cardBody=document.createElement("div");
            cardBody.className="card-body";
            //crea el nombre card
            let nameH=document.createElement("h5");
            nameH.className="card-title";
            let nameHTxt=document.createTextNode(p.name);
            nameH.appendChild(nameHTxt);
            cardBody.appendChild(nameH);
            //crea descripcion
            let desc = document.createElement("p");
            desc.className="card-text";
            let descTxt= document.createTextNode(p.description);
            desc.appendChild(descTxt);
            cardBody.appendChild(desc);
            //agregar precio
            let precio = document.createElement("h5");
            precio.className="card-title";
            let precioTxt = document.createTextNode(`$ ${p.price}`);
            precio.appendChild(precioTxt);
            cardBody.appendChild(precio);
            //agregar boton para combrar

            card.appendChild(cardBody);
            products.appendChild(card);
        });
        accItem.appendChild(products);
        htmlMenu.appendChild(accItem);
    });
}

getInfo().then((resp)=>loadMenu());