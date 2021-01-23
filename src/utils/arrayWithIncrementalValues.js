/**
 * 
 * @param {Her giver vi arrayet en startværdi} start 
 * @param {Her giver vi arrayet en slutværdi} end 
 * 
 * Dette er den nye løsning til vores Formcontrollabel, 
 * som retunere et array der har værdierne fra start til slutværdi
 * 
 */
export const arrayWithIncrementalValues = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)

// Incrementor
// arrayWithIncrementalValues(0, 100, 2)
// [0, 2, 4, 6 ... 100]

