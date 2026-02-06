/* Import Prism CSS */
import 'prismjs/themes/prism-okaidia.css';

/* Import Main CSS - Vite will handle injection */
import './styles.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import DOMPurify from 'dompurify';

let projects = []; // 在文件頂部定義

function loadProjectDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));

    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                displayProjectDetail(project);
            } else {
                displayError();
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadProjectDetail);

function displayProjectDetail(project) {
    const projectDetail = document.getElementById('projectDetail');

    // Sanitize HTML content
    const sanitizedFullDesc = DOMPurify.sanitize(project.fullDescription);
    const sanitizedChallenges = DOMPurify.sanitize(project.challenges);
    const sanitizedOutcomes = DOMPurify.sanitize(project.outcomes);

    // Safe HTML injection
    projectDetail.innerHTML = `
        <h1>${DOMPurify.sanitize(project.title)}</h1>
        <img src="${project.image}" alt="${DOMPurify.sanitize(project.title)}">
        <p>${sanitizedFullDesc}</p>
        <div class="technologies-container">
            <h2>使用的技術及套件</h2>
            <div class="technologies-list">
                ${project.technologies.map(tech => `<span class="technology-item">${DOMPurify.sanitize(tech)}</span>`).join('')}
            </div>
        </div>
        <h2>項目挑戰</h2>
        <p>${sanitizedChallenges}</p>
        <h2>項目成果</h2>
        <p>${sanitizedOutcomes}</p>
        <div class="code-section">
            <div class="code-header">
                <span>示例代碼</span>
                <button id="copyBtn">複製代碼</button>
            </div>
            <div class="code-content">
                <pre><code class="language-python">${DOMPurify.sanitize(project.sampleCode)}</code></pre>
            </div>
        </div>
    `;

    // Re-attach event listener for the copy button since we overwrote innerHTML
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyCode);
    }

    // 觸發 Prism.js 語法高亮
    Prism.highlightAll();
}

function copyCode() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;

    navigator.clipboard.writeText(codeElement.textContent)
        .then(() => {
            alert('代碼已複製到剪貼板');
        })
        .catch(err => {
            console.error('無法複製代碼:', err);
            // Fallback for older browsers or if clipboard API fails
            const textArea = document.createElement('textarea');
            textArea.value = codeElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('代碼已複製到剪貼板');
        });
}

function displayError() {
    const projectDetail = document.getElementById('projectDetail');
    projectDetail.innerHTML = '<p>找不到該項目的詳細信息。</p>';
}
