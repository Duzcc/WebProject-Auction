// License Plate Data Generator
// Generates realistic Vietnamese license plates with white/yellow classification

// Province codes and names
const provinces = [
    { code: '29', name: 'Thành phố Hà Nội' },
    { code: '30', name: 'Thành phố Hà Nội' },
    { code: '31', name: 'Thành phố Hà Nội' },
    { code: '32', name: 'Thành phố Hà Nội' },
    { code: '33', name: 'Thành phố Hà Nội' },
    { code: '40', name: 'Thành phố Hà Nội' },
    { code: '50', name: 'Thành phố Hồ Chí Minh' },
    { code: '51', name: 'Thành phố Hồ Chí Minh' },
    { code: '59', name: 'Thành phố Hồ Chí Minh' },
    { code: '43', name: 'Thành phố Đà Nẵng' },
    { code: '15', name: 'Thành phố Hải Phòng' },
    { code: '16', name: 'Thành phố Hải Phòng' },
    { code: '65', name: 'Thành phố Cần Thơ' },
    { code: '75', name: 'Thành phố Huế' },
    { code: '11', name: 'Tỉnh Cao Bằng' },
    { code: '12', name: 'Tỉnh Lạng Sơn' },
    { code: '14', name: 'Tỉnh Quảng Ninh' },
    { code: '17', name: 'Tỉnh Thái Bình' },
    { code: '18', name: 'Tỉnh Nam Định' },
    { code: '19', name: 'Tỉnh Phú Thọ' },
    { code: '20', name: 'Tỉnh Thái Nguyên' },
    { code: '21', name: 'Tỉnh Bắc Kạn' },
    { code: '22', name: 'Tỉnh Tuyên Quang' },
    { code: '23', name: 'Tỉnh Hà Giang' },
    { code: '24', name: 'Tỉnh Lào Cai' },
    { code: '25', name: 'Tỉnh Lai Châu' },
    { code: '26', name: 'Tỉnh Sơn La' },
    { code: '27', name: 'Tỉnh Điện Biên' },
    { code: '28', name: 'Tỉnh Hòa Bình' },
    { code: '34', name: 'Tỉnh Hải Dương' },
    { code: '35', name: 'Tỉnh Ninh Bình' },
    { code: '36', name: 'Tỉnh Thanh Hóa' },
    { code: '37', name: 'Tỉnh Nghệ An' },
    { code: '38', name: 'Tỉnh Hà Tĩnh' },
    { code: '47', name: 'Tỉnh Đắk Lắk' },
    { code: '49', name: 'Tỉnh Lâm Đồng' },
    { code: '60', name: 'Tỉnh Đồng Nai' },
    { code: '61', name: 'Tỉnh Bình Dương' },
    { code: '62', name: 'Tỉnh Long An' },
    { code: '63', name: 'Tỉnh Tiền Giang' },
    { code: '64', name: 'Tỉnh Vĩnh Long' },
    { code: '66', name: 'Tỉnh Đồng Tháp' },
    { code: '67', name: 'Tỉnh An Giang' },
    { code: '68', name: 'Tỉnh An Giang' },
    { code: '69', name: 'Tỉnh Cà Mau' },
    { code: '70', name: 'Tỉnh Tây Ninh' },
    { code: '71', name: 'Tỉnh Bến Tre' },
    { code: '72', name: 'Tỉnh Bà Rịa - Vũng Tàu' },
    { code: '79', name: 'Tỉnh Khánh Hòa' },
    { code: '81', name: 'Tỉnh Gia Lai' },
    { code: '88', name: 'Tỉnh Vĩnh Phúc' },
    { code: '89', name: 'Tỉnh Hưng Yên' },
    { code: '90', name: 'Tỉnh Hà Nam' },
    { code: '97', name: 'Tỉnh Bắc Giang' },
    { code: '98', name: 'Tỉnh Bắc Giang' },
    { code: '99', name: 'Tỉnh Bắc Ninh' },
];

// Car series codes
const carSeries = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'S', 'T', 'V', 'X', 'Y'];

// Motorbike series codes (AA, AB, AC)
const bikeSeries = ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AK', 'AL', 'AM', 'AN', 'AP', 'AS', 'AT', 'AX'];

// Plate types
const types = {
    'Ngũ quý': { weight: 15, patterns: ['XXX.XX', '999.99', '888.88', '777.77', '666.66', '555.55', '444.44', '333.33', '222.22', '111.11'] },
    'Tứ quý': { weight: 35, patterns: ['XXXX', 'XXX.X0', 'X00.00', '111.1', '222.2', '333.3', '444.4', '555.5', '666.6', '777.7', '888.8', '999.9'] },
    'Sảnh tiến': { weight: 20, patterns: ['123.45', '234.56', '345.67', '456.78', '567.89', '678.90', '012.34'] },
    'Tam hoa': { weight: 15, patterns: ['XXX.00', '888.00', '999.11', '777.22'] },
    'Số gánh': { weight: 10, patterns: ['X9X.9X', '191.91', '292.92', '383.83', '494.94'] },
    'Lộc phát': { weight: 5, patterns: ['X6X.X8', '68.68', '86.86', '168.68', '886.68'] }
};

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generatePlateNumber(isCarPlate, selectedType) {
    const province = getRandomProvinces();
    const series = isCarPlate ? getRandomItem(carSeries) : getRandomItem(bikeSeries);

    // Generate number based on type pattern
    let number;
    const patterns = types[selectedType].patterns;
    const pattern = getRandomItem(patterns);

    if (pattern === 'XXX.XX' || pattern === 'XXXX') {
        // Generate repeating pattern for Ngũ quý and Tứ quý
        const digit = Math.floor(Math.random() * 10);
        if (pattern === 'XXX.XX') {
            number = `${digit}${digit}${digit}.${digit}${digit}`;
        } else {
            number = `${digit}${digit}${digit}${digit}`;
        }
    } else if (pattern.includes('X')) {
        // Replace X with random digits
        number = pattern.replace(/X/g, () => Math.floor(Math.random() * 10));
    } else {
        number = pattern;
    }

    return `${province.code}${series} - ${number}`;
}

function getRandomPrice(plateType) {
    const basePrice = {
        'Ngũ quý': [500000000, 2000000000],
        'Tứ quý': [40000000, 200000000],
        'Sảnh tiến': [40000000, 150000000],
        'Tam hoa': [100000000, 500000000],
        'Số gánh': [60000000, 300000000],
        'Lộc phát': [80000000, 400000000]
    };

    const range = basePrice[plateType];
    const price = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
    return price.toLocaleString('vi-VN') + ' đ';
}

function selectPlateType() {
    const totalWeight = Object.values(types).reduce((sum, type) => sum + type.weight, 0);
    let random = Math.random() * totalWeight;

    for (const [typeName, typeData] of Object.entries(types)) {
        random -= typeData.weight;
        if (random <= 0) return typeName;
    }
    return 'Tứ quý'; // fallback
}

function getPlateColor() {
    // 70% white, 30% yellow
    return Math.random() < 0.7 ? 'white' : 'yellow';
}

function generateCarPlates(count) {
    const plates = [];

    for (let i = 1; i <= count; i++) {
        const plateType = selectPlateType();
        const province = getRandomProvinces();
        const plateNumber = generatePlateNumber(true, plateType);
        const startPrice = getRandomPrice(plateType);
        const plateColor = getPlateColor();

        plates.push({
            id: i,
            plateNumber,
            startPrice,
            province: province.name,
            type: plateType,
            plateColor // white or yellow
        });
    }

    return plates;
}

function generateMotorbikePlates(count) {
    const plates = [];

    for (let i = 1; i <= count; i++) {
        const plateType = selectPlateType();
        const province = getRandomProvinces();
        const plateNumber = generatePlateNumber(false, plateType);

        // Motorbikes have lower prices
        const basePrice = plateType === 'Ngũ quý' ? 50000000 : 5000000;
        const multiplier = Math.random() * 10 + 1;
        const price = Math.floor(basePrice * multiplier);
        const startPrice = price.toLocaleString('vi-VN') + ' đ';
        const plateColor = getPlateColor();

        plates.push({
            id: i,
            plateNumber,
            startPrice,
            province: province.name,
            type: plateType,
            plateColor // white or yellow
        });
    }

    return plates;
}

// Generate data
console.log('Generating 250 car plates...');
const carPlatesData = generateCarPlates(250);

console.log('Generating 250 motorbike plates...');
const motorbikePlatesData = generateMotorbikePlates(250);

// Export as JSON
console.log('\n=== CAR PLATES (first 5) ===');
console.log(JSON.stringify(carPlatesData.slice(0, 5), null, 2));

console.log('\n=== MOTORBIKE PLATES (first 5) ===');
console.log(JSON.stringify(motorbikePlatesData.slice(0, 5), null, 2));

console.log(`\n✅ Generated ${carPlatesData.length} car plates (${carPlatesData.filter(p => p.plateColor === 'white').length} white, ${carPlatesData.filter(p => p.plateColor === 'yellow').length} yellow)`);
console.log(`✅ Generated ${motorbikePlatesData.length} motorbike plates (${motorbikePlatesData.filter(p => p.plateColor === 'white').length} white, ${motorbikePlatesData.filter(p => p.plateColor === 'yellow').length} yellow)`);

// Save function (for copy-paste into constants.js)
function formatAsJSArray(data, arrayName) {
    let jsCode = `const ${arrayName} = [\n`;
    data.forEach((item, index) => {
        jsCode += `  ${JSON.stringify(item)}`;
        if (index < data.length - 1) jsCode += ',';
        jsCode += '\n';
    });
    jsCode += '];\n';
    return jsCode;
}

// Helper
function getRandomProvinces() {
    return getRandomItem(provinces);
}

// For Node.js execution
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateCarPlates,
        generateMotorbikePlates,
        carPlatesData,
        motorbikePlatesData
    };
}
