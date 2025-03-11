console.log("welcom back!")

const themeBtn=document.getElementById("theme-btn");
themeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme");
});