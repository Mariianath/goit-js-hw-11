import{S as d,i as a}from"./assets/vendor-DUWRWV1p.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function m(s){const r=document.querySelector(".gallery"),o=s.map(({webformatURL:e,largeImageURL:t,tags:i,likes:u,views:p,comments:f,downloads:g})=>`
        <div class="photo-card">
          <a href="${t}" class="gallery-link">
            <img src="${e}" alt="${i}" loading="lazy" class="gallery-image" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${u}</p>
            <p><b>Views:</b> ${p}</p>
            <p><b>Comments:</b> ${f}</p>
            <p><b>Downloads:</b> ${g}</p>
          </div>
        </div>
      `).join("");r.innerHTML=o,new d(".gallery a").refresh()}const y="47523471-f6b5bf2e20bc9d436dc6d8dc4",h="https://pixabay.com/api/";async function b(s,r=1,o=12){const n=`${h}?key=${y}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;try{const e=await fetch(n);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching images:",e),e}}const w=document.querySelector("#search-form"),$=document.querySelector('input[name="searchQuery"]'),S=document.querySelector(".gallery");let c=1,l="";w.addEventListener("submit",L);async function L(s){s.preventDefault();const r=$.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}r!==l&&(l=r,c=1,q());try{const{hits:o,totalHits:n}=await b(r,c);if(o.length===0){a.warning({title:"No Results",message:"No images found. Try another search query.",position:"topRight"});return}a.success({title:"Success",message:`Found ${n} images!`,position:"topRight"}),m(o)}catch(o){a.error({title:"Error",message:o.message||"Something went wrong. Please try again later.",position:"topRight"})}}function q(){S.innerHTML=""}
//# sourceMappingURL=index.js.map
