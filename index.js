import{S as f,i as a}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function g(s){const t=document.querySelector(".gallery"),o=s.map(({webformatURL:e,largeImageURL:r,tags:i,likes:c,views:l,comments:u,downloads:p})=>`
        <div class="photo-card">
          <a href="${r}" class="gallery-link">
            <img src="${e}" alt="${i}" loading="lazy" class="gallery-image" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${c}</p>
            <p><b>Views:</b> ${l}</p>
            <p><b>Comments:</b> ${u}</p>
            <p><b>Downloads:</b> ${p}</p>
          </div>
        </div>
      `).join("");t.innerHTML=o,new f(".gallery a").refresh()}const m="https://pixabay.com/api/",d="YOUR_API_KEY";async function h(s,t=1,o=12){const n=`${m}?key=${d}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`;try{const e=await fetch(n);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const r=await e.json();if(r.hits.length===0)throw new Error("No images found for your search query.");return r}catch(e){throw console.error("Error fetching images:",e),e}}const y=document.querySelector("#search-form"),b=document.querySelector('input[name="searchQuery"]'),w=document.querySelector(".gallery");let $=1;y.addEventListener("submit",S);async function S(s){s.preventDefault();const t=b.value.trim();if(!t){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}L();try{const{hits:o,totalHits:n}=await h(t,$);a.success({title:"Success",message:`Found ${n} images!`,position:"topRight"}),g(o)}catch(o){a.error({title:"Error",message:o.message||"Something went wrong. Please try again later.",position:"topRight"})}}function L(){w.innerHTML=""}
//# sourceMappingURL=index.js.map
