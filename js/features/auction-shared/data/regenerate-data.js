// Run the generator and save results
const fs = require('fs');
const path = require('path');

// Load the generator
const generator = require('./generate-plates.js');

console.log('Generating car plates data...');
const carPlates = generator.generateCarPlates(250);

console.log('Generating motorbike plates data...');
const motorbikePlates = generator.generateMotorbikePlates(250);

// Format as ES6 export
const carPlatesContent = `export const expandedCarPlates = ${JSON.stringify(carPlates, null, 2)};\n`;
const motorbikePlatesContent = `export const expandedMotorbikePlates = ${JSON.stringify(motorbikePlates, null, 2)};\n`;

// Write files
const carPlatesPath = path.join(__dirname, 'expandedCarPlates.js');
const motorbikePlatesPath = path.join(__dirname, 'expandedMotorbikePlates.js');

fs.writeFileSync(carPlatesPath, carPlatesContent);
fs.writeFileSync(motorbikePlatesPath, motorbikePlatesContent);

console.log(`✅ Generated ${carPlates.length} car plates → ${carPlatesPath}`);
console.log(`✅ Generated ${motorbikePlates.length} motorbike plates → ${motorbikePlatesPath}`);

// Show sample
console.log('\n=== SAMPLE CAR PLATES (first 3) ===');
carPlates.slice(0, 3).forEach(plate => {
    const code = plate.plateNumber.match(/^(\d+)/)?.[1];
    console.log(`${plate.plateNumber} → ${plate.province} (Code: ${code})`);
});

console.log('\n=== SAMPLE MOTORBIKE PLATES (first 3) ===');
motorbikePlates.slice(0, 3).forEach(plate => {
    const code = plate.plateNumber.match(/^(\d+)/)?.[1];
    console.log(`${plate.plateNumber} → ${plate.province} (Code: ${code})`);
});

console.log('\n✅ Data regenerated successfully!');
