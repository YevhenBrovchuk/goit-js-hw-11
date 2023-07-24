
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
loadMoreBtn.style.visibility = "hidden"

let searchVAlue
async function onSubmitForm(evt) {
  
    evt.preventDefault();
  searchVAlue = formEl.elements.searchQuery.value.trim();
  loadMoreBtn.style.visibility = "hidden"
    await servicAPI(searchVAlue).then(resp => {
      if (resp.data.hits.length === 0) {
        Notiflix.Notify
          .failure("Sorry, there are no images matching your search query. Please try again.")
      }
      createMarkup(resp.data.hits)
      loadMoreBtn.style.visibility = "visible";
      // evt.currentTarget.reset()
    })
   
}

let page = 1;

async function onLoadValue() {
  page += 1;
  await servicAPI(searchVAlue, page).then(resp => {
      // if (resp.data.hits.length === 0) {
      //   Notiflix.Notify
      //     .failure("Sorry, there are no images matching your search query. Please try again.")
      // }
    if (resp.data.hits.length === 0) {
      loadMoreBtn.style.visibility="hidden"
    }
      createMarkup(resp.data.hits)
      
    }).catch(err=>console.log(err))
}


function createMarkup(arr) {
    console.log(arr.length);
    divEl.innerHTML = arr.map(val =>`<div class="photo-card">
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

