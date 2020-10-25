let sCrypt = {
    dev: {},
    x: {}
}

sCrypt.encrypt = function (key, string) {
    let array = sCrypt.dev.toNs(string)
    let bkey = sCrypt.dev.bigKey(key)
    key = sCrypt.dev.toNs(key)
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

sCrypt.decrypt = function (key, array) {
    let bkey = sCrypt.dev.bigKey(key)
    key = sCrypt.dev.toNs(key)
    let res = []
    let x = 0
    for (item in array) {
        let keynum = item / key.length
        keynum = Math.round((keynum - Math.floor(keynum)) * key.length)
        res.push(array[[item]] / (key[[keynum]] * bkey))
        x++
        if (x == array.length) {
            res = sCrypt.dev.toLs(res)
            if (res.length === array.length) { return res } else { return '' }
        }
    }
}

sCrypt.dev.bigKey = function (key) {
    numbers = sCrypt.dev.toNs(key)
    let res = 1
    let x = 0
    for (item of numbers) {
        res = res + item
        x++
        if (x == key.length) {
            return res - (key.length)
        }
    }
}

sCrypt.dev.toN = function (string) {
    return sCrypt.dev.ls.indexOf(string)
}

sCrypt.dev.toL = function (number) {
    return sCrypt.dev.ls[[number]]
}

sCrypt.dev.toNs = function (string) {
    string = string.split('')
    let res = []
    let x = 0
    for (let item of string) {
        res.push(sCrypt.dev.toN(item))
        x++
        if (x == string.length) {
            return res
        }
    }
}

sCrypt.dev.toLs = function (array) {
    let res = ''
    let x = 0
    for (let item in array) {
        item = array[[item]]
        lv = sCrypt.dev.toL(item)
        if (!lv) { res = res } else { res = res + lv }
        x++
        if (x == array.length) {
            return res
        }
    }
}

try { // If jQuery is present, use it to load l.json
    $.getJSON('https://cdn.jsdelivr.net/gh/shie1/shiecrypt@main/l.json', json => {
        sCrypt.dev.ls = json
    });
}catch{ // Otherwise load it from a script
    script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/gh/shie1/shiecrypt@main/l.js"
    script.type = "text/javascript"
    document.head.append(script)
    script.remove()
}
