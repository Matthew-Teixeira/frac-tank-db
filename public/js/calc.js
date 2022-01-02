class FracTank {
    constructor(name, height){
        this.name = name;
        this.height = height;
    }
}

const tankPage = document.querySelector('#tank-page');

//Frac 1A Variables
const frac1A = new FracTank("Frac 1A", 104.04);
const form1A = document.querySelector('#tank1AInputs');
const frac1ATotalInchOut = document.querySelector('#oneA-total-in');
const frac1AWaterInchOut = document.querySelector('#oneA-water-in');
const frac1AProductInchOut = document.querySelector('#oneA-product-in');
const oneAInchArr = [frac1ATotalInchOut, frac1AWaterInchOut, frac1AProductInchOut]
const frac1ATotalOutput = document.querySelector('#oneAtotal');
const frac1AWaterOutput = document.querySelector('#oneAwater');
const fra1AProductOutput = document.querySelector('#oneAproduct');
const oneAGalArr = [frac1ATotalOutput, frac1AWaterOutput, fra1AProductOutput];
//Frac 1A Variables

// 1B //
const frac1B = new FracTank("frac 1B", 107.40);
const form1B = document.querySelector('#tank1BInputs');
const frac1BTotalInchOut = document.querySelector('#oneB-total-in');
const frac1BWaterInchOut = document.querySelector('#oneB-water-in');
const frac1BProductInchOut = document.querySelector('#oneB-product-in');
const onebInchArr = [frac1BTotalInchOut, frac1BWaterInchOut, frac1BProductInchOut]
const frac1BTotalOutput = document.querySelector('#oneBtotal');
const frac1BWaterOutput = document.querySelector('#oneBwater');
const fra1BProductOutput = document.querySelector('#oneBproduct');
const oneBGalArr = [frac1BTotalOutput, frac1BWaterOutput, fra1BProductOutput];
// 1B //

// 2A //
const frac2A = new FracTank("frac 2A", 100.44);
const form2A = document.querySelector('#tank2AInputs');
const frac2ATotalInchOut = document.querySelector('#twoA-total-in');
const frac2AWaterInchOut = document.querySelector('#twoA-water-in');
const frac2AProductInchOut = document.querySelector('#twoA-product-in');
const twoaInchArr = [frac2ATotalInchOut, frac2AWaterInchOut, frac2AProductInchOut]
const frac2ATotalOutput = document.querySelector('#twoAtotal');
const frac2AWaterOutput = document.querySelector('#twoAwater');
const fra2AProductOutput = document.querySelector('#twoAproduct');
const twoAGalArr = [frac2ATotalOutput, frac2AWaterOutput, fra2AProductOutput];
// 2A //

// 2B //
const frac2B = new FracTank("frac 2B", 101.94);
const form2B = document.querySelector('#tank2BInputs');
const frac2BTotalInchOut = document.querySelector('#twoB-total-in');
const frac2BWaterInchOut = document.querySelector('#twoB-water-in');
const frac2BProductInchOut = document.querySelector('#twoB-product-in');
const twobInchArr = [frac2BTotalInchOut, frac2BWaterInchOut, frac2BProductInchOut]
const frac2BTotalOutput = document.querySelector('#twoBtotal');
const frac2BWaterOutput = document.querySelector('#twoBwater');
const fra2BProductOutput = document.querySelector('#twoBproduct');
const twoBGalArr = [frac2BTotalOutput, frac2BWaterOutput, fra2BProductOutput];
// 2B //

// 3A //
const frac3A = new FracTank("frac 3A", 100.08);
const form3A = document.querySelector('#tank3AInputs');
const frac3ATotalInchOut = document.querySelector('#threeA-total-in');
const frac3AWaterInchOut = document.querySelector('#threeA-water-in');
const frac3AProductInchOut = document.querySelector('#threeA-product-in');
const threeAInchArr = [frac3ATotalInchOut, frac3AWaterInchOut, frac3AProductInchOut]
const frac3ATotalOutput = document.querySelector('#threeAtotal');
const frac3AWaterOutput = document.querySelector('#threeAwater');
const fra3AProductOutput = document.querySelector('#threeAproduct');
const threeAGalArr = [frac3ATotalOutput, frac3AWaterOutput, fra3AProductOutput];
// 3A //

// 3B //
const frac3B = new FracTank("frac 3B", 100.26);
const form3B = document.querySelector('#tank3BInputs');
const frac3BTotalInchOut = document.querySelector('#threeB-total-in');
const frac3BWaterInchOut = document.querySelector('#threeB-water-in');
const frac3BProductInchOut = document.querySelector('#threeB-product-in');
const threeBInchArr = [frac3BTotalInchOut, frac3BWaterInchOut, frac3BProductInchOut]
const frac3BTotalOutput = document.querySelector('#threeBtotal');
const frac3BWaterOutput = document.querySelector('#threeBwater');
const fra3BProductOutput = document.querySelector('#threeBproduct');
const threeBGalArr = [frac3BTotalOutput, frac3BWaterOutput, fra3BProductOutput];
// 3B //

