import{a as y,S as h,i as a}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const g="https://pixabay.com/api/",b="YOUR_API_KEY";async function L(i,t=1){const o={key:b,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:12,page:t};try{return(await y.get(g,{params:o})).data}catch(s){throw console.error("Error fetching images:",s),s}}const d=document.querySelector(".gallery");let c;function E(i){const t=i.map(({webformatURL:o,largeImageURL:s,tags:e,likes:r,views:n,comments:m,downloads:p})=>`
      <a class="gallery-item" href="${s}">
        <img src="${o}" alt="${e}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${r}</p>
          <p><b>Views:</b> ${n}</p>
          <p><b>Comments:</b> ${m}</p>
          <p><b>Downloads:</b> ${p}</p>
        </div>
      </a>
    `).join("");d.innerHTML=t,c?c.refresh():c=new h(".gallery a")}function S(){d.innerHTML=""}const v=document.querySelector("#search-form"),l=document.querySelector(".loader");let u=1,f="";v.addEventListener("submit",async i=>{i.preventDefault();const t=i.target.searchQuery.value.trim();if(!t){a.error({title:"Error",message:"Search field cannot be empty!"});return}S(),l.classList.remove("hidden"),f=t,u=1;try{const o=await L(f,u);if(o.hits.length===0){a.info({title:"No results",message:"Try another search term."});return}E(o.hits)}catch{a.error({title:"Error",message:"Failed to fetch images."})}finally{l.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
