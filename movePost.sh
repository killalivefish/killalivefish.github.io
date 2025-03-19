#!/bin/bash
#复制文章到github.io仓库
#1.添加时间YYYY-MM-DD-原文件名
#2.添加
---
# layout: posts
# title:  "SpringCloud"
# date:
# categories: SpringCloud
# excerpt:
---
# 3.添加title
# 4.添加categories
# 5.添加excerpt
# 6.替换image路径
note_path=/d/myWorkSpace/github_project/myNote
githubio_path=/d/myWorkSpace/github_project/killalivefish.github.io/_posts

echo "开始复制文章到github.io仓库"

# 检查路径是否存在
if [[ ! -d "${note_path}" ]]; then
    echo "错误：笔记路径不存在！(${note_path})"
    exit 1
fi

if [[ ! -d "${githubio_path}" ]]; then
    echo "错误：github.io 仓库路径不存在！(${githubio_path})"
    exit 1
fi

for file in $(find "${note_path}" -type f -name "*.md");do
    filename=$(basename "$file")

    if [ $(find "${note_path}" -type f -name "*${filename}.md") ];then
        echo "文件已存在，跳过处理：$filename"
        continue
    fi
    ctime=$(stat -c %W "$file")
    date_str=$(date -d "@$ctime" +"%Y-%m-%d")

    # 构造新文件名
    new_file="${githubio_path}/${date_str}-${filename}"
    echo ${new_file}

    # 获取用户输入
    echo "正在处理文件: $filename"
    read -p "请输入标题: " title
    read -p "请输入分类: " categories
    read -p "请输入摘要: " excerpt

    # 生成YAML头部
    header="---
layout: posts
title:  \"${title}\"
date: ${date_str}
categories: ${categories}
excerpt: ${excerpt}
---
"

    # 创建新文件并处理内容
    {
        echo "$header"
        sed 's#\.\./images/#/assets/article/#g' "$file"
    } > "$new_file"

    echo "文件已处理：$new_file"
    echo "-------------------------"
done

echo "所有文件处理完成！"