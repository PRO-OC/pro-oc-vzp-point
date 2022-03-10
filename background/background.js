importScripts("../lib/crypto-js.min.js");

// Duplikované v options/options.js
const chromeLocalStorageOptionsNamespace = "pro-oc-vzp-point-options";

const SERVER_URL = "ServerUrl";
const ENCRYPTING_DISABLED = "EncryptingDisabled";
const ENCRYPTING_PASSWORD = "EncryptingPassword";

function getOptionsFromLocalStorage(callback) {
    chrome.storage.local.get([chromeLocalStorageOptionsNamespace], function(data) {
        callback(data[chromeLocalStorageOptionsNamespace]);
    });
}

function getOvereniPlatnostiPojisteniPage() {
    return "/online/online01";
}

function encryptBody(body, key) {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify( { body }), key).toString();
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
    return encData;
}

function decryptBody(body, key) {
    let decData = CryptoJS.enc.Base64.parse(body).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes).body;
}

function getContentType(EncryptingDisabled) {
    return !EncryptingDisabled ? "text/plain" : "text/xml";
}

function getRequestBody(EncryptingDisabled, body, key) {
    return !EncryptingDisabled ? encryptBody(body, key) : body
}

function getResponseBody(EncryptingDisabled, body, key) {
    return !EncryptingDisabled ? decryptBody(body, key) : body;
}

function getOvereniPlatnostiPojisteniUrlParams(jmeno, prijmeni, datumNarozeni) {
    var urlParams = new URLSearchParams();
    urlParams.set("firstName", jmeno);
    urlParams.set("lastName", prijmeni);
    urlParams.set("dateBirth", datumNarozeni);
    return urlParams;
}

function OvereniPlatnostiPojisteni(jmeno, prijmeni, datumNarozeni, onSuccess, onError) {

    getOptionsFromLocalStorage(function(optionsURLSearchParams) {

        var options = new URLSearchParams(optionsURLSearchParams);
        var ServerUrlFromOptions = options.get(SERVER_URL);

        if(!ServerUrlFromOptions) {
            onError();
        }

        var EncryptingDisabled = options.get(ENCRYPTING_DISABLED) == "true" ? true : false;
        var EncryptingPassword = options.get(ENCRYPTING_PASSWORD);

        var url = ServerUrlFromOptions + getOvereniPlatnostiPojisteniPage();
        var urlParams = getOvereniPlatnostiPojisteniUrlParams(jmeno, prijmeni, datumNarozeni);

        fetch(url + "?" + urlParams.toString(), {
            method: 'get',
            headers: {
                "Content-type": getContentType(EncryptingDisabled)
            }
        })
        .then(function (response) {
            if (response.status == 200) {
                try {
                    response.text().then(function(responseText) {

                        var results = getResponseBody(EncryptingDisabled, responseText, EncryptingPassword);

                        var results = {
                            "shrnuti": results.shrnuti,
                            "cisloPojistence": results.cisloPojistence,
                            "druhPojisteni": results.druhPojisteni,
                            "zdravotniPojistovna": results.zdravotniPojistovna,
                        };
                        onSuccess(results);
                    });
                } catch(err) {
                    console.log(err)
                    onError();
                }
            } else {
                onError();
            }
        })
        .catch(function (error) {
            console.log(error);
            onError();
        });
    });
}


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'OvereniPlatnostiPojisteni' && msg.data.Jmeno && msg.data.Prijmeni && msg.data.DatumNarozeni) {
        OvereniPlatnostiPojisteni(msg.data.Jmeno, msg.data.Prijmeni, msg.data.DatumNarozeni, function(responsePrubehPojisteniDruhB2B) {
            sendResponse(responsePrubehPojisteniDruhB2B);
        }, function() {
            sendResponse(false);
        });
        return true;
    }
});