const heightInput = document.getElementById('heightInput');
const weightInput = document.getElementById('weightInput');
const ageSlider = document.getElementById('ageSlider');
const sexSlider = document.getElementById('sexSlider');
const activitySlider = document.getElementById('activitySlider');
const goalSlider = document.getElementById('goalSlider');

const calorieValue = document.getElementById('calorieValue');
const bmiTag = document.getElementById('bmiTag');
const ageTag = document.getElementById('ageTag');
const sexTag = document.getElementById('sexTag');
const activityTag = document.getElementById('activityTag');
const goalTag = document.getElementById('goalTag');

const ageDesc = document.getElementById('ageDesc');
const sexDesc = document.getElementById('sexDesc');
const activityDesc = document.getElementById('activityDesc');
const goalDesc = document.getElementById('goalDesc');
const formulaText = document.getElementById('formulaText');

let lastCalories = 2310;

function getBMICategory(height, weight) {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    if (bmi < 16.5) return '极瘦弱';
    if (bmi < 18.5) return '偏瘦';
    if (bmi < 24) return '标准体型';
    if (bmi < 28) return '微胖';
    if (bmi < 32) return '肥胖';
    return '重度肥胖';
}

function animateValue(element, start, end, duration = 350) {
    const startTime = performance.now();
    const change = end - start;
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + change * easeOutCubic);
        element.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function calculate() {
    const height = parseFloat(heightInput.value) || 170;
    const weight = parseFloat(weightInput.value) || 70;
    const age = parseInt(ageSlider.value);
    const sex = parseInt(sexSlider.value);
    const activity = parseInt(activitySlider.value);
    const goal = parseInt(goalSlider.value);

    const ageData = config.age[age];
    const sexData = config.sex[sex];
    const activityData = config.activity[activity];
    const goalData = config.goal[goal];

    let bmr;
    if (sex === 2) {
        bmr = 10 * weight + 6.25 * height - 5 * (age + 15) + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * (age + 15) - 161;
    }
    
    bmr *= ageData.factor;
    
    const calories = Math.round(bmr * activityData.factor * goalData.factor);

    animateValue(calorieValue, lastCalories, calories);
    lastCalories = calories;

    bmiTag.textContent = getBMICategory(height, weight);
    ageTag.textContent = ageData.label;
    sexTag.textContent = sexData.label;
    activityTag.textContent = activityData.label;
    goalTag.textContent = goalData.label;

    ageDesc.textContent = ageData.desc;
    sexDesc.textContent = sexData.desc;
    activityDesc.textContent = activityData.desc;
    goalDesc.textContent = goalData.desc;

    formulaText.textContent = `${Math.round(bmr)} × ${activityData.factor} × ${goalData.factor}`;

    if (goalData.ratio) {
        updateDietRatio(calories, goalData.ratio);
    }
}

function updateDietRatio(totalCalories, ratio) {
    const carbCalories = Math.round(totalCalories * ratio.carb);
    const proteinCalories = Math.round(totalCalories * ratio.protein);
    const fatCalories = Math.round(totalCalories * ratio.fat);

    const carbGrams = Math.round(carbCalories / 4);
    const proteinGrams = Math.round(proteinCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    const ratioContainer = document.getElementById('dietRatioContainer');
    if (!ratioContainer) return;

    const carbBar = ratioContainer.querySelector('.diet-bar.carb .diet-bar-fill');
    const proteinBar = ratioContainer.querySelector('.diet-bar.protein .diet-bar-fill');
    const fatBar = ratioContainer.querySelector('.diet-bar.fat .diet-bar-fill');

    if (carbBar) {
        carbBar.style.width = `${ratio.carb * 100}%`;
        carbBar.parentElement.previousElementSibling.textContent = `碳水: ${carbGrams}g (${Math.round(ratio.carb * 100)}%)`;
    }
    if (proteinBar) {
        proteinBar.style.width = `${ratio.protein * 100}%`;
        proteinBar.parentElement.previousElementSibling.textContent = `蛋白质: ${proteinGrams}g (${Math.round(ratio.protein * 100)}%)`;
    }
    if (fatBar) {
        fatBar.style.width = `${ratio.fat * 100}%`;
        fatBar.parentElement.previousElementSibling.textContent = `脂肪: ${fatGrams}g (${Math.round(ratio.fat * 100)}%)`;
    }
}

function updateSliderLabels(slider, labels) {
    const value = parseInt(slider.value);
    labels.forEach(label => {
        label.classList.remove('active');
        const labelValue = parseInt(label.dataset[slider.id.replace('Slider', '')]);
        if (labelValue === value) {
            label.classList.add('active');
        }
    });
}

function init() {
    const ageLabels = document.querySelectorAll('[data-age]');
    const sexLabels = document.querySelectorAll('[data-sex]');
    const activityLabels = document.querySelectorAll('[data-activity]');
    const goalLabels = document.querySelectorAll('[data-goal]');

    ageSlider.addEventListener('input', () => {
        updateSliderLabels(ageSlider, ageLabels);
        calculate();
    });

    sexSlider.addEventListener('input', () => {
        updateSliderLabels(sexSlider, sexLabels);
        calculate();
    });

    activitySlider.addEventListener('input', () => {
        updateSliderLabels(activitySlider, activityLabels);
        calculate();
    });

    goalSlider.addEventListener('input', () => {
        updateSliderLabels(goalSlider, goalLabels);
        calculate();
    });

    heightInput.addEventListener('input', calculate);
    weightInput.addEventListener('input', calculate);

    calculate();
}

init();
