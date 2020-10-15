let ls

$.getJSON("https://raw.githubusercontent.com/shie1/shiecrypt/main/l.json", function (json) {
    ls = json
});

function encrypt(key, string) {
    let array = toNum(string)
    let bkey = bigKey(key)
    key = toNum(key)
    let res = []
    let x = 0
    for (item in array) {
        let keynum = item / key.length
        keynum = Math.round((keynum - Math.floor(keynum)) * key.length)
        res.push(array[[item]] * (key[[keynum]] * bkey))
        x++
        if (x == array.length) {
            return res
        }
    }
}

function decrypt(key, array) {
    let bkey = bigKey(key)
    key = toNum(key)
    let res = []
    let x = 0
    for (item in array) {
        let keynum = item / key.length
        keynum = Math.round((keynum - Math.floor(keynum)) * key.length)
        res.push(array[[item]] / (key[[keynum]] * bkey))
        x++
        if (x == array.length) {
            res = toLetter(res)
            if (res.length === array.length) { return res } else { return '' }
        }
    }
}

function bigKey(key) {
    key = toNum(key)
    let res = 1
    let x = 0
    for (item in key) {
        res = res * key[[item]]
        x++
        if (x == key.length) {
            return res
        }
    }
}

function whereL(string) {
    return ls.indexOf(string)
}

function whereN(number) {
    return ls[[number]]
}

function toNum(string) {
    string = string.split('')
    let res = []
    let x = 0
    for (let item of string) {
        res.push(whereL(item))
        x++
        if (x == string.length) {
            return res
        }
    }
}

function toLetter(array) {
    let res = ''
    let x = 0
    for (let item in array) {
        item = array[[item]]
        lv = whereN(item)
        if (!lv) { res = res } else { res = res + lv }
        x++
        if (x == array.length) {
            return res
        }
    }
}

function keyify(key) {
    let keyr = /^[a-zA-Z]+$/
    key.split('')
    let n = 0
    let res = ''
    for (item of key) {
        if (item.match(keyr)) { res = res + item }
        n++
        if (n === key.length) {
            return res
        }
    }
}
