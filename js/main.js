console.log("hello");



function process(){
    var page = document.getElementById('page');
    console.log(page.offsetHeight);
    var pageH = page.offsetHeight;

    var scrollerH = document.body.scrollTop;
    console.log("scrollTop:"+document.body.scrollTop);
    
    var h = 100*(scrollerH/pageH);

    if(h<10){
        h=10;
    }
    
    var apple = document.getElementById('process');
    console.log("height:"+h);
    apple.style.width= h+'px';
    console.log(apple.style.width);
    apple.style.background='red';
}

window.onscroll = process;