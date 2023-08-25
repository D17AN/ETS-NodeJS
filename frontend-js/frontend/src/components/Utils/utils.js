export const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}


export const kebabCase = (str) => str.replaceAll(' ', '-');


export function capitalizeWords(str) {
    const abbreviations = [
        "vs",
    ];
    
    const separators = /[ ]/;
    
    return str
      .split(separators)
      .map(word => {
        if (abbreviations.includes(word.toLowerCase())) {
            return word.toUpperCase();
        } else if (word.includes('-')) {
            return word.split('-').map(subWord => {
                return subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase();
            }).join('-');
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join(' ');
}



export function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);

    // Get the day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function listsAreEqual(l1, l2) {
    const json1 = JSON.stringify(Array.from(l1));
    const json2 = JSON.stringify(Array.from(l2));

    return json1 === json2;
}

export function createDiv(...classes) {
    const div = document.createElement('div');
    div.classList.add(...classes);
    return div;
}

export function createParagraph(...classes){
    const p = document.createElement('p');
    p.classList.add(...classes);
    return p;
}

export function createInput(...classes){
    const input = document.createElement('input');
    input.classList.add(...classes);
    return input;
}

export function createSelect(...classes) {
    const select = document.createElement('select');
    select.classList.add(...classes);
    return select;
}

export function createButton(classes, buttonId, innerHTML, handler){
    const button = document.createElement('button');
    button.classList.add(...classes);
    button.id = buttonId;
    button.innerHTML = innerHTML;
    button.addEventListener('click', handler);
    return button;
}


