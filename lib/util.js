function timeLeftMin(time) {
    var today = new Date();
    var timeLeft = Math.ceil((time.getTime() - today.getTime()) / 1000 / 60);
    if (timeLeft < 0) {
        return 'N.A.';
    } else {
        return timeLeft + ' min';
    }
}

function currentTimeGreeting() {
    var hours = new Date().getHours();
    if (hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18) {
        return 'evening';
    } else {
        return '';
    }
}

function formatDate(date) {
    return date.toDateString().substr(0, 3) + ', ' + date.toDateString().substr(4, 6);
}

function formatTime(date) {
    var median = (date.getHours() < 12) ? 'AM' : 'PM';
    return (formatDigit(date.getHours() % 12)) + ':' + formatDigit(date.getMinutes()) + ' ' + median;
}

function formatDigit(n) {
    return n > 9 ? '' + n : '0' + n;
}

function calculateNUSMatricNumber(id) {
    // credits to Beng Hee <beng@benghee.eu>
    var matches = id.toUpperCase().match(/^A\d{7}|U\d{6,7}/);
    if (matches) {
        var match = matches[0];

        // Discard 3rd digit from U-prefixed NUSNET ID
        if (match[0] === 'U' && match.length === 8) {
            match = match.slice(0, 3) + match.slice(4);
        }

        var weights = {
            U: [0, 1, 3, 1, 2, 7],
            A: [1, 1, 1, 1, 1, 1]
        }[match[0]];

        for (var i = 0, sum = 0, digits = match.slice(-6); i < 6; i++) {
            sum += weights[i] * digits[i];
        }

        return match + 'YXWURNMLJHEAB' [sum % 13];
    }
}

module.exports = {
    timeLeftMin, currentTimeGreeting, formatDate, formatTime, formatDigit, calculateNUSMatricNumber
};
