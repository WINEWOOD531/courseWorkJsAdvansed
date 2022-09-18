
const url = "https://swapi.dev/api/";

const LoaderElement = document.getElementById("loader");

(async () => {
    const data = await fetch(url).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });
    for (const key in data) {
        navItem(key);
    }
})();

const nav = document.querySelector("nav");
const mainContainer = document.querySelector('#main-container');
const myCardContainer = document.querySelector('#card-container');
const myFooter = document.getElementById('footer-container');

function navItem(label) {
	if(label=='people'){
    const el = document.createElement("button");
    el.setAttribute("class", "navbutton");
    el.addEventListener("click", () => loadNavLabels(label));
    el.innerText = label.toUpperCase();
    nav.appendChild(el);
    LoaderElement.classList.add('hide');
	}
}

function closeCard() {
document.getElementById('card-container').style.visibility = 'hidden';
}


async function loadNavLabels(label) {
    LoaderElement.classList.remove('hide');
    mainContainer.innerHTML = '';
    myFooter.innerHTML ='';
    myCardContainer.innerHTML ='';
    const data = await fetch(`${url}${label}`).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });;
    LoaderElement.classList.add('hide');
    for(i=0; i < data.results.length; i++){
        const item = data.results[i];
        cardItem(item.title || item.name , item.url); 
        }

    // creation buttons next & previous ----------------------------------------------------------------------//
    if(data.next){
        const nextBtn = document.createElement('button');
        datalink = data.next.substring(22);
        pageNumber = data.next.substring(35);
        nextBtn.setAttribute("class", "nextbtn");
        nextBtn.setAttribute("datalink", datalink);
        nextBtn.innerText = " Page Next "
        nextBtn.addEventListener("click", () => loadNavLabels(nextBtn.getAttribute("datalink")));
        myFooter.appendChild(nextBtn);
        }
    if(data.previous){
        const prevBtn = document.createElement('button');
        datalink = data.previous.substring(22);
        pageNumber = data.previous.substring(35);
        prevBtn.setAttribute("class", "prevbtn");
        prevBtn.setAttribute("datalink", datalink);
        prevBtn.innerText = " Page Previous "
        prevBtn.addEventListener("click", () => loadNavLabels(prevBtn.getAttribute("datalink")));
        myFooter.prepend(prevBtn);
        } 
}

async function cardItem(cardItems, cardUrl){
    const el = document.createElement('div');
    el.setAttribute("class","cardbutton");
    el.innerText = cardItems;
    el.addEventListener("click", () => loadFullCard(cardUrl))
    mainContainer.appendChild(el);   
  
}

