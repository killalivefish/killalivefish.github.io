console.log("hello");



function process(){
    var page = document.getElementById('page');
    // console.log(page.offsetHeight);
    // console.log(page.scrollTop);
    var pageH = page.offsetHeight;

    var scrollerH = document.body.scrollTop;
    // console.log("scrollTop:"+document.body.scrollTop);
    // console.log("scrollDowm:"+document.body.scrollHeight);
    
    var h = 100*(scrollerH/pageH);

    var apple = document.getElementById('process');
    apple.style.width= h+'%';
    apple.style.background='red';
}

window.onscroll = process;