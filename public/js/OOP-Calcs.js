class FracTank {
    constructor(name, height) {
        this.name = name;
        this.height = height;
    }

    totalHeight(firstRead) {
        return this.height - (firstRead * 12);
    }

    waterHeight(secondRead) {
        return this.height - (secondRead * 12);
    }

    convertWithChart(height) {
        const getDecimal = height - Math.floor(height);
        const volume =
          (this.volumeChart[Math.ceil(height)] -
            this.volumeChart[Math.floor(height)]) *
            getDecimal +
          this.volumeChart[Math.floor(height)];
          return volume.toFixed(2);
    }

    totalVolume(height) {
        height = this.totalHeight(height);
        const volume = this.convertWithChart(height);
        return volume;
      }

      waterVolume(height) {
        height = this.waterHeight(height)
        const volume = this.convertWithChart(height);
        return volume;
      }

      productVolume(totalVol, waterVol) {
        return (totalVol - waterVol).toFixed(2);
      }

      allVolumes(totalVol, waterVol) {
          const total = this.totalVolume(totalVol);
          const water = this.waterVolume(waterVol);
          const product = this.productVolume(total, water);
          const string = `Total Gallons: ${total}\nWater Gallons: ${water}\nProduct: ${product} `
          return string;
      }

    volumeChart = {
        0: 0.0, 1: 22, 2: 89, 3: 200, 4: 317, 5: 485, 6: 653, 7: 821, 8: 990, 9: 1158, 10: 1326, 11: 1494, 12: 1662, 13: 1830, 14: 1999, 15: 2167, 16: 2335, 17: 2503,
        18: 2671, 19: 2840, 20: 3008, 21: 3176, 22: 3344, 23: 3512, 24: 3680, 25: 3849, 26: 4017, 27: 4185, 28: 4353, 29: 4521, 30: 4690, 31: 4858, 32: 5026, 33: 5194, 34: 5362,
        35: 5581, 36: 5699, 37: 5867, 38: 6035, 39: 6203, 40: 6371, 41: 6540, 42: 6708, 43: 6876, 44: 7044, 45: 7212, 46: 7381, 47: 7549, 48: 7717, 49: 7885, 50: 8053, 51: 8221,
        52: 8390, 53: 8558, 54: 8726, 55: 8894, 56: 9062, 57: 9231, 58: 9399, 59: 9567, 60: 9735, 61: 9903, 62: 10071, 63: 10240, 64: 10408, 65: 10576, 66: 10744, 67: 10912, 68: 11081,
        69: 11249, 70: 11417, 71: 11585, 72: 11753, 73: 11922, 74: 12090, 75: 12258, 76: 12426, 77: 12594, 78: 12762, 79: 12931, 80: 13099, 81: 13267, 82: 13435, 83: 13603, 84: 13772,
        85: 13940, 86: 14108, 87: 14276, 88: 14444, 89: 14612, 90: 14781, 91: 14949, 92: 15117, 93: 15285, 94: 15453, 95: 15622, 96: 15790, 97: 15958, 98: 16126
    }
    
}

// Declare new tank with name an it's height (in.)
const frac1A = new FracTank("1A", 104.04);

// Enter measured distances to water and gas (ft.)
const volumes = frac1A.allVolumes(2.56, 3.6);

// Volumes are logged
console.log(volumes);