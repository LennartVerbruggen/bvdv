const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function removeDuplicates(arr) {
    var uniq = []
    arr.forEach(e => {
        if (!uniq.includes(e)) {
            uniq.push(e);
        }
    })
    return uniq;
}

// Remove items from arr1 found in arr2
function removeIntersection(arr1, arr2) {
    return arr1.filter(function (item) {
        return arr2.indexOf(item) < 0;
    });
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePairs(name) {
    const cleaned = name.replace(/ /g, "").toUpperCase();
    let chars = removeDuplicates(cleaned.split(""));
    let remainder = removeIntersection(alphabet, chars);


    let nameLetters = []
    let pairs = []
    for (let i = 0; i < 10; i++) {
        if (chars.length > 0) {
            let r = 0;

            // First pair cannot be first letter of name
            if (i == 0) {
                r = getRandomInt(1, chars.length - 1);
            } else {
                r = getRandomInt(0, chars.length - 1)
            }

            const char1 = chars[r];
            nameLetters.push(chars[r])
            const char2 = remainder[Math.floor(Math.random() * remainder.length)];

            const coin_flip = (Math.random() < 0.5);

            if (coin_flip) {
                pairs[i] = [char1, char2];
            } else {
                pairs[i] = [char2, char1];
            }

            chars.splice(chars.indexOf(char1), 1);
            remainder.splice(remainder.indexOf(char2), 1);
        } else { // Generate random, ignored pairs
            console.log(remainder)
            const char1 = remainder[Math.floor(Math.random() * remainder.length)];
            let char2 = char1;
            while (char2 == char1) {
                char2 = remainder[Math.floor(Math.random() * remainder.length)];
            }
            pairs[i] = [char1, char2];
        }
    }

    return [pairs, nameLetters];
}

module.exports = generatePairs;