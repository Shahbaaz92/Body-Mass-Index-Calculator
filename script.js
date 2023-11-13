const form = document.getElementById('form');
const metric = document.getElementById('metric');
const imperial = document.getElementById('imperial');
let height = document.getElementById('height-metric');
let weight = document.getElementById('weight-metric');
const score = document.getElementById('score');
const result = document.getElementById('result')
const btn = document.getElementById('btn')



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

btn.addEventListener("click", (e)=>{
  e.preventDefault()
  let bmiClass = categorizeBMI(weight.value, height.value)
  result.innerHTML =`<article>
  <p>Your BMI is...</p>
  <h1 class="score" id="score">${bmiClass.bmi}</h1>
</article>
<p>
  Your BMI suggests you're<span class="classification"> ${bmiClass.category}</span>.
  Your ideal weight is between
  <span class="range">${bmiClass.idealWeightRange}</span>.
</p>`
}
)




