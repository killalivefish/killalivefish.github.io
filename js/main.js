console.log("-----寻找之人必有所获-------");
console.log("--联系方式969559629@qq.com--");

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

function showAsideBar(){
    let asideBar = document.getElementById('aside');
    if(asideBar){
        var asideDis = asideBar.style.display;
        if(asideDis=='none'){
            asideBar.style.display='block';
        }else{
            asideBar.style.display='none';
        }
    }
}

function showInnerItem(item){
    var innerUl = document.getElementById(item);
    var innerDis = innerUl.style.display;
    if(innerDis=='block'){
        innerUl.style.display='none';
    }else{
        innerUl.style.display='block';
    }
}