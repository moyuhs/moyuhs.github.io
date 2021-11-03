HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},function(){var e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre:not(.mermaid)")),e.forEach(n=>{if(n.querySelectorAll(".code .line span").forEach(t=>{t.classList.forEach(e=>{t.classList.replace(e,`hljs-${e}`)})}),CONFIG.copycode){n.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const o=n.querySelector(".copy-btn");o.addEventListener("click",()=>{var e=(n.querySelector(".code")||n.querySelector("code")).innerText;if(navigator.clipboard)navigator.clipboard.writeText(e).then(()=>{o.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{o.querySelector("i").className="fa fa-times-circle fa-fw"});else{const t=document.createElement("textarea");t.style.top=window.scrollY+"px",t.style.position="absolute",t.style.opacity="0",t.readOnly=!0,t.value=e,document.body.append(t),t.select(),t.setSelectionRange(0,e.length),t.readOnly=!1;e=document.execCommand("copy");o.querySelector("i").className=e?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",t.blur(),o.blur(),document.body.removeChild(t)}showTip(LOCAL.copyright,"tip")}),n.addEventListener("mouseleave",()=>{setTimeout(()=>{o.querySelector("i").className="fa fa-copy fa-fw"},300)})}})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(t=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(e=>t.src.includes(e))&&!t.parentNode.matches(".video-container")){const o=document.createElement("div");o.className="video-container",t.wrap(o);var e=Number(t.width),n=Number(t.height);e&&n&&(o.style.paddingTop=n/e*100+"%")}})},registerScrollPercent:function(){const n=document.querySelector(".back-to-top"),o=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{if(n||o){var e=document.body.scrollHeight-window.innerHeight;const t=0<e?Math.min(100*window.scrollY/e,100):0;n&&(n.classList.toggle("back-to-top-on",5<=Math.round(t)),n.querySelector("span").innerText=Math.round(t)+"%"),o&&o.style.setProperty("--progress",t.toFixed(2)+"%")}if(Array.isArray(NexT.utils.sections)){let e=NexT.utils.sections.findIndex(e=>e&&10<e.getBoundingClientRect().top);-1===e?e=NexT.utils.sections.length-1:0<e&&e--,this.activateNavByIndex(e)}},{passive:!0}),n&&n.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(o=>{o.addEventListener("click",e=>{if(e.preventDefault(),!o.classList.contains("active")){const t=o.parentNode;[...t.children].forEach(e=>{e.classList.toggle("active",e===o)});const n=document.getElementById(o.querySelector("a").getAttribute("href").replace("#",""));[...n.parentNode.children].forEach(e=>{e.classList.toggle("active",e===n)}),n.dispatchEvent(new Event("tabs:click",{bubbles:!0})),CONFIG.stickytabs&&(e=t.parentNode.getBoundingClientRect().top+window.scrollY+10,window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:e}))}})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{var t;"string"==typeof e&&e.includes("ciu_embed")&&(t=e.split(":")[1],e=e.split(":")[2],document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(e,10)+5+"px")},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{var t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){const e=document.querySelectorAll(".lang-select");e.forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(t=>{const n=document.getElementById(decodeURI(t.getAttribute("href")).replace("#",""));return t.addEventListener("click",e=>{e.preventDefault();e=n.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:e,complete:()=>{history.pushState(null,document.title,t.href)}})}),n})},registerPostReward:function(){const e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(t&&!t.classList.contains("active-current")){document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),t.classList.add("active","active-current");let e=t.parentNode;for(;!e.matches(".post-toc");)e.matches("li")&&e.classList.add("active"),e=e.parentNode;const n=document.querySelector(".sidebar-panel-container");n.parentNode.classList.contains("sidebar-toc-active")&&window.anime({targets:n,duration:200,easing:"linear",scrollTop:n.scrollTop-n.offsetHeight/2+t.getBoundingClientRect().top-n.getBoundingClientRect().top})}},updateSidebarPosition:function(){if(!(window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)){var t=document.querySelector(".post-toc");let e=CONFIG.page.sidebar;"boolean"!=typeof e&&(e="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&t),e&&window.dispatchEvent(new Event("sidebar:show"))}},activateSidebarPanel:function(e){const t=document.querySelector(".sidebar-inner"),n=document.querySelector(".sidebar-panel-container"),o=["sidebar-toc-active","sidebar-overview-active"];t.classList.contains(o[e])||window.anime({duration:200,targets:n,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{t.classList.replace(o[1-e],o[e]),window.anime({duration:200,targets:n,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})},getScript:function(o,e={},t){if("function"==typeof e)return this.getScript(o,{condition:t}).then(e);const{condition:a=!1,attributes:{id:r="",async:i=!1,defer:c=!1,crossOrigin:s="",dataset:l={},...d}={},parentNode:u=null}=e;return new Promise((e,t)=>{if(a)e();else{const n=document.createElement("script");r&&(n.id=r),s&&(n.crossOrigin=s),n.async=i,n.defer=c,Object.assign(n.dataset,l),Object.entries(d).forEach(([e,t])=>{n.setAttribute(e,String(t))}),n.onload=e,n.onerror=t,"object"==typeof o?({url:e,integrity:t}=o,n.src=e,t&&(n.integrity=t,n.crossOrigin="anonymous")):n.src=o,(u||document.head).appendChild(n)}})},loadComments:function(o,e){return e?this.loadComments(o).then(e):new Promise(n=>{var e=document.querySelector(o);if(CONFIG.comments.lazyload&&e){const t=new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(n(),t.disconnect())});t.observe(e)}else n()})}};