let projects = []; // 在文件頂部定義
function loadProjects() {
    return fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.projects)) {
                projects = data.projects;
            } else {
                console.error('Data is not in the expected format');
                projects = []; // 設置為空數組以避免錯誤
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projects = []; // 出錯時也設置為空數組
        });
}
//初始化代碼
document.addEventListener('DOMContentLoaded', () => {
    loadProjects().then(() => {
        generateProjectCards();
        generateSkillCards();
        generateExperienceTimeline();
    });
});

// 動態生成項目卡片
function generateProjectCards() {
    if (!Array.isArray(projects) || projects.length === 0) {
        console.log('No projects to display or projects not loaded yet');
        return; // 如果 projects 不是數組或為空，直接返回
    }
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = ''; // 清空現有內容
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.detailUrl}" class="btn">查看詳情</a>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// 添加工作經歷數據
const experiences = [
    {
        title: "大學時期",
        company: "國立臺北商業大學-資訊管理系",
        date: "2018年7月 - 2022年1月",
        description: "在校成績保持在前五名，並在大學四年級上學期提前畢業。"
    },
    {
        title: "軟體工程師",
        company: "聯興國際物流股份有限公司",
        date: "2023年6月 - 至今",
        description: "負責開發和維護公司系統，並協助公司製作、完成多項專案。"
    },
    {
        title: "初級開發者",
        company: "網絡安全初創公司",
        date: "2015年7月 - 2017年5月",
        description: "協助開發網絡安全監控系統，學習並應用了多種安全技術和最佳實踐。"
    },
];

// 動態生成工作經歷時間線
function generateExperienceTimeline() {
    const timelineContainer = document.getElementById('experienceTimeline');
    experiences.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <div class="date">${exp.date}</div>
                <p><strong>${exp.company}</strong></p>
                <p>${exp.description}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
}

// 技能數據
const skills = [
    {
        title: "前端開發",
        description: "熟練使用 HTML5, CSS3, JavaScript, React, Vue.js 等前端技術，創建響應式和互動性強的用戶界面。"
    },
    {
        title: "後端開發",
        description: "精通 Node.js, Python, Java, PHP 等後端語言，以及 Express, Django, Spring Boot 等框架。"
    },
    {
        title: "數據庫",
        description: "熟悉 MySQL, PostgreSQL, MongoDB, Redis 等數據庫系統的設計和優化。"
    },
    {
        title: "雲服務",
        description: "有豐富的 AWS, Google Cloud Platform, Azure 等雲平台使用經驗，能夠設計和部署可擴展的雲架構。"
    },
    {
        title: "雲服務",
        description: "有豐富的 AWS, Google Cloud Platform, Azure 等雲平台使用經驗，能夠設計和部署可擴展的雲架構。"
    },
    {
        title: "雲服務",
        description: "有豐富的 AWS, Google Cloud Platform, Azure 等雲平台使用經驗，能夠設計和部署可擴展的雲架構。"
    },
    
    // 可以繼續添加更多技能
];
// 動態生成技能卡片
function generateSkillCards() {
    const skillsGrid = document.getElementById('skillsGrid');
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3>${skill.title}</h3>
                <p>${skill.description}</p>
            </div>
        `;
        skillsGrid.appendChild(card);
    });
}

