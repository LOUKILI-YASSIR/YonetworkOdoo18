import { clamp } from "@web/core/utils/numbers";
/**
 * Lists of colors that contrast well with each other to be used in various
 * visualizations (eg. graphs/charts), both in bright and dark themes.
 */

const COLORS_ENT_BRIGHT = ["#3CB371", "#98FB98", "#90EE90"]; // Vert moyen, vert pâle et vert clair
const COLORS_ENT_DARK = ["#2E8B57", "#006400", "#228B22"];   // Vert secondaire, vert foncé et vert forestier

const COLORS_SM = [
    "#4EA7F2", // Blue
    "#EA6175", // Red
    "#43C5B1", // Teal
    "#F4A261", // Orange
    "#2E8B57", // Purple (replaced by secondary)
    "#FFD86D", // Yellow
];
const COLORS_MD = [
    "#4EA7F2", // Blue #1
    "#3188E6", // Blue #2
    "#43C5B1", // Teal #1
    "#00A78D", // Teal #2
    "#EA6175", // Red #1
    "#CE4257", // Red #2
    "#F4A261", // Orange #1
    "#F48935", // Orange #2
    "#2E8B57", // Purple #1 (replaced by secondary)
    "#2E8B57", // Purple #2 (replaced by secondary)
    "#FFD86D", // Yellow #1
    "#FFBC2C", // Yellow #2
];
const COLORS_LG = [
    "#4EA7F2", // Blue #1
    "#3188E6", // Blue #2
    "#056BD9", // Blue #3
    "#A76DBC", // Violet #1 -> Consider replacing if nécessaire
    "#7F4295", // Violet #2 -> Consider replacing if nécessaire
    "#2E8B57", // Violet #3 (replaced by secondary)
    "#EA6175", // Red #1
    "#CE4257", // Red #2
    "#982738", // Red #3
    "#43C5B1", // Teal #1
    "#00A78D", // Teal #2
    "#0E8270", // Teal #3
    "#F4A261", // Orange #1
    "#F48935", // Orange #2
    "#BE5D10", // Orange #3
    "#2E8B57", // Purple #1 (replaced by secondary)
    "#2E8B57", // Purple #2 (replaced by secondary)
    "#2E8B57", // Purple #3 (replaced by secondary)
    "#A4A8B6", // Gray #1
    "#7E8290", // Gray #2
    "#545B70", // Gray #3
    "#FFD86D", // Yellow #1
    "#FFBC2C", // Yellow #2
    "#C08A16", // Yellow #3
];
const COLORS_XL = [
    "#4EA7F2", // Blue #1
    "#3188E6", // Blue #2
    "#056BD9", // Blue #3
    "#155193", // Blue #4
    "#A76DBC", // Violet #1 -> Consider replacing if nécessaire
    "#7F4295", // Violet #2 -> Consider replacing if nécessaire
    "#2E8B57", // Violet #3 (replaced by secondary)
    "#2E8B57", // Violet #4 (replaced by secondary)
    "#EA6175", // Red #1
    "#CE4257", // Red #2
    "#982738", // Red #3
    "#791B29", // Red #4
    "#43C5B1", // Teal #1
    "#00A78D", // Teal #2
    "#0E8270", // Teal #3
    "#105F53", // Teal #4
    "#F4A261", // Orange #1
    "#F48935", // Orange #2
    "#BE5D10", // Orange #3
    "#7D380D", // Orange #4
    "#2E8B57", // Purple #1 (replaced by secondary)
    "#2E8B57", // Purple #2 (replaced by secondary)
    "#2E8B57", // Purple #3 (replaced by secondary)
    "#2E8B57", // Purple #4 (replaced by secondary)
    "#A4A8B6", // Grey #1
    "#7E8290", // Grey #2
    "#545B70", // Grey #3
    "#3F4250", // Grey #4
    "#FFD86D", // Yellow #1
    "#FFBC2C", // Yellow #2
    "#C08A16", // Yellow #3
    "#936A12", // Yellow #4
];

/**
 * @param {string} colorScheme
 * @param {string} paletteName
 * @returns {array}
 */
export function getColors(colorScheme, paletteName) {
    switch (paletteName) {
        case "odoo":
            return colorScheme === "dark" ? COLORS_ENT_DARK : COLORS_ENT_BRIGHT;
        case "sm":
            return COLORS_SM;
        case "md":
            return COLORS_MD;
        case "lg":
            return COLORS_LG;
        default:
            return COLORS_XL;
    }
}

/**
 * @param {number} index
 * @param {string} colorScheme
 * @returns {string}
 */
export function getColor(index, colorScheme, paletteSizeOrName) {
    let paletteName;
    if (paletteSizeOrName === "odoo") {
        paletteName = "odoo";
    } else if (paletteSizeOrName <= 6 || paletteSizeOrName === "sm") {
        paletteName = "sm";
    } else if (paletteSizeOrName <= 12 || paletteSizeOrName === "md") {
        paletteName = "md";
    } else if (paletteSizeOrName <= 24 || paletteSizeOrName === "lg") {
        paletteName = "lg";
    } else {
        paletteName = "xl";
    }
    const colors = getColors(colorScheme, paletteName);
    return colors[index % colors.length];
}

export const DEFAULT_BG = "#d3d3d3";

export function getBorderWhite(colorScheme) {
    return colorScheme === "dark" ? "rgba(38, 42, 54, .2)" : "rgba(249,250,251, .2)";
}

const RGB_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

/**
 * @param {string} hex
 * @param {number} opacity
 * @returns {string}
 */
export function hexToRGBA(hex, opacity) {
    const rgb = RGB_REGEX.exec(hex)
        .slice(1, 4)
        .map((n) => parseInt(n, 16))
        .join(",");
    return `rgba(${rgb},${opacity})`;
}

/**
 * Used to return custom colors depending on the color scheme
 * @param {string} colorScheme
 * @param {string} brightModeColor
 * @param {string} darkModeColor
 * @returns {string|Number|Boolean}
 */
export function getCustomColor(colorScheme, brightModeColor, darkModeColor) {
    if (darkModeColor === undefined) {
        return brightModeColor;
    } else {
        return colorScheme === "dark" ? darkModeColor : brightModeColor;
    }
}

/**
 * Used to lighten a color
 * @param {string} color
 * @param {number} factor
 * @returns {string}
 */
export function lightenColor(color, factor) {
    factor = clamp(factor, 0, 1);

    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    r = Math.round(r + (255 - r) * factor);
    g = Math.round(g + (255 - g) * factor);
    b = Math.round(b + (255 - b) * factor);

    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}

/**
 * Used to darken a color
 * @param {string} color
 * @param {number} factor
 * @returns {string}
 */
export function darkenColor(color, factor) {
    factor = clamp(factor, 0, 1);

    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    r = Math.round(r * (1 - factor));
    g = Math.round(g * (1 - factor));
    b = Math.round(b * (1 - factor));

    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}
