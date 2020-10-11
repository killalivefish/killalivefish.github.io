console.log("hello");



function process(){
    var page = document.getElementById('page');
    if(page){
        var pageH = document.body.scrollHeight-document.body.clientHeight;
        var scrollerH = document.body.scrollTop;
        var h = 100*(scrollerH/pageH);
        
        var apple = document.getElementById('process');
        apple.style.width= h+'%';
        apple.style.background='green';
    }
}

window.onscroll = process;