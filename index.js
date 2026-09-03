
document.addEventListener("DOMContentLoaded",()=>{
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initTypingEffect();
    initScrollReveal();
    initProjectModal();
    initNavbar();
    initTestimonials();
    initTimelineAnimation();
    initSkillsAnimation();
    initExperienceAnimation();
    initServicesAnimation();
    initActiveNav();
    initRatings();
    initPageVisibility();
    initImageProtection();
    initScrollTop();
    initAutoYear();
});
const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
function initTheme(){
    const themeToggle=$(".theme-toggle");
    let savedTheme=localStorage.getItem("theme");
    if(!savedTheme){
        savedTheme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    }
    applyTheme(savedTheme);
    if(!themeToggle)return;
    const icon=$("i",themeToggle);
    themeToggle.setAttribute("aria-label",savedTheme==="dark"?"Switch to light mode":"Switch to dark mode");
    themeToggle.setAttribute("aria-pressed",savedTheme==="dark");
    themeToggle.addEventListener("click",()=>{
        const isDark=document.body.classList.contains("dark");
        const nextTheme=isDark?"light":"dark";
        applyTheme(nextTheme,icon);
        localStorage.setItem("theme",nextTheme);
        themeToggle.setAttribute("aria-label",nextTheme==="dark"?"Switch to light mode":"Switch to dark mode");
        themeToggle.setAttribute("aria-pressed",nextTheme==="dark");
    });
}
function applyTheme(theme,icon=null){
    const isDark=theme==="dark";
    document.body.classList.toggle("dark",isDark);
    document.documentElement.setAttribute("data-theme",theme);
    updateThemeIcon(icon||$(".theme-toggle i"),isDark);
}
function updateThemeIcon(icon,isDark){
    if(!icon)return;
    icon.classList.toggle("fa-moon",!isDark);
    icon.classList.toggle("fa-sun",isDark);
}
function initMobileMenu(){
    const menuToggle=$(".menu-toggle");
    const navMenu=$(".nav-menu");
    if(!menuToggle||!navMenu)return;
    const icon=$("i",menuToggle);
    menuToggle.setAttribute("aria-expanded","false");
    const closeMenu=()=>{
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded","false");
        if(icon){
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    };
    menuToggle.addEventListener("click",event=>{
        event.stopPropagation();
        const isOpen=navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded",String(isOpen));
        if(icon){
            icon.classList.toggle("fa-bars",!isOpen);
            icon.classList.toggle("fa-times",isOpen);
        }
    });
    $$(".nav-menu a").forEach(link=>{
        link.addEventListener("click",closeMenu);
    });
    document.addEventListener("click",event=>{
        if(!navMenu.contains(event.target)&&!menuToggle.contains(event.target)){
            closeMenu();
        }
    });
    document.addEventListener("keydown",event=>{
        if(event.key==="Escape")closeMenu();
    });
}
function initSmoothScroll(){
    $$('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener("click",event=>{
            const href=anchor.getAttribute("href");
            if(!href||href==="#")return;
            const target=$(href);
            if(!target)return;
            event.preventDefault();
            const navbarHeight=$(".navbar")?.offsetHeight||0;
            const offset=20;
            const targetPosition=target.getBoundingClientRect().top+window.scrollY-navbarHeight-offset;
            window.scrollTo({
                top:Math.max(0,targetPosition),
                behavior:"smooth"
            });
            history.pushState(null,"",href);
        });
    });
}
function initTypingEffect(){
    const typingElement=$("#typing");
    if(!typingElement)return;
    const roles=[
        "Frontend Developer",
        "Angular Developer",
        "UI/UX Enthusiast",
        "Creative Web Developer"
    ];
    let roleIndex=0;
    let charIndex=0;
    let deleting=false;
    const typingSpeed=90;
    const deletingSpeed=45;
    const pauseAfterTyping=1400;
    const pauseBeforeTyping=300;
    const type=()=>{
        const currentRole=roles[roleIndex];
        if(!deleting){
            charIndex++;
            typingElement.textContent=currentRole.slice(0,charIndex);
            if(charIndex>=currentRole.length){
                deleting=true;
                setTimeout(type,pauseAfterTyping);
                return;
            }
        }else{
            charIndex--;
            typingElement.textContent=currentRole.slice(0,charIndex);
            if(charIndex<=0){
                deleting=false;
                roleIndex=(roleIndex+1)%roles.length;
                setTimeout(type,pauseBeforeTyping);
                return;
            }
        }
        setTimeout(type,deleting?deletingSpeed:typingSpeed);
    };
    type();
}
function initScrollReveal(){
    const elements=$$("[data-animate]");
    if(!elements.length)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        elements.forEach(element=>element.classList.add("active"));
        return;
    }
    if(!("IntersectionObserver" in window)){
        elements.forEach(element=>element.classList.add("active"));
        return;
    }
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting)return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    },{
        threshold:0.15,
        rootMargin:"0px 0px -50px 0px"
    });
    elements.forEach(element=>observer.observe(element));
}
function initProjectModal(){
    const overlay=$("#projectOverlay");
    if(!overlay)return;
    const overlayImg=$("#overlayImg");
    const overlayTitle=$("#overlayTitle");
    const overlayDesc=$("#overlayDesc");
    const overlayLink=$("#overlayLink");
    const overlayTech=$("#overlayTech");
    const closeButton=$("#closeOverlay");
    const cards=$$(".project-card");
    if(!cards.length)return;
    const closeModal=()=>{
        overlay.classList.remove("active");
        document.body.classList.remove("modal-open");
        if(overlayImg){
            overlayImg.removeAttribute("src");
            overlayImg.alt="";
        }
        if(overlayLink){
            overlayLink.removeAttribute("href");
        }
    };
    const openModal=card=>{
        const image=$("img",card);
        const title=$("h3",card);
        const description=$("p",card);
        const link=$(".project-link",card);
        if(overlayImg&&image){
            overlayImg.src=image.currentSrc||image.src;
            overlayImg.alt=image.alt||"";
        }
        if(overlayTitle&&title){
            overlayTitle.textContent=title.textContent;
        }
        if(overlayDesc&&description){
            overlayDesc.textContent=description.textContent;
        }
        if(overlayLink&&link){
            overlayLink.href=link.href;
            overlayLink.target="_blank";
            overlayLink.rel="noopener noreferrer";
        }
        if(overlayTech){
            overlayTech.replaceChildren();
            $$(".project-tech span",card).forEach(tech=>{
                const span=document.createElement("span");
                span.textContent=tech.textContent;
                overlayTech.appendChild(span);
            });
        }
        overlay.classList.add("active");
        document.body.classList.add("modal-open");
    };
    cards.forEach(card=>{
        card.addEventListener("click",event=>{
            if(event.target.closest(".project-link"))return;
            openModal(card);
        });
        let frame=null;
        card.addEventListener("mousemove",event=>{
            if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
            if(frame)cancelAnimationFrame(frame);
            frame=requestAnimationFrame(()=>{
                const rect=card.getBoundingClientRect();
                const x=(event.clientX-rect.left)/rect.width;
                const y=(event.clientY-rect.top)/rect.height;
                const rotateY=(x-.5)*6;
                const rotateX=(.5-y)*6;
                card.style.transform=`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015,1.015,1.015)`;
            });
        });
        card.addEventListener("mouseleave",()=>{
            if(frame){
                cancelAnimationFrame(frame);
                frame=null;
            }
            card.style.transform="";
        });
    });
    closeButton?.addEventListener("click",closeModal);
    overlay.addEventListener("click",event=>{
        if(event.target===overlay)closeModal();
    });
    document.addEventListener("keydown",event=>{
        if(event.key==="Escape"&&overlay.classList.contains("active"))closeModal();
    });
}
function initNavbar(){
    const navbar=$(".navbar");
    if(!navbar)return;
    let ticking=false;
    const updateNavbar=()=>{
        navbar.classList.toggle("scrolled",window.scrollY>60);
        ticking=false;
    };
    window.addEventListener("scroll",()=>{
        if(!ticking){
            requestAnimationFrame(updateNavbar);
            ticking=true;
        }
    },{passive:true});
    updateNavbar();
}
function initTestimonials(){
    const items=$$(".testimonial-card");
    if(!items.length)return;
    let current=0;
    let interval=null;
    items.forEach((item,index)=>{
        item.classList.toggle("active",index===0);
    });
    if(items.length<=1)return;
    const showNext=()=>{
        items[current].classList.remove("active");
        current=(current+1)%items.length;
        items[current].classList.add("active");
    };
    const startSlider=()=>{
        if(interval)clearInterval(interval);
        interval=setInterval(showNext,4000);
    };
    startSlider();
    document.addEventListener("visibilitychange",()=>{
        if(document.hidden){
            clearInterval(interval);
        }else{
            startSlider();
        }
    });
}
function initTimelineAnimation(){
    const items=$$(".timeline-item");
    if(!items.length)return;
    observeElements(items);
}
function initSkillsAnimation(){
    const section=$(".skills");
    if(!section)return;
    const tags=$$(".skill-tag",section);
    tags.forEach((tag,index)=>{
        tag.style.animationDelay=`${index*0.08}s`;
    });
    observeElements([section],"active");
}
function initExperienceAnimation(){
    const section=$(".experience");
    if(!section)return;
    const cards=section.querySelectorAll(".experience-card");
    if(!cards.length)return;
    observeElements([section],null,()=>{
        cards.forEach((card,index)=>{
            setTimeout(()=>{
                card.classList.add("active");
            },index*180);
        });
    });
}
function initServicesAnimation(){
    const section=$(".services");
    if(!section)return;
    const cards=section.querySelectorAll(".service-card");
    if(!cards.length)return;
    observeElements([section],null,()=>{
        cards.forEach((card,index)=>{
            setTimeout(()=>{
                card.classList.add("active");
            },index*140);
        });
    });
}
function observeElements(elements,className="active",callback=null){
    if(!elements.length)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        elements.forEach(element=>{
            if(className)element.classList.add(className);
            if(callback)callback(element);
        });
        return;
    }
    if(!("IntersectionObserver" in window)){
        elements.forEach(element=>{
            if(className)element.classList.add(className);
            if(callback)callback(element);
        });
        return;
    }
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting)return;
            if(className)entry.target.classList.add(className);
            if(callback)callback(entry.target);
            observer.unobserve(entry.target);
        });
    },{
        threshold:.2
    });
    elements.forEach(element=>observer.observe(element));
}
function initActiveNav(){
    const sections=$$("section[id]");
    const links=$$(".nav-menu a[href^='#']");
    if(!sections.length||!links.length)return;
    const updateActiveLink=()=>{
        const scrollPosition=window.scrollY+180;
        let currentSection="";
        sections.forEach(section=>{
            const top=section.offsetTop;
            const bottom=top+section.offsetHeight;
            if(scrollPosition>=top&&scrollPosition<bottom){
                currentSection=section.id;
            }
        });
        links.forEach(link=>{
            const href=link.getAttribute("href");
            link.classList.toggle("active",href===`#${currentSection}`);
        });
    };
    let ticking=false;
    window.addEventListener("scroll",()=>{
        if(!ticking){
            requestAnimationFrame(()=>{
                updateActiveLink();
                ticking=false;
            });
            ticking=true;
        }
    },{passive:true});
    updateActiveLink();
}
function initRatings(){
    $$(".stars").forEach(container=>{
        const rating=Number.parseFloat(container.dataset.rating);
        if(Number.isNaN(rating)||rating<0)return;
        const safeRating=Math.min(rating,5);
        const fullStars=Math.floor(safeRating);
        const hasHalfStar=safeRating%1>=.5;
        const emptyStars=5-fullStars-(hasHalfStar?1:0);
        const fragment=document.createDocumentFragment();
        for(let i=0;i<fullStars;i++){
            const icon=document.createElement("i");
            icon.className="fas fa-star";
            icon.setAttribute("aria-hidden","true");
            fragment.appendChild(icon);
        }
        if(hasHalfStar){
            const icon=document.createElement("i");
            icon.className="fas fa-star-half-alt";
            icon.setAttribute("aria-hidden","true");
            fragment.appendChild(icon);
        }
        for(let i=0;i<emptyStars;i++){
            const icon=document.createElement("i");
            icon.className="far fa-star";
            icon.setAttribute("aria-hidden","true");
            fragment.appendChild(icon);
        }
        container.replaceChildren(fragment);
        container.setAttribute("role","img");
        container.setAttribute("aria-label",`Rating: ${safeRating} out of 5`);
    });
}
function initPageVisibility(){
    document.addEventListener("visibilitychange",()=>{
        document.documentElement.classList.toggle("page-hidden",document.hidden);
    });
}
function initImageProtection(){
    $$("img").forEach(img=>{
        img.setAttribute("draggable","false");
        img.addEventListener("dragstart",event=>{
            event.preventDefault();
        });
    });
}
function initScrollTop(){
    const scrollTop=$(".scroll-top");
    if(!scrollTop)return;
    let ticking=false;
    const updateScrollTop=()=>{
        scrollTop.classList.toggle("show",window.scrollY>400);
        ticking=false;
    };
    window.addEventListener("scroll",()=>{
        if(!ticking){
            requestAnimationFrame(updateScrollTop);
            ticking=true;
        }
    },{passive:true});
    scrollTop.addEventListener("click",event=>{
        event.preventDefault();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
    updateScrollTop();
}
function initAutoYear(){
    const currentYear=new Date().getFullYear();
    $$("[data-year]").forEach(element=>{
        element.textContent=currentYear;
    });
}