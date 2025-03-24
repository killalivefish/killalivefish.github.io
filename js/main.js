console.log("welcom back!")

const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});


// 主页文章分类和列表选择
let scrollPosition = 0;

function scrollCategories(amount) {
    const categoryTabs = document.querySelector('.category-tabs');
    scrollPosition += amount;
    categoryTabs.style.transform = `translateX(${scrollPosition}px)`;
}

// tabs
document.addEventListener('DOMContentLoaded', function () {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const postLists = document.querySelectorAll('.post-list');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // 移除所有 tab 的 active 类
            categoryTabs.forEach(t => t.classList.remove('active'));
            // 添加当前 tab 的 active 类
            this.classList.add('active');

            // 隐藏所有 post-list
            postLists.forEach(postList => postList.style.display = 'none');
            // 显示当前 tab 对应的 post-list
            const targetPostListId = `post-list-${this.getAttribute('data-category')}`;
            const targetPostList = document.getElementById(targetPostListId);
            if (targetPostList) {
                targetPostList.style.display = 'block';
            }
        });
    });

    const firstCat = categoryTabs[2];
    if (firstCat) {
        firstCat.classList.add('active');
        const firstCatPostListId = `post-list-${firstCat.getAttribute('data-category')}`;
        const firstPostList = document.getElementById(firstCatPostListId);
        if (firstPostList) {
            firstPostList.style.display = 'block';
        }
    }
});

// backtop
const backtop = document.getElementById("backtop");

// 当用户滚动页面时，检查是否需要显示按钮
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backtop.style.display = "flex"; // 显示按钮
    } else {
        backtop.style.display = "none"; // 隐藏按钮
    }
});

backtop.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});

// other
// 获取页面容器
const body = document.body;

// 鼠标点击事件监听
body.addEventListener("click", (event) => {
    const { clientX, clientY } = event; // 获取鼠标点击的坐标

    // 创建纸片元素
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // 设置随机颜色
    confetti.style.backgroundColor = getRandomColor();

    // 设置随机大小
    const size = Math.random() * 15 + 5; // 纸片大小在 5px 到 20px 之间
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;

    // 设置随机旋转角度
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    // 设置初始位置
    confetti.style.left = `${clientX}px`;
    confetti.style.top = `${clientY}px`;

    // 将纸片添加到页面中
    body.appendChild(confetti);

    // 动画结束后移除纸片
    setTimeout(() => {
        confetti.remove();
    }, 2000); // 动画持续时间为 2 秒
});

// 随机生成颜色
function getRandomColor() {
    const colors = [
        "#ff5722", "#03a9f4", "#8bc34a", "#e91e63", "#9c27b0",
        "#ffc107", "#00bcd4", "#ffeb3b", "#673ab7", "#3f51b5"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}