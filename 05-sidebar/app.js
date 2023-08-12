const toggleBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const sideBar = document.querySelector('.sidebar');

toggleBtn.onclick = function(){
    sideBar.classList.toggle('show-siderbar');

}
closeBtn.onclick = function(){
    sideBar.classList.remove('show-sidebar');
}