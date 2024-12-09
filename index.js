import{S as f,i as a}from"./assets/vendor-DUWRWV1p.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function g(s){const r=document.querySelector(".gallery"),o=s.map(({webformatURL:e,largeImageURL:t,tags:i,likes:c,views:l,comments:u,downloads:p})=>`
        <div class="photo-card">
          <a href="${t}" class="gallery-link">
            <img src="${e}" alt="${i}" loading="lazy" class="gallery-image" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${c}</p>
            <p><b>Views:</b> ${l}</p>
            <p><b>Comments:</b> ${u}</p>
            <p><b>Downloads:</b> ${p}</p>
          </div>
        </div>
      `).join("");r.innerHTML=o,new f(".gallery a").refresh()}const m=void 0,d="https://pixabay.com/api/";async function y(s,r=1,o=12){const n=`${d}?key=${m}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;try{const e=await fetch(n);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching images:",e),e}}const h=document.querySelector("#search-form"),b=document.querySelector('input[name="searchQuery"]'),$=document.querySelector(".gallery");let w=1;h.addEventListener("submit",S);async function S(s){s.preventDefault();const r=b.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}L();try{const{hits:o,totalHits:n}=await y(r,w);a.success({title:"Success",message:`Found ${n} images!`,position:"topRight"}),g(o)}catch(o){a.error({title:"Error",message:o.message||"Something went wrong. Please try again later.",position:"topRight"})}}function L(){$.innerHTML=""}
//# sourceMappingURL=index.js.map
