 // create a function to call when the html is ready with the cards and the overlays on the screen
$(document).ready (function() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    
     //remove the visisble on html and when you click on screen the overlays goes away and ready to start//                                                                                
    overlays.forEach(overlay  =>{
    overlay.addEventListener('click' , () => {
    overlay.classList.remove('visible');
   
 });
    });    
});


    
