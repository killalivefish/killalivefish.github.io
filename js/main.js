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