const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

modalBtn.onclick = function(){
    modal.classList.add('open-modal')
}
closeBtn.onclick = function(){
    modal.classList.remove('open-modal')
}