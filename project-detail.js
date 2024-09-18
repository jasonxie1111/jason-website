let projects = []; // 在文件頂部定義
function loadProjectDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                displayProjectDetail(project); // 使用新的 displayProjectDetail 函數
            } else {
                displayError();
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadProjectDetail);

function displayProjectDetail(project) {
    const projectDetail = document.getElementById('projectDetail');
    projectDetail.innerHTML = `
        <h1>${project.title}</h1>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.fullDescription}</p>
        <div class="technologies-container">
            <h2>使用的技術及套件</h2>
            <div class="technologies-list">
                ${project.technologies.map(tech => `<span class="technology-item">${tech}</span>`).join('')}
            </div>
        </div>
        <h2>項目挑戰</h2>
        <p>${project.challenges}</p>
        <h2>項目成果</h2>
        <p>${project.outcomes}</p>
        <div class="code-section">
            <div class="code-header">
                <span>示例代碼</span>
                <button onclick="copyCode()">複製代碼</button>
            </div>
            <div class="code-content">
                <pre><code class="language-python">${project.sampleCode}</code></pre>
            </div>
        </div>
    `;
    // 觸發 Prism.js 語法高亮
    Prism.highlightAll();
}

function copyCode() {
    const codeElement = document.querySelector('.code-content code');
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('代碼已複製到剪貼板');
}

function displayError() {
    const projectDetail = document.getElementById('projectDetail');
    projectDetail.innerHTML = '<p>找不到該項目的詳細信息。</p>';
}
