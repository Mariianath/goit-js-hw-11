import{S as m,i as c}from"./assets/vendor-DUWRWV1p.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function h(r){const o=document.querySelector(".gallery"),n=r.map(({webformatURL:e,largeImageURL:t,tags:s,likes:d,views:p,comments:g,downloads:y})=>`
        <div class="photo-card">
          <a href="${t}" class="gallery-link">
            <img src="${e}" alt="${s}" loading="lazy" class="gallery-image" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${d}</p>
            <p><b>Views:</b> ${p}</p>
            <p><b>Comments:</b> ${g}</p>
            <p><b>Downloads:</b> ${y}</p>
          </div>
        </div>
      `).join("");o.innerHTML=n,new m(".gallery a").refresh()}const b="47523471-f6b5bf2e20bc9d436dc6d8dc4",w="https://pixabay.com/api/";async function S(r,o=1,n=12){const i=`${w}?key=${b}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${n}`;try{const e=await fetch(i);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching images:",e),e}}const $=document.querySelector("#search-form"),L=document.querySelector('input[name="searchQuery"]'),q=document.querySelector(".gallery"),v=document.querySelector(".loader");let a=1,l="";$.addEventListener("submit",P);async function P(r){r.preventDefault();const o=L.value.trim();if(!o){f("Please enter a search query.");return}o!==l&&(E(),a=1),l=o;try{u(!0);const{hits:n,totalHits:i}=await S(o,a);if(n.length===0){f("No images found for your query. Try again!");return}O(`Found ${i} images!`),h(n)}catch(n){T(n.message||"Something went wrong. Please try again later.")}finally{u(!1)}}function E(){q.innerHTML=""}function u(r){v.style.display=r?"block":"none"}function f(r){c.warning({title:"Warning",message:r,position:"topRight"})}function O(r){c.success({title:"Success",message:r,position:"topRight"})}function T(r){c.error({title:"Error",message:r,position:"topRight"})}
//# sourceMappingURL=index.js.map
