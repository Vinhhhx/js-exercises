const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevtBtn = document.querySelector('.prevBtn');

slides.forEach(function(slide,index){
    slide.style.left = `${index * 100}%`;
})

let counter = 0;
nextBtn.addEventListener('click',function(){
    counter++;
    carousel();
});
prevBtn.addEventListener('click',function(){
    counter--;
    carousel();
});

function carousel(){
    // working with slides
    if(counter < slides.length -1){
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }
    if(counter <= 0){
        prevtBtn.style.display = 'none';
    } else {
        prevtBtn.style.display = 'block';
    }
    slides.forEach(function(slide){
        slide.style.transform = `transaleX(-${counter*100}%)`;
    })
}
