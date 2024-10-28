// Changes the process's working directory into the directory path
process.chdir(__dirname);

var table1 = require('./pt_json1.json');
var table2 = require('./pt_json2.json');
var colorLibrary = require("./color_library.json");
var isDarkColor = require("is-dark-color");
var fs = require('fs');

function parseElements() {
    var firstJson = ParseJson1()
    return `
    import { iElement } from "../schemas/ElementInterface";

    const ElementData: iElement[] = 
    ${firstJson}
    export default ElementData;`;
}

function parseLegend() {
    return `import { iLegendData } from "../schemas/LegendInterface";

export const LegendData: iLegendData= ${JSON.stringify(colorLibrary, "    ", 4)}
`
}
// Missing Named by

fs.writeFile("../assets/ElementData.ts", parseElements(), (error) => {
    if (error) throw error;
    console.log('Element Data complete');
});

fs.writeFile("../assets/LegendData.ts", parseLegend(), (error) => {
    if (error) throw error;
    console.log('Legend Data complete');
});


function ParseJson1() {
    var elementArray = [];
    // first table has an extra element not found on the second one
    for (var elementIndex = 0; elementIndex < table1.elements.length - 1; elementIndex++) {
        elementArray[elementIndex] = {
            "number": table1.elements[elementIndex].number,
            "name": table1.elements[elementIndex].name,
            "symbol": table1.elements[elementIndex].symbol,
            "atomic_mass": table1.elements[elementIndex].atomic_mass,
            "category": capitalizeWords(table1.elements[elementIndex].category),
            "group_block": capitalizeWords(outputNull(table2[elementIndex].groupBlock)),
            "appearance": capitalizeWords(table1.elements[elementIndex].appearance),
            "element_color": table1.elements[elementIndex]?.color ?? null,
            "density": table1.elements[elementIndex].density,
            "boil": table1.elements[elementIndex].boil,
            "melt": table1.elements[elementIndex].melt,
            "molar_heat": table1.elements[elementIndex].molar_heat,
            "period": table1.elements[elementIndex].period,
            "group": table1.elements[elementIndex].group,
            "phase": table1.elements[elementIndex].phase,
            "summary": table1.elements[elementIndex].summary,
            "electron_affinity": table1.elements[elementIndex].electron_affinity,
            "electronegativity": outputNull(table2[elementIndex].electronegativity),
            "atomic_radius": outputNull(table2[elementIndex].atomicRadius),
            "ion_radius": outputNull(table2[elementIndex].ionRadius),
            "van_der_waals_radius": outputNull(table2[elementIndex].vanDelWaalsRadius),
            "ionization_energy": outputNull(table2[elementIndex].ionizationEnergy),
            "bonding_type": capitalizeWords(outputNull(table2[elementIndex].bondingType)),
            "discovered_by": capitalizeWords(table1.elements[elementIndex].discovered_by),
            "year_discovered": outputNull(table2[elementIndex].yearDiscovered),
            "named_by": table1.elements[elementIndex].named_by,
            "source": table1.elements[elementIndex].source,
            "cpk-hex": table1.elements[elementIndex]['cpk-hex'],
            "image": table1.elements[elementIndex]?.image,
            "block": table1.elements[elementIndex]?.block,
            "bohr_model_image": table1.elements[elementIndex].bohr_model_image,
            "bohr_model_3d": table1.elements[elementIndex].bohr_model_3d,
            "electron_configuration": table1.elements[elementIndex].electron_configuration_semantic,
            "xpos": table1.elements[elementIndex].xpos,
            "ypos": table1.elements[elementIndex].ypos,
            "wxpos": table1.elements[elementIndex].wxpos,
            "wypos": table1.elements[elementIndex].wypos
        }
        elementArray[elementIndex].colors = findElementColors(elementArray[elementIndex]);
    }
    return JSON.stringify(elementArray, "    ", 4);
}

function outputNull(input) {
    return (input !== "") ? input : null;
}


function capitalizeWords(str) {
    if (str == null) {
        return null;
    }
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

var defaultColor = { hex: "#ffffff", dark: false };
function findColorAndDark(color) {
    return color != null ?
        { hex: color, dark: isDarkColor(color) } :
        defaultColor;
}

function findElementColors(elementInfo) {
    let colorData = {};
    // console.log(elementInfo);
    colorData["category"] = findStringButtonColor("category", elementInfo.category);
    colorData["phase"] = findStringButtonColor("phase", elementInfo.phase);
    colorData["group_block"] = findStringButtonColor("group_block", elementInfo.group_block);
    colorData["bonding_type"] = findStringButtonColor("bonding_type", elementInfo.bonding_type);
    colorData["year_discovered"] = findNumberButtonColor("year_discovered", elementInfo.year_discovered);
    colorData["density"] = findNumberButtonColor("density", elementInfo.density);
    colorData["melt"] = findNumberButtonColor("melt", elementInfo.melt);
    colorData["boil"] = findNumberButtonColor("boil", elementInfo.boil);
    colorData["molar_heat"] = findNumberButtonColor("molar_heat", elementInfo.molar_heat);
    colorData["electronegativity"] = findNumberButtonColor("electronegativity", elementInfo.electronegativity);
    colorData["atomic_radius"] = findNumberButtonColor("atomic_radius", elementInfo.atomic_radius);
    colorData["van_der_waals_radius"] = findNumberButtonColor("van_der_waals_radius", elementInfo.van_der_waals_radius);
    colorData["ionization_energy"] = findNumberButtonColor("ionization_energy", elementInfo.ionization_energy);
    colorData["electron_affinity"] = findNumberButtonColor("electron_affinity", elementInfo.electron_affinity);
    colorData["block"] = findStringButtonColor("block", elementInfo.block);
    colorData["cpk"] = elementInfo['cpk-hex'] ?
        { hex: "#" + elementInfo['cpk-hex'], dark: isDarkColor("#" + elementInfo['cpk-hex']) } :
        defaultColor;
    return colorData;
}

function findStringButtonColor(type, elementProperty) {
    if (elementProperty !== null) {
        for (let property of colorLibrary[type].colors) {
            if (property.index == elementProperty) {
                return findColorAndDark(property.color);
            }
        }
    }
    return defaultColor;
}

function findNumberButtonColor(type, elementProperty) {
    if (elementProperty === null) return defaultColor;
    if (elementProperty === NaN) return findStringButtonColor(type, elementProperty);
    for (var property of colorLibrary[type].colors) {
        if (property.index !== NaN && property.index >= elementProperty) {
            return findColorAndDark(property.color);
        }
    }
    return defaultColor;
}

