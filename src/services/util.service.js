export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getMonthName
}

//? makeId length =10
function makeId( length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}



// console.log('id:', makeId('task'));
// console.log('id:', makeId('group'));
// console.log('id:', makeId('checklist'));
// //!BUG WITH THE TASK !
// console.log('id:', makeId('todos'));
// console.log('id:', makeId('labels'));

function getMonthName(date) {
  
    return date.toLocaleString('default', { month: 'short' })
}