async function loadFullCard(label) {
    LoaderElement.classList.remove('hide');
	document.getElementById('card-container').style.visibility = 'visible';
    myCardContainer.innerHTML = '';

    const infoContainer = document.createElement('div');
    infoContainer.setAttribute('id', 'specialinfo');
    infoContainer.setAttribute('class', 'carddata');

    myCardContainer.appendChild(infoContainer);
    
    const data = await fetch(label).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });
     console.log(data);
     LoaderElement.classList.add('hide');

     let splitedUrl = label.split('/');
	 
     if(splitedUrl[4] == "species"){
        document.body.style = " background-image: url(https://www.10wallpaper.com/wallpaper/1920x1080/1512/Star_Wars_The_Force_Awakens_2015_HD_Wallpaper_07_1920x1080.jpg)";
        if(screen.width < 600 && document.querySelector('nav').getAttribute('class') != 'hide'){
            document.body.style.paddingTop =   "90%";
         }
     }
     
     if(splitedUrl[4] == "people"){
        document.body.style = " background-image: url(https://images4.alphacoders.com/653/thumb-1920-653613.jpg";
        if(screen.width < 600 && document.querySelector('nav').getAttribute('class') != 'hide'){
            document.body.style.paddingTop =   "90%";
         }
     }

    loadMoviePicture(data);

     if(data.planets){
        const planetsContainer = document.createElement('div');
        planetsContainer.setAttribute('id', 'specialplanets');
        planetsContainer.setAttribute('class', 'carddata');
        planetsContainer.innerHTML += "<h4 class='fullcard'> Planets : </h4>";
        myCardContainer.appendChild(planetsContainer);
        for(i=0; i < data.planets.length; i++){
            const element = data.planets[i];
            createPlanetsBtn(element);
        }
    }
    if(data.homeworld){
            const homeContainer = document.createElement('div');
            homeContainer.setAttribute('id', 'specialhome')
            homeContainer.setAttribute('class', 'carddata');
            homeContainer.innerHTML += "<h4 class='fullcard'> Homeworld : </h4>";
            myCardContainer.appendChild(homeContainer)
            createHomeWorld(data.homeworld);
    }
	    if(data.films){   
        const container = document.createElement('div');
        container.setAttribute('id', 'specialmovies');
        container.setAttribute('class', 'carddata');
        container.innerHTML += "<h4 class='fullcard'> Films : </h4>";
        myCardContainer.appendChild(container);  
        for(i=0; i < data.films.length; i++){
                const element = data.films[i];
                createInfoBtn(element);
        }
    }
	    if(data.species){
        const speciesContainer = document.createElement('div');
        speciesContainer.setAttribute('id', 'specialspecies')
        speciesContainer.setAttribute('class', 'carddata');
        speciesContainer.innerHTML += "<h4 class='fullcard'> Species : </h4>";
        myCardContainer.appendChild(speciesContainer);
        if(data.species.length < 1 || data.species.length == undefined){
                const el = document.createElement('h3')
                el.setAttribute("class", "fullcard");
                el.innerText  += " Unknown.";
                speciesContainer.appendChild(el);
        }
        for(i=0; i < data.species.length; i++){
            const element = data.species[i];
                createSpeciesBtn(element);
        }
    }
   
    if(data.people){
        const container = document.createElement('div');
        container.setAttribute('id', 'specialresidents');
        container.setAttribute('class', 'carddata');
        container.innerHTML += "<h4 class='fullcard'> Characters : </h4>";
        myCardContainer.appendChild(container);
        for(i=0; i < data.people.length; i++){
            const element = data.people[i];
            createInfoBtn(element);
        }

    }
    
    for (const [key, value] of Object.entries(data)) {

            const whatIwant = [`${key} :  ${value}`];  

            if(key != "url" && key != "planets" && key != "height" && key != "mass" && key != "hair_color" && key != "skin_color" && key != "eye_color" && key != "starships" && key != "vehicles" && key != "species" && key != "characters" &&
               key != "created" && key!= "edited" && key !="films" && key!= "residents" && key != "homeworld" && key != "pilots" & key!= "people"){        

                createFullCard(whatIwant);
            }             
        }
}

async function loadMoviePicture(datapic){
    const aNewHope = 'https://images-na.ssl-images-amazon.com/images/I/81aA7hEEykL.jpg';
    const empireStrike = 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/36130eca001baf033aaff6778b21abf5bcfa0d16f944074c07e5e28da7f792bc._RI_V_TTW_.jpg';
    const returnOfjedi = 'https://images-na.ssl-images-amazon.com/images/I/81g8vEs4ixL.jpg';
    const phantomMenace = 'https://www.cinemaffiche.fr/4015-tm_thickbox_default/star-wars-la-menace-fantome-episode-1-star-wars-1-the-phantom-menace.jpg';
    const attackOfClones = 'https://images-na.ssl-images-amazon.com/images/I/91bvd0Yxd4L.jpg';
    const sithRevenge = 'https://fr.web.img3.acsta.net/medias/nmedia/18/35/53/23/18423997.jpg';
    if(datapic.title && datapic.title.includes('Hope')){
        createMovieImg(aNewHope);
    }
    if(datapic.title && datapic.title.includes('Empire')){
        createMovieImg(empireStrike);
    }
    if(datapic.title && datapic.title.includes('Return of')){
        createMovieImg(returnOfjedi);
    }
    if(datapic.title && datapic.title.includes('Phantom Menace')){
        createMovieImg(phantomMenace);
    }
    if(datapic.title && datapic.title.includes('Attack')){
        createMovieImg(attackOfClones);
    }
    if(datapic.title && datapic.title.includes('Revenge')){
        createMovieImg(sithRevenge);
    }
}

async function createMovieImg($param){
    const infoCard = document.getElementById('specialinfo');
    const img = document.createElement('img');
    img.setAttribute('src', $param);
    img.setAttribute('class', 'cardimg');
    infoCard.appendChild(img);
}


