import{S as y,i as a}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const h="https://pixabay.com/api/",L="ВАШ_КЛЮЧ";async function $(o,t=1,n=12){const s=`${h}?key=${L}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${n}`;try{const e=await fetch(s);if(!e.ok)throw new Error("HTTP error! status: "+e.status);return await e.json()}catch(e){throw console.error("Error fetching images:",e),e}}let c=null;function w(o){const t=document.querySelector(".gallery"),n=o.map(({webformatURL:s,largeImageURL:e,tags:r,likes:i,views:m,comments:p,downloads:g})=>`<li>
          <a href="${e}">
            <img src="${s}" alt="${r}" loading="lazy" />
          </a>
          <div class="info">
            <p>Likes: ${i}</p>
            <p>Views: ${m}</p>
            <p>Comments: ${p}</p>
            <p>Downloads: ${g}</p>
          </div>
        </li>`).join("");t.insertAdjacentHTML("beforeend",n),c?c.refresh():c=new y(".gallery a")}function E(){document.querySelector(".gallery").innerHTML=""}const u=document.getElementById("search-form"),d=document.getElementById("loader");let f=1,l="";u.addEventListener("submit",async o=>{if(o.preventDefault(),l=u.searchQuery.value.trim(),!l){a.error({message:"Please enter a search query."});return}f=1,E(),d.classList.remove("hidden");try{const t=await $(l,f);t.hits.length===0?a.warning({message:"No images found."}):w(t.hits)}catch{a.error({message:"Error fetching images."})}finally{d.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
