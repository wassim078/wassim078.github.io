/*
====================================
 Wassim Jmili Cybersecurity Portfolio
 Main JavaScript
====================================
*/


// ================================
// Smooth scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target =
        document.querySelector(this.getAttribute("href"));


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});





// ================================
// Reveal animations
// ================================


const observer = new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add("show");


    }


});


},

{

threshold:0.15

}

);



document.querySelectorAll(".card,.skill,.project")

.forEach(element=>{


element.classList.add("hidden");


observer.observe(element);


});






// ================================
// Typing effect for terminal
// ================================


const text =
"Cybersecurity Engineering Student | SOC Analyst Path";


let index=0;


const typingElement =
document.querySelector(".typing");



function typing(){


if(!typingElement)
return;



if(index < text.length){


typingElement.innerHTML += text.charAt(index);


index++;


setTimeout(typing,80);


}



}



typing();







// ================================
// Current year footer
// ================================


const year =
document.querySelector("#year");


if(year){

year.textContent =
new Date().getFullYear();

}