async function createInfoBtn(parameter){
    const data = await fetch(`${parameter}`).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });
    console.log(data);
    console.log('ici pour debug')
    
    if(data.name){
        const newBtn = document.createElement("button");
        const myContainer = document.getElementById('specialresidents'); 

        newBtn.innerText = data.name+" ";
        newBtn.setAttribute("class", "fullcardbtn");
        newBtn.addEventListener("click", () => loadFullCard(parameter));

        myContainer.appendChild(newBtn);
        const vimg = document.createElement('img');
        vimg.setAttribute('src', 'https://cdn0.iconfinder.com/data/icons/star-wars-3/154/droid-helmet-soldier-star-wars-256.png');
        vimg.setAttribute('class', 'vehicleimg');
        newBtn.appendChild(vimg);
        
    }
    if(data.title){
        const newBtn = document.createElement("button");
        const myMovieContainer = document.getElementById('specialmovies');

        newBtn.innerText = data.title+" ";
        newBtn.setAttribute("class", "moviecardbtn");
        newBtn.addEventListener("click", () => loadFullCard(parameter));
        myMovieContainer.appendChild(newBtn);
        const vimg = document.createElement('img');
        vimg.setAttribute('src', 'https://as1.ftcdn.net/v2/jpg/02/05/18/44/1000_F_205184418_t91TINxilW8CT2aWEqVW9J8b6CKf8iss.jpg');
        vimg.setAttribute('class', 'vehicleimg');
        newBtn.appendChild(vimg); 
    }
}

async function createPlanetsBtn(parameter){
    const data = await fetch(`${parameter}`).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });
    
    if(data.name){
        const newBtn = document.createElement("button");
        const myContainer = document.getElementById('specialplanets'); 

        newBtn.innerText = data.name+" ";
        newBtn.setAttribute("class", "fullcardbtn");
        newBtn.addEventListener("click", () => loadFullCard(parameter));

        myContainer.appendChild(newBtn);
        const vimg = document.createElement('img');  
        vimg.setAttribute('src', 'https://cdn4.iconfinder.com/data/icons/star-wars-13/50/30-512.png');
        vimg.setAttribute('class', 'vehicleimg');
        newBtn.appendChild(vimg);      
    }
}

async function createHomeWorld(parameter){
    const data = await fetch(`${parameter}`).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });

    const homeBox = document.getElementById('specialhome');
    const homeWorldBtn = document.createElement("button");
    homeWorldBtn.innerText = "HomeWorld : "+data.name+" ";
    homeWorldBtn.setAttribute("class", "fullcardbtn");
    homeWorldBtn.addEventListener("click", () => loadFullCard(parameter));

    const vimg = document.createElement('img');
    vimg.setAttribute('src', 'https://cdn4.iconfinder.com/data/icons/star-wars-13/50/30-512.png');
    vimg.setAttribute('class', 'vehicleimg');
    homeWorldBtn.appendChild(vimg);

    homeBox.appendChild(homeWorldBtn);

}

async function createSpeciesBtn(parameter){
    const data = await fetch(`${parameter}`).then((res) => res.json()).catch(function(error) {
        console.log(error);
      });
    const speciesBox = document.getElementById('specialspecies');

    const newBtn = document.createElement("button");    
        newBtn.innerText = data.name+" ";
        newBtn.setAttribute("class", "speciesbtn");
        newBtn.addEventListener("click", () => loadFullCard(parameter));
        speciesBox.appendChild(newBtn);
        const vimg = document.createElement('img');
        vimg.setAttribute('src', 'https://cdn4.iconfinder.com/data/icons/star-wars-13/50/63-256.png');
        vimg.setAttribute('class', 'vehicleimg');
        newBtn.appendChild(vimg);      
}

async function createFullCard(param){
    const infoCard = document.getElementById('specialinfo');
    const el = document.createElement('h3')
    el.setAttribute("class", "fullcard");
    el.innerText = param;
    infoCard.appendChild(el);
}

async function loadCardButtons(param){
    const el = document.createElement('button')
    el.setAttribute("class", "buttoncard");
    el.innerText = param;

    myCardContainer.appendChild(el);

}

if(screen.width > 600){
    const menu = document.getElementById('menuctn');
    menu.classList.add('hide');
    const nav = document.querySelector('nav')
    nav.classList.remove('hide');
    console.log(screen.width);
} else if(screen.width < 600) {
    const menu = document.getElementById('menuctn');
    menu.classList.remove('hide');
}
console.log(screen.width);
if(document.getElementById('menubtn') && screen.width < 600){
    const nav = document.querySelector('nav')
    mainContainer.addEventListener('click', ()=> { nav.classList.add('hide');})
    const menu = document.getElementById('menubtn');
    menu.addEventListener('click', () => { specialfunction();    })
}

function specialfunction() { 
                            const nav = document.querySelector('nav')  
                            nav.classList.toggle('hide');
                            if(document.querySelector('nav').getAttribute('class') == 'hide'){
                                console.log(document.querySelector('nav').getAttribute('class'));
                                document.body.style.paddingTop = "0";
                            } else {
                                  document.body.style.paddingTop =   "90%" ;
                            }  
                        }