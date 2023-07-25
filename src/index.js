
import Notiflix from 'notiflix';
import { servicAPI } from "./servicapi";

const formEl = document.querySelector(".search-form")
const loadMoreBtn=document.querySelector(".load-more")
const divEl=document.querySelector(".gallery")
divEl.style.display = "flex";
divEl.style.flexWrap = "wrap";
divEl.style.justifyContent= "center"
formEl.addEventListener("submit", onSubmitForm)
loadMoreBtn.addEventListener("click", onLoadValue)
hidenVisibleBtn("hidden")


let searchVAlue
let page = 1;
async function onSubmitForm(evt) {
  try {
    let page = 1;
  
    evt.preventDefault();
    
  searchVAlue = formEl.elements.searchQuery.value.trim();
  if (searchVAlue === "") {
    throw new Error()
  }
    
    hidenVisibleBtn("hidden")
  const searchValueImg = await servicAPI(searchVAlue)
  console.log(searchValueImg);
  if (searchValueImg.length === 0) {
  throw new Error()
    }
    if (searchValueImg.length < 40) {
      hidenVisibleBtn("hidden")
    }
    divEl.innerHTML = createMarkup(searchValueImg)
    hidenVisibleBtn("visible")
  }
  catch (er) {
    Notiflix.Notify
    .failure("Sorry, there are no images matching your search query. Please try again.")
  } 
}



async function onLoadValue() {
  try { 
  page += 1;
  const searchValueImg = await servicAPI(searchVAlue, page)
    if (searchValueImg.length < 40) {
      hidenVisibleBtn("hidden")
    }
    divEl.insertAdjacentHTML("beforeend", createMarkup(searchValueImg))  
}
  catch (err) {
    console.log(err)
    hidenVisibleBtn("hidden")
    page = 1;
  } 
}


function createMarkup(arr) {
    console.log(arr.length);
    return arr.map(val =>`<div class="photo-card">
  <img src="${val.webformatURL} " alt="${val.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${val.likes }</b>
    </p>
    <p class="info-item">
      <b>Views; ${val.views}</b>
    </p>
    <p class="info-item">
      <b>Comments; ${val.comments }</b>
    </p>
    <p class="info-item">
      <b>Downloads; ${val.downloads }</b>
    </p>
  </div>
</div>` )
    
}



function hidenVisibleBtn(flag) {
  loadMoreBtn.style.visibility=`${flag}`
}