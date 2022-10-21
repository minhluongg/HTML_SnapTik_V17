function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function isAndroid() {
    var useragent = navigator.userAgent.toLowerCase();
    return useragent.indexOf("android") > -1;
}

function openModal(e){e.classList.add("is-active"),document.getElementById("body").style.overflow="hidden"}function closeModal(e){e.classList.remove("is-active"),document.getElementById("body").style.overflow="auto"}function closeAllModals(){(document.querySelectorAll(".modal")||[]).forEach(e=>{closeModal(e)})}function showAd(e,l){let t=document.querySelectorAll('ins[data-vignette-loaded="true"]');0==t.length&&iOS()&&l.preventDefault(),l.stopPropagation(),openModal(document.getElementById("ad-modal")),document.getElementById("ads-content").innerHTML='<ins class="adsbygoogle" style="display:block; margin: 0 auto;" data-ad-client="ca-pub-2496545456108734" data-ad-slot="8422982901" data-ad-format="auto" data-full-width-responsive="true"></ins>',(adsbygoogle=window.adsbygoogle||[]).push({}),0==t.length&&iOS()&&setTimeout(function(){null!=e.getAttribute("href")?window.location.href=e.getAttribute("href"):sendEvent("Error_Link_Null")},1e3)}(document.querySelectorAll(".modal-background, .modal-close, .btn-modal-close")||[]).forEach(e=>{let l=e.closest(".modal-down");e.addEventListener("click",()=>{closeModal(l)})}),document.addEventListener("keydown",e=>{27===(e||window.event).keyCode&&closeAllModals()});

if (isAndroid()) {
    document.querySelector('.navbar-app').style.display = 'flex';
}

const toggleSwitch = document.querySelector(".btn-darkmode");

toggleSwitch.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  localStorage.setItem("theme", theme);
});



const btnPaste = document.querySelector(".btn-paste");
const inputUrl = document.getElementById("url");

function showBtnClear() {
    btnPaste.classList.add('active');
    document.querySelector(".btn-paste span").innerHTML = lang.clear;
}

btnPaste.addEventListener("click", function () {
  if (btnPaste.classList.contains("active")) {
    inputUrl.value = "";
    if (navigator.clipboard) {
        btnPaste.classList.remove('active');
        document.querySelector(".btn-paste span").innerHTML = lang.paste;
    }

  } else {
    navigator.clipboard.readText().then(function(e) {
        if (e != "") {
            inputUrl.value = e;
            showBtnClear();
        } else {
            showAlert(lang.linkEmpty);

        }
    })
  }
});

if (navigator.clipboard) {
    btnPaste.style.display = "flex";
}

inputUrl.addEventListener("keyup", function(e) {
    if (inputUrl.value.length > 0) {
        showBtnClear();
    }
    hideAlert();
});

const alertEL = document.getElementById("alert");

function showAlert(mess) {
    alertEL.classList.add('active');
    alertEL.innerHTML = mess;
}
function hideAlert(mess) {
    alertEL.classList.remove('active');
    alertEL.innerHTML = '';
}

function toggleLang(){document.querySelectorAll('.navbar-lang')[0].classList.toggle('show');document.querySelector('.dropdown-lang').classList.toggle('show')}
// Share
const shareButton = document.querySelector('.share-button');
shareButton.addEventListener('click', event => {
if (navigator.share) { 
    navigator.share({
    title: 'Share SnapTik',
    url: 'https://snaptik.app/' + lang.currentLang
    }).then(() => {
    sendEvent('Share_sucs_by_webapi');
    })
    .catch(console.error);
    } else {
    sendEvent('Share_webapi_not_support');
    }
    sendEvent('share_click_btnShare');
});