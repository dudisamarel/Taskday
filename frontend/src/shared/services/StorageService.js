export const storageService = {
    store,
    load,
    clear
}


function clear() {
    sessionStorage.clear();
}

function store(key, value) {
    const val = JSON.stringify(value)
    sessionStorage.setItem(key, val);

}

async function load(key, defaultValue = null) {
    var value = sessionStorage.getItem(key);
    if (!value) return defaultValue
    else return Promise.resolve(JSON.parse(value));
}

