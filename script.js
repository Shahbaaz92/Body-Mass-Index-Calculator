const form = document.getElementById('form');
const metric = document.getElementById('metric');
const imperial = document.getElementById('imperial');
const metricInputs = document.getElementById('metric-inputs')
const imperialInputs = document.getElementById('imperial-inputs')
let meter = document.getElementById('height-metric');
let kilogram = document.getElementById('weight-metric');
let feet = document.getElementById('height-imperial')
let inch = document.getElementById('height-imperial2')
let stone = document.getElementById('weight-imperial')
let lb = document.getElementById('weight-imperial2')
const score = document.getElementById('score');
const result = document.getElementById('result')
const btn = document.getElementById('btn')
let isMeteric = true;
let isImperial = false;

metric.addEventListener('click',()=>{
    imperialInputs.classList.add('hidden')
    metricInputs.classList.remove('hidden')
    isMeteric = true
    isImperial = false
})
imperial.addEventListener('click',()=>{
    metricInputs.classList.add('hidden')
    imperialInputs.classList.remove('hidden')
    isMeteric=false
    isImperial = true
})

// Function to calculate BMI
const calculateBMI = (weight, height) => weight / (height ** 2);

// Function to determine ideal weight range
const calculateIdealWeightRange = (height, lowerLimit, upperLimit) => {
    const idealMinWeight = lowerLimit * height ** 2;
    const idealMaxWeight = upperLimit * height ** 2;
    return `${idealMinWeight.toFixed(2)} kg - ${idealMaxWeight.toFixed(2)} kg`;
};

// Function to categorize BMI and provide ideal weight range
const categorizeBMI = (weight, height) => {
  height = height/100;
    const bmi = calculateBMI(weight, height);
    const idealWeightRange = (lowerLimit, upperLimit) => calculateIdealWeightRange(height, lowerLimit, upperLimit);

    if (bmi < 18.5) {
        return {
            category: "Underweight",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9), // Ideal weight range for normal weight
        };
    } else if (bmi < 25) {
        return {
            category: "Normal weight",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9), // Ideal weight range for normal weight
        };
    } else {
        return {
            category: bmi < 30 ? "Overweight" : "Obese",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9), // Ideal weight range for normal weight
        };
    }
};


// Function to convert height from feet and inches to meters
const convertHeightToMeters = (feets, inches) => {
    
    const totalInches = (feets * 12) + inches;

    const metersInFeet = (totalInches) * 0.0254;
    
    return metersInFeet;
};

// Function to convert weight from stone and pounds to kilograms
const convertWeightToKilograms = (stones, pounds) => {
    const kilograms = (stones * 6.35029) + (pounds * 0.453592);
    return kilograms;
};

// Function to convert weight from kilograms to stone and pounds
const convertWeightToStoneAndPounds = (kilograms) => {
    const pounds = kilograms * 2.20462;
    const stones = Math.floor(pounds / 14);
    const remainingPounds = (pounds % 14).toFixed(2);
    return { stones, pounds: remainingPounds };
};

const calculateIdealWeightRangeinStone = (height, lowerLimit, upperLimit) => {
    const idealMinWeight = lowerLimit * height ** 2;
    const idealMaxWeight = upperLimit * height ** 2;
    const minWeightObj = convertWeightToStoneAndPounds(idealMinWeight);
    const maxWeightObj = convertWeightToStoneAndPounds(idealMaxWeight);
    return `${minWeightObj.stones} st ${minWeightObj.pounds} lbs - ${maxWeightObj.stones} st ${maxWeightObj.pounds} lbs`;
};

// Function to categorize BMI and provide ideal weight range
const categorizeBMIinStone = (weight, height) => {
    const bmi = calculateBMI(weight, height);
    const idealWeightRange = (lowerLimit, upperLimit) => calculateIdealWeightRangeinStone(height, lowerLimit, upperLimit);

    if (bmi < 18.5) {
        return {
            category: "Underweight",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9),
        };
    } else if (bmi < 25) {
        return {
            category: "Normal weight",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9),
        };
    } else {
        return {
            category: bmi < 30 ? "Overweight" : "Obese",
            bmi: bmi.toFixed(2),
            idealWeightRange: idealWeightRange(18.5, 24.9),
        };
    }
};


/***Event ***/

btn.addEventListener("click", (e)=>{
  e.preventDefault()

  let numbers = /^[0-9]+$/;
if(isMeteric && kilogram.value.match(numbers) && meter.value.match(numbers)){
  const metricResults = categorizeBMI(kilogram.value, meter.value)
  result.innerHTML =`<article class="score">
  <p>Your BMI is...</p>
  <h1  id="score">${metricResults.bmi}</h1>
</article>
<p class="classification">
  Your BMI suggests you're<span> ${metricResults.category}</span>.
  Your ideal weight is between
  <span class="range">${metricResults.idealWeightRange}</span>.
</p>`
}
else if(isImperial && stone.value.match(numbers) && lb.value.match(numbers)&&feet.value.match(numbers) && inch.value.match(numbers)){
// Convert height and weight to SI units
const heightImperial = convertHeightToMeters(Number(feet.value), Number(inch.value));
const weightImperial = convertWeightToKilograms(Number(stone.value), Number(lb.value));
// Categorize BMI and provide ideal weight range
const imperialResults = categorizeBMIinStone(weightImperial, heightImperial);
result.innerHTML =`<article class="score">
  <p>Your BMI is...</p>
  <h1  id="score">${imperialResults.bmi}</h1>
</article>
<p class="classification">
  Your BMI suggests you're<span > ${imperialResults.category}</span>.
  Your ideal weight is between
  <span class="range">${imperialResults.idealWeightRange}</span>.
</p>`


}
else if(isMeteric){
    kilogram.value=''
    meter.value =''
    result.innerHTML =`<h4>Please enter a proper number.</br> Height in Centimeters, and weight in Kilograms</h4>`
}else{
    stone.value=''
    lb.value=''
    feet.value=''
    inch.value=''
    result.innerHTML =`<h4>Please enter a proper number.</br> Height in Feet and Inches, and weight in Stones and Lbs/Pounds</h4>`
    

}
    result.classList.remove('welcome')
    result.classList.add('final')
    kilogram.value=''
    meter.value =''
    stone.value=''
    lb.value=''
    feet.value=''
    inch.value=''
}


)