function fracVolumeOutput (fracObj, form, gallonArray, inchArray) {
    const formDTP = parseFloat(form.elements[0].value) * 12;
    const formDTW = parseFloat(form.elements[1].value) * 12;
    let totalLiquidHeight = fracObj.height - formDTP;
    let waterInches = fracObj.height - formDTW;
    let inchesProduct = 0;
    let totalGallons = 0;
    let gallonsWater = 0;
    let gallonsProduct = 0;

    //No Product
    if(formDTP === 0){
        //gallons
        totalGallons = findTotalGallons(waterInches);
        gallonsWater = findWaterGallons(waterInches);
        gallonsProduct = totalGallons - gallonsWater;
        //inches
        totalLiquidHeight = waterInches;
    }
    //No Water
    else if(formDTW === 0) {
        totalGallons = findTotalGallons(totalLiquidHeight);
        gallonsProduct = totalGallons;
        inchesProduct = totalLiquidHeight;
        waterInches = 0;
    }
    //Normal Conditions
    else{
        totalGallons = findTotalGallons(totalLiquidHeight);
        gallonsWater = findWaterGallons(waterInches);
        gallonsProduct = totalGallons - gallonsWater;
        inchesProduct = totalLiquidHeight - waterInches; 
    }

    displayValue(gallonArray[0], totalGallons);
    displayValue(gallonArray[1], gallonsWater);
    displayValue(gallonArray[2], gallonsProduct);

    // displayValue(inchArray[0], totalLiquidHeight);
    // displayValue(inchArray[1], waterInches);
    // displayValue(inchArray[2], inchesProduct);
}

function displayValue(outputDisplay, volume) {
    outputDisplay.value = volume.toFixed(2);
    outputDisplay.classList.add('center');
}

function findTotalGallons (totalHeight) {
    const totalDecimal = totalHeight - Math.floor(totalHeight);
    const volume = (strapGallons[Math.ceil(totalHeight)] - strapGallons[Math.floor(totalHeight)]) * totalDecimal + strapGallons[Math.floor(totalHeight)];
    return volume;
}

function findWaterGallons (waterHeight) {
    const totalDecimal = waterHeight - Math.floor(waterHeight);
    const volume = (strapGallons[Math.ceil(waterHeight)] - strapGallons[Math.floor(waterHeight)]) * totalDecimal + strapGallons[Math.floor(waterHeight)];
    return volume;
}

const strapGallons = {0: 0.0, 1: 22, 2: 89, 3: 200, 4: 317, 5: 485, 6: 653, 7: 821, 8: 990, 9: 1158, 10: 1326, 11: 1494, 12: 1662, 13: 1830, 14: 1999, 15: 2167, 16: 2335, 17: 2503,
    18: 2671, 19: 2840, 20: 3008, 21: 3176, 22: 3344, 23: 3512, 24: 3680, 25: 3849, 26: 4017, 27: 4185, 28: 4353, 29: 4521, 30: 4690, 31: 4858, 32: 5026, 33: 5194, 34: 5362, 
    35: 5581, 36: 5699, 37: 5867, 38: 6035, 39: 6203, 40: 6371, 41: 6540, 42: 6708, 43: 6876, 44: 7044, 45: 7212, 46: 7381, 47: 7549, 48: 7717, 49: 7885, 50: 8053, 51: 8221, 
    52: 8390, 53: 8558, 54: 8726, 55: 8894, 56: 9062, 57: 9231, 58: 9399, 59: 9567, 60: 9735, 61: 9903, 62: 10071, 63: 10240, 64: 10408, 65: 10576, 66: 10744, 67: 10912, 68: 11081, 
    69: 11249, 70: 11417, 71: 11585, 72: 11753, 73: 11922, 74: 12090, 75: 12258, 76: 12426, 77: 12594, 78: 12762, 79: 12931, 80: 13099, 81: 13267, 82: 13435, 83: 13603, 84: 13772, 
    85: 13940, 86: 14108, 87: 14276, 88: 14444, 89: 14612, 90: 14781, 91: 14949, 92: 15117, 93: 15285, 94: 15453, 95: 15622, 96: 15790, 97: 15958, 98: 16126
}

if(tankPage.innerText === 'Tank 1A'){
    form1A[2].onclick = function(event){
        form1A.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac1A, form1A, oneAGalArr, oneAInchArr);
       
        })
    }
   
    form1B[2].onclick = function(event){
        form1B.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac1B, form1B, oneBGalArr, onebInchArr);
        })
    }
}
else if(tankPage.innerText === 'Tank 2A'){
    form2A[2].onclick = function(event){
        form2A.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac2A, form2A, twoAGalArr, twoaInchArr);
        })
    }

    form2B[2].onclick = function(event){
        form2B.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac2B, form2B, twoBGalArr, twobInchArr);
        })
    }
}
else if(tankPage.innerText === 'Tank 3A'){
    form3A[2].onclick = function(event){
        form3A.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac3A, form3A, threeAGalArr, threeAInchArr);
        })
    }

    form3B[2].onclick = function(event){
        form3B.addEventListener('submit', (e) => {
            e.preventDefault();
            fracVolumeOutput(frac3B, form3B, threeBGalArr, threeBInchArr);
        })
    }
}