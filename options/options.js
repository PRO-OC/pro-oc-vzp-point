// Duplikované v background/background.js
const chromeLocalStorageOptionsNamespace = "pro-oc-vzp-point-options";

const SERVER_URL = "ServerUrl";
const ENCRYPTING_DISABLED = "EncryptingDisabled";
const ENCRYPTING_PASSWORD = "EncryptingPassword";

function setOptionsToLocalStorage(options) {
  chrome.storage.local.set({[chromeLocalStorageOptionsNamespace] : options});
}

function getOptionsFromLocalStorage(callback) {
  chrome.storage.local.get([chromeLocalStorageOptionsNamespace], function(data) {
    callback(data[chromeLocalStorageOptionsNamespace]);
  });
}

function setServerUrl(ServerUrl) {
  var ServerUrlElement = document.getElementById(SERVER_URL);
  ServerUrlElement.value = ServerUrl;
}

function setEncryptingPassword(EncryptingPassword) {
  var EncryptingPasswordElement = document.getElementById(ENCRYPTING_PASSWORD);
  EncryptingPasswordElement.value = EncryptingPassword;
}

function setEncryptingDisabled(EncryptingDisabled) {
  var EncryptingDisabledElement = document.getElementById(ENCRYPTING_DISABLED);
  EncryptingDisabledElement.checked = EncryptingDisabled;
}

function saveOptions(ServerUrl, EncryptingDisabled, EncryptingPassword) {
  var options = new URLSearchParams();
  options.set(SERVER_URL, ServerUrl);
  options.set(ENCRYPTING_DISABLED, EncryptingDisabled);
  options.set(ENCRYPTING_PASSWORD, EncryptingPassword);

  setOptionsToLocalStorage(options.toString());
}

function getOptions(callback) {
  getOptionsFromLocalStorage(function(optionsURLSearchParams) {
    var options = new URLSearchParams(optionsURLSearchParams);
    callback(options);
  });
}

const optionsForm = document.getElementById("options");
if(optionsForm) {
  optionsForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var optionsFormData = new FormData(optionsForm);

    var EncryptingDisabled = document.getElementById(ENCRYPTING_DISABLED);

    saveOptions(
      optionsFormData.get(SERVER_URL),
      EncryptingDisabled ? EncryptingDisabled.checked : false,
      optionsFormData.get(ENCRYPTING_PASSWORD)
    )
  });
}

window.onload = function() {
  getOptions(function(options) {
    setServerUrl(options.get(SERVER_URL));
    setEncryptingDisabled(options.get(ENCRYPTING_DISABLED) == "true" ? true : false);
    setEncryptingPassword(options.get(ENCRYPTING_PASSWORD));
  });
};