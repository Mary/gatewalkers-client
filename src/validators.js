export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';


export const isDate = field=> (stringDate) => {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(stringDate)) {
        return `Must be in mm/dd/yyyy format`;
    }
    var parts = field.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return `Must be in mm/dd/yyyy format`;
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29; {
        return day > 0 && day <= monthLength[month - 1];
    }
};