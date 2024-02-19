var current_lang = getBrowserLang();
const beep = new Audio("beep.mp3");

// Animations

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(id, text) {
    let speed = 100, cursorState = false;
    for (let i = 0; i < text.length; i++) {
        let currentFrame = ""
        // Draw current frame
        for (let b = 0; b <= i; b++)
            currentFrame += text.charAt(b)
        if (cursorState && i != text.length - 1)
            currentFrame += "|";
        cursorState = !cursorState;
        // Apply it
        document.getElementById(id).innerHTML = currentFrame;
        await sleep(speed);
    }
}

window.onload = function () {
    let title = getTranslationForLocale(current_lang, "title");
    typeText("title", title)
    updateInfo();
}



const locale = {
    "RU": {
        "title": "Привет, я - ViTRAL",
        "bio": "Специалист в области Front-end и языках программирования C++, C#, обладаю обширным опытом в создании инновационных решений для веб-интерфейсов. Мои навыки также включают разработку читов на LUA",
        "skills": "- Знание языков: Русский, Украинский, Английский. Базовое понимание: Французский, Белорусский<br/><br/>\
- Умение работать с ЯП C#, C++, JS<br/><br/>\
- Познания в криптографии<br/><br/>\
- Умение качественно монтировать видео",
        "about": "Обо мне",
        "more": "Больше ресурсов",
        "todo": "Все данные были удалены",
        "projects": "Проекты",
        "contacts": "Контакты"
    },
    "EN": {
        "title": "Hello, I'm ViTRAL",
        "bio": "Front-end programmer, C++, C#, has experience in developing cheats in LUAA specialist in the field of Front-end and programming languages ​​C++, C#, I have extensive experience in creating innovative solutions for web interfaces. My skills also include developing cheats in LUA",
        "skills": "- Knowledge of languages: Russian, Ukrainian, English. Basic understanding: French, Belarusian.<br/><br/>\
- Proficient in programming languages such as C#, C++, JS<br/><br/>\
- Knowledge cryptography<br/><br/>\
- Skilled video editing.",
        "about": "About me",
        "more": "More resources",
        "todo": "All data has been deleted",
        "projects": "Projects",
        "contacts": "Contacts"
    }
};

// Change the language
function switchLang() {
    // Picks the next language from the locale list
    let langs = Object.keys(locale);
    let index = langs.indexOf(current_lang);
    current_lang = langs[(index + 1) % langs.length];
    // Update the webpage 
    updateInfo();
    beep.play();
}

// Translate & set selected
function updateInfo() {
    setLanguageActivated(current_lang)
    setLocale(current_lang)
}

// Activates a language and deactivates all other ones
function setLanguageActivated(id) {
    let active = document.getElementsByClassName("lang"),
        element = document.getElementById(id);
    for (let i = 0; i < active.length; i++)
        active[i].style.color = "inherit";
    element.style.color = "#00EE20";
}

function getTranslationForLocale(lang, id) {
    return (lang in locale && id in locale[lang]) ? locale[lang][id] : undefined
}

function setLocale(lang) {
    if (lang in locale) {
        let new_lang = locale[lang]
        if ("title" in new_lang)
            document.title = new_lang.title
        for (const id in new_lang) {
            let element = document.getElementById(id)
            if (element) element.innerHTML = new_lang[id]
        }
    }
}

// Not russian = english ;)
function getBrowserLang() {
    return (navigator.language ||
        navigator.userLanguage ||
        navigator.userAgentData).toUpperCase().includes("RU") ? "RU" : "EN";
}
