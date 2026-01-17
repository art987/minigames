// CSV转JSON数据转换脚本
// 用于将5年投档线CSV数据转换为位次切片JSON文件

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class DataConverter {
    constructor() {
        this.inputDir = path.join(__dirname, '../data/csv');
        this.outputDir = path.join(__dirname, '../data/json');
        this.maxFileSizeKB = 30; // 每个JSON文件最大30KB
    }
    
    // 主转换函数
    async convertAllData() {
        try {
            // 确保输出目录存在
            if (!fs.existsSync(this.outputDir)) {
                fs.mkdirSync(this.outputDir, { recursive: true });
            }
            
            // 获取所有CSV文件
            const csvFiles = fs.readdirSync(this.inputDir)
                .filter(file => file.endsWith('.csv'));
            
            console.log(`找到 ${csvFiles.length} 个CSV文件`);
            
            for (const csvFile of csvFiles) {
                await this.convertCsvFile(csvFile);
            }
            
            console.log('数据转换完成！');
            
        } catch (error) {
            console.error('数据转换失败:', error);
        }
    }
    
    // 转换单个CSV文件
    async convertCsvFile(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.inputDir, filename);
            const results = [];
            
            console.log(`正在处理文件: ${filename}`);
            
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    // 清洗和转换数据
                    const cleanedData = this.cleanData(data);
                    if (cleanedData) {
                        results.push(cleanedData);
                    }
                })
                .on('end', () => {
                    // 按位次范围切片数据
                    this.sliceAndSaveData(results, filename);
                    resolve();
                })
                .on('error', reject);
        });
    }
    
    // 清洗数据
    cleanData(data) {
        try {
            // 提取关键信息
            const province = data['省份'] || data['province'];
            const subject = data['科类'] || data['subject'];
            const universityCode = data['院校代码'] || data['code'];
            const universityName = data['院校名称'] || data['name'];
            const rank = parseInt(data['位次'] || data['rank']);
            const year = parseInt(data['年份'] || data['year']);
            
            // 验证数据完整性
            if (!province || !subject || !universityCode || !universityName || isNaN(rank)) {
                return null;
            }
            
            return {
                province,
                subject,
                code: universityCode,
                name: universityName,
                rank,
                year: isNaN(year) ? new Date().getFullYear() - 1 : year
            };
            
        } catch (error) {
            console.error('数据清洗失败:', error);
            return null;
        }
    }
    
    // 按位次范围切片并保存数据
    sliceAndSaveData(data, filename) {
        // 按省份和科类分组
        const groupedData = this.groupByProvinceAndSubject(data);
        
        for (const [key, universities] of Object.entries(groupedData)) {
            const [province, subject] = key.split('|');
            
            // 按位次范围切片（每5000位次一个区间）
            const slicedData = this.sliceByRankRange(universities);
            
            // 保存为JSON文件
            this.saveAsJsonFiles(province, subject, slicedData, filename);
        }
    }
    
    // 按省份和科类分组
    groupByProvinceAndSubject(data) {
        const grouped = {};
        
        data.forEach(item => {
            const key = `${item.province}|${item.subject}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        });
        
        return grouped;
    }
    
    // 按位次范围切片
    sliceByRankRange(universities) {
        const sliced = {};
        
        universities.forEach(uni => {
            // 计算位次范围（以5000为间隔）
            const rangeStart = Math.floor(uni.rank / 5000) * 5000;
            const rangeKey = rangeStart.toString();
            
            if (!sliced[rangeKey]) {
                sliced[rangeKey] = [];
            }
            
            sliced[rangeKey].push(uni);
        });
        
        return sliced;
    }
    
    // 保存为JSON文件
    saveAsJsonFiles(province, subject, slicedData, originalFilename) {
        const baseName = path.basename(originalFilename, '.csv');
        
        for (const [rangeKey, universities] of Object.entries(slicedData)) {
            // 限制每个文件的数据量
            const limitedData = universities.slice(0, 50); // 最多50所院校
            
            // 检查文件大小
            const jsonData = JSON.stringify(limitedData, null, 2);
            const sizeKB = Buffer.byteLength(jsonData, 'utf8') / 1024;
            
            if (sizeKB > this.maxFileSizeKB) {
                console.warn(`文件大小超过限制: ${sizeKB}KB，将进行压缩`);
                // 可以在这里添加数据压缩逻辑
            }
            
            // 生成文件名
            const fileName = `${province}_${subject}_${rangeKey}.json`
                .replace(/[\\/:*?"<>|]/g, '_'); // 替换非法字符
            
            const filePath = path.join(this.outputDir, fileName);
            
            // 保存文件
            fs.writeFileSync(filePath, jsonData, 'utf8');
            
            console.log(`已保存: ${fileName} (${sizeKB.toFixed(2)}KB)`);
        }
    }
    
    // 生成数据索引文件
    generateIndexFile() {
        const jsonFiles = fs.readdirSync(this.outputDir)
            .filter(file => file.endsWith('.json'));
        
        const index = {};
        
        jsonFiles.forEach(file => {
            const [province, subject, range] = file.replace('.json', '').split('_');
            
            if (!index[province]) {
                index[province] = {};
            }
            
            if (!index[province][subject]) {
                index[province][subject] = [];
            }
            
            index[province][subject].push({
                range: parseInt(range),
                file: file
            });
        });
        
        // 对每个省份和科类的范围进行排序
        Object.keys(index).forEach(province => {
            Object.keys(index[province]).forEach(subject => {
                index[province][subject].sort((a, b) => a.range - b.range);
            });
        });
        
        const indexPath = path.join(this.outputDir, 'index.json');
        fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');
        
        console.log('索引文件生成完成');
    }
}

// 使用示例
if (require.main === module) {
    const converter = new DataConverter();
    
    converter.convertAllData()
        .then(() => converter.generateIndexFile())
        .catch(console.error);
}

module.exports = DataConverter;