// 主应用逻辑
class ZhiyuanCardApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.populateProvinces();
        this.checkPaymentStatus();
    }
    
    // 设置事件监听器
    setupEventListeners() {
        const form = document.getElementById('input-form');
        const downloadBtn = document.getElementById('download-pdf');
        const resetBtn = document.getElementById('reset-form');
        
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        downloadBtn.addEventListener('click', () => this.downloadPDF());
        resetBtn.addEventListener('click', () => this.resetForm());
        
        // 实时验证Gumroad密钥
        document.getElementById('gumroad-key').addEventListener('input', (e) => {
            this.validateGumroadKey(e.target.value);
        });
    }
    
    // 填充省份选项
    populateProvinces() {
        const provinceSelect = document.getElementById('province');
        window.PROVINCES.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    }
    
    // 验证Gumroad密钥（模拟实现）
    validateGumroadKey(key) {
        const submitBtn = document.getElementById('submit-btn');
        
        // 模拟验证逻辑（实际使用时需要调用Gumroad API）
        const isValid = key.length >= 8 && /^[a-zA-Z0-9]+$/.test(key);
        
        submitBtn.disabled = !isValid;
        
        if (isValid) {
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.style.opacity = '0.6';
        }
    }
    
    // 处理表单提交
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            province: formData.get('province'),
            subject: formData.get('subject'),
            rank: parseInt(formData.get('rank')),
            gumroadKey: formData.get('gumroad-key')
        };
        
        // 验证表单数据
        if (!this.validateFormData(data)) {
            return;
        }
        
        // 显示加载状态
        this.showLoading(true);
        
        try {
            // 验证Gumroad密钥（模拟）
            const isValid = await this.verifyGumroadKey(data.gumroadKey);
            
            if (!isValid) {
                alert('Gumroad兑换码无效，请检查后重试');
                this.showLoading(false);
                return;
            }
            
            // 加载院校数据
            const universities = await window.loadUniversityData(data.province, data.subject, data.rank);
            
            if (universities.length === 0) {
                alert('未找到匹配的院校数据，请检查输入的位次范围');
                this.showLoading(false);
                return;
            }
            
            // 生成志愿卡
            this.generateZhiyuanCard(universities, data);
            
            // 显示结果区域
            this.showResultSection();
            
        } catch (error) {
            console.error('生成志愿卡失败:', error);
            alert('生成志愿卡失败，请稍后重试');
        } finally {
            this.showLoading(false);
        }
    }
    
    // 验证表单数据
    validateFormData(data) {
        if (!data.province) {
            alert('请选择省份');
            return false;
        }
        
        if (!data.subject) {
            alert('请选择科类');
            return false;
        }
        
        if (!data.rank || data.rank < 1 || data.rank > 1000000) {
            alert('请输入有效的全省位次（1-1000000）');
            return false;
        }
        
        if (!data.gumroadKey) {
            alert('请输入Gumroad兑换码');
            return false;
        }
        
        return true;
    }
    
    // 验证Gumroad密钥（模拟实现）
    async verifyGumroadKey(key) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟验证逻辑（实际使用时需要调用Gumroad API）
        return key.length >= 8 && /^[a-zA-Z0-9]+$/.test(key);
    }
    
    // 生成志愿卡
    generateZhiyuanCard(universities, data) {
        // 根据位次分类院校
        const chong = []; // 冲一冲：位次-1000 ~ 位次
        const wen = [];   // 稳一稳：位次 ~ 位次+2000
        const bao = [];   // 保一保：位次+2000 ~ 位次+5000
        
        universities.forEach(uni => {
            const diff = uni.rank - data.rank;
            
            if (diff >= -1000 && diff < 0) {
                chong.push(uni);
            } else if (diff >= 0 && diff < 2000) {
                wen.push(uni);
            } else if (diff >= 2000 && diff < 5000) {
                bao.push(uni);
            }
        });
        
        // 限制每类最多15所
        const chongLimited = chong.slice(0, 15);
        const wenLimited = wen.slice(0, 15);
        const baoLimited = bao.slice(0, 15);
        
        // 渲染院校列表
        this.renderUniversityList('chong-list', chongLimited, '冲');
        this.renderUniversityList('wen-list', wenLimited, '稳');
        this.renderUniversityList('bao-list', baoLimited, '保');
        
        // 保存数据用于PDF生成
        this.currentData = {
            universities: { chong: chongLimited, wen: wenLimited, bao: baoLimited },
            userData: data
        };
    }
    
    // 渲染院校列表
    renderUniversityList(containerId, universities, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        if (universities.length === 0) {
            container.innerHTML = `<div class="no-data">暂无${type}一${type}院校数据</div>`;
            return;
        }
        
        universities.forEach((uni, index) => {
            const item = document.createElement('div');
            item.className = 'school-item';
            item.innerHTML = `
                <span class="school-name">${index + 1}. ${uni.name} (${uni.code})</span>
                <span class="school-rank">去年最低位次: ${uni.rank.toLocaleString()}</span>
            `;
            container.appendChild(item);
        });
    }
    
    // 显示结果区域
    showResultSection() {
        document.getElementById('input-section').classList.add('hidden');
        document.getElementById('payment-section').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');
        
        // 滚动到结果区域
        document.getElementById('result-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
    
    // 下载PDF
    async downloadPDF() {
        const { jsPDF } = window.jspdf;
        
        try {
            this.showLoading(true);
            
            // 使用html2canvas将志愿卡内容转换为图片
            const element = document.getElementById('card-content');
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false
            });
            
            // 创建PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // 添加图片到PDF
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            // 添加页脚
            pdf.setFontSize(10);
            pdf.setTextColor(100);
            pdf.text('数据仅供参考，最终以考试院官方为准', 
                pdfWidth / 2, pdfHeight - 10, { align: 'center' });
            
            // 生成文件名
            const fileName = `志愿卡_${this.currentData.userData.province}_${this.currentData.userData.rank}_${Date.now()}.pdf`;
            
            // 下载PDF
            pdf.save(fileName);
            
            // 记录下载事件
            this.trackDownload();
            
        } catch (error) {
            console.error('生成PDF失败:', error);
            alert('生成PDF失败，请稍后重试');
        } finally {
            this.showLoading(false);
        }
    }
    
    // 重置表单
    resetForm() {
        document.getElementById('input-form').reset();
        document.getElementById('result-section').classList.add('hidden');
        document.getElementById('input-section').classList.remove('hidden');
        document.getElementById('payment-section').classList.remove('hidden');
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 显示/隐藏加载状态
    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }
    
    // 检查支付状态（模拟）
    checkPaymentStatus() {
        // 这里可以添加检查用户是否已支付的逻辑
        // 实际使用时需要调用Gumroad API
    }
    
    // 跟踪下载事件（模拟Google Analytics）
    trackDownload() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pdf_download', {
                'event_category': 'engagement',
                'event_label': '志愿卡下载'
            });
        }
        console.log('PDF下载已记录');
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ZhiyuanCardApp();
});

// Gumroad支付集成（示例代码）
function loadGumroadEmbed() {
    // 实际使用时需要替换为真实的Gumroad产品URL
    const gumroadScript = document.createElement('script');
    gumroadScript.src = 'https://gumroad.com/js/gumroad-embed.js';
    gumroadScript.async = true;
    document.head.appendChild(gumroadScript);
    
    // 创建Gumroad嵌入div
    const embedDiv = document.getElementById('gumroad-embed');
    if (embedDiv) {
        embedDiv.innerHTML = `
            <div class="gumroad-product-embed" 
                 data-gumroad-product-id="your-product-id" 
                 data-outbound-embed="true">
                <a href="https://gumroad.com/l/your-product-id">Loading...</a>
            </div>
        `;
    }
}

// 页面加载完成后加载Gumroad嵌入
window.addEventListener('load', loadGumroadEmbed);