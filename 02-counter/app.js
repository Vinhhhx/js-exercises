// set initial count
let count = 0;

const value = document.querySelector('#value')
const btns = document.querySelectorAll(".btn")

btns.forEach(function(btn){
    btn.onclick = function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')){
            count--;
        } else if (styles.contains('reset')){
            count = 0;
        } else {
            count++;
        }
        value.textContent = count;
    }
})