const TestovanyNarodnostElement = document.getElementById("TestovanyNarodnost");

if(TestovanyNarodnostElement) {
    TestovanyNarodnostElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

var ZdravotniPojistovnaKodElement = document.getElementById("ZdravotniPojistovnaKod");

if(ZdravotniPojistovnaKodElement) {
    ZdravotniPojistovnaKodElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const TestovanyJmenoElement = document.getElementById("TestovanyJmeno");

if(TestovanyJmenoElement) {
    TestovanyJmenoElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const TestovanyPrijmeniElement = document.getElementById("TestovanyPrijmeni");

if(TestovanyPrijmeniElement) {
    TestovanyPrijmeniElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const TestovanyDatumNarozeniElement = document.getElementById("TestovanyDatumNarozeni");

if(TestovanyDatumNarozeniElement) {
    TestovanyDatumNarozeniElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

function getRegistrCUDOvereniUrl() {
    return "/Registr/CUD/Overeni";
}

function getVysledekKontrolyZdravotniPojistovnaTextElement(id, text, useTd) {
    var VysledekKontrolyZdravotniPojistovnaTextElement = document.getElementById(id);

    if(!VysledekKontrolyZdravotniPojistovnaTextElement) {
        VysledekKontrolyZdravotniPojistovnaTextElement = document.createElement(useTd ? "td" : "div");
        VysledekKontrolyZdravotniPojistovnaTextElement.setAttribute("class", "textField");
        VysledekKontrolyZdravotniPojistovnaTextElement.setAttribute("style", "vertical-align: text-top;");
    } else {
        VysledekKontrolyZdravotniPojistovnaTextElement.style.display = "block";
    }
    VysledekKontrolyZdravotniPojistovnaTextElement.innerHTML = DOMPurify.sanitize(text);

    return VysledekKontrolyZdravotniPojistovnaTextElement;
}

function getDateDDdotMMdotYYYY(date) {
    var day = date.substr(0, date.indexOf('.'));
    var month = date.substr(date.indexOf('.') + 1, date.lastIndexOf('.') - date.indexOf('.') - 1) - 1;
    var year = date.substr(date.lastIndexOf('.') + 1, date.length + 1);
    var dateObj = new Date(year, month, day);
  
    if (isNaN(dateObj.getTime())) {
      dateObj = new Date(date);
    }
    
    return dateObj.getDate() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();
}

var TestovanyCisloPojistenceElement = document.getElementById("TestovanyCisloPojistence");

function VysledekKontrolyZdravotniPojistovnaText() {

    const VysledekKontrolyZdravotniPojistovnaElementId = "VysledekKontrolyZdravotniPojistovnaVZPPoint";

    // Overeni zadanky
    if(KodPojistovnyPrintDiv) {
        ZdravotniPojistovnaKodElement = KodPojistovnyPrintDiv;
    }
    if(CisloPojistencePrintDiv) {
        TestovanyCisloPojistenceElement = CisloPojistencePrintDiv;
    }

    // Detail pacienta
    const Pacient_CisloPojistenceLabelElement = document.querySelector('label[for="Pacient_CisloPojistence"]');
    var DetailPacientCisloPojistence = null;
    if(Pacient_CisloPojistenceLabelElement) {
        DetailPacientCisloPojistence = Pacient_CisloPojistenceLabelElement.nextElementSibling.innerText;
    }
    const Pacient_JmenoLabelElement = document.querySelector('label[for="Pacient_Jmeno"]');
    var DetailPacientJmeno = null;
    if(Pacient_JmenoLabelElement) {
        DetailPacientJmeno = Pacient_JmenoLabelElement.nextElementSibling.innerText;
    }
    const Pacient_PrijmeniLabelElement = document.querySelector('label[for="Pacient_Prijmeni"]');
    var DetailPacientPrijmeni = null;
    if(Pacient_PrijmeniLabelElement) {
        DetailPacientPrijmeni = Pacient_PrijmeniLabelElement.nextElementSibling.innerText;
    }
    const Pacient_DatumNarozeniElement = document.querySelector('label[for="PacientDatumNarozeniText"]');
    var DetailDatumNarozeni = null;
    if(Pacient_DatumNarozeniElement) {
        DetailDatumNarozeni = Pacient_DatumNarozeniElement.nextElementSibling.innerText;
    }

    const CisloPojistence = DetailPacientCisloPojistence ? DetailPacientCisloPojistence : (TestovanyCisloPojistenceElement && TestovanyCisloPojistenceElement.value ? TestovanyCisloPojistenceElement.value : CisloPojistencePrintDiv ? CisloPojistencePrintDiv.innerText : "");
    const Jmeno = DetailPacientJmeno ? DetailPacientJmeno : (TestovanyJmenoElement && TestovanyJmenoElement.value ? TestovanyJmenoElement.value : JmenoPrintDiv ? JmenoPrintDiv.innerText : "");
    const Prijmeni = DetailPacientPrijmeni ? DetailPacientPrijmeni : (TestovanyPrijmeniElement && TestovanyPrijmeniElement.value ? TestovanyPrijmeniElement.value : PrijmeniPrintDiv ? PrijmeniPrintDiv.innerText : "");
    const DatumNarozeni = DetailDatumNarozeni ? DetailDatumNarozeni : (TestovanyDatumNarozeniElement && TestovanyDatumNarozeniElement.value ? TestovanyDatumNarozeniElement.value : DatumNarozeniPrintDiv ? DatumNarozeniPrintDiv.innerText : "");
    const Narodnost = TestovanyNarodnostElement && TestovanyNarodnostElement.value ? TestovanyNarodnostElement.value : NarodnostPrintDiv ? NarodnostPrintDiv.innerText : "";

    var ZdravotniPojistovnaKodValue = ZdravotniPojistovnaKodElement && ZdravotniPojistovnaKodElement.value ? ZdravotniPojistovnaKodElement.value : (ZdravotniPojistovnaKodElement && ZdravotniPojistovnaKodElement.innerText ? ZdravotniPojistovnaKodElement.innerText.split(" ")[0] : "");

    if(
        (
            ZdravotniPojistovnaKodElement && 
            (
                ZdravotniPojistovnaKodValue == "111" ||
                ZdravotniPojistovnaKodValue == "201" ||
                ZdravotniPojistovnaKodValue == "205" ||
                ZdravotniPojistovnaKodValue == "207" ||
                ZdravotniPojistovnaKodValue == "209" ||
                ZdravotniPojistovnaKodValue == "211" ||
                ZdravotniPojistovnaKodValue == "213"
            ) &&
            (
                Jmeno && 
                Prijmeni && 
                DatumNarozeni
            ) &&
            Narodnost != "CZ" && Narodnost != "??esko"
        ) ||
        (
            Pacient_CisloPojistenceLabelElement && DetailPacientJmeno && DetailPacientPrijmeni && DetailDatumNarozeni
        )
    ) {
        const VysledekNextElement = ZdravotniPojistovnaKodElement ? ZdravotniPojistovnaKodElement : Pacient_CisloPojistenceLabelElement.nextElementSibling;

        chrome.runtime.sendMessage({
            "text": "OvereniPlatnostiPojisteni",
            "data": {
                "Jmeno": Jmeno,
                "Prijmeni": Prijmeni,
                "DatumNarozeni": DatumNarozeni
            }
        }, function(VysledekKontroly) {

            if(VysledekKontroly && VysledekKontroly.shrnuti) {

                var VysledekElement = null;

                if(
                    VysledekKontroly.shrnuti &&
                    VysledekKontroly.cisloPojistence &&
                    VysledekKontroly.druhPojisteni &&
                    VysledekKontroly.zdravotniPojistovna
                ) {

                    const ZdravotniPojistovnaVysledekKod = VysledekKontroly.zdravotniPojistovna.split("-")[0].trim();

                    if(ZdravotniPojistovnaKodElement && ZdravotniPojistovnaVysledekKod != ZdravotniPojistovnaKodValue) {
                        const ZdravotniPojistovnaKodText = ZdravotniPojistovnaKodValue ? ZdravotniPojistovnaKodValue : " ";
                        alert("Neshoduje se k??d poji????ovny na ????dance: '" + ZdravotniPojistovnaKodText + "' a k??d poji??tovny dohledan??ho podle jm??na, p????jmen?? a datumu narozen??: '" + ZdravotniPojistovnaVysledekKod + "'");
                    }

                    if(CisloPojistence && VysledekKontroly.cisloPojistence != CisloPojistence) {
                        alert("Neshoduje se ????slo poji??t??nce na ????dance: '" + CisloPojistence + "' a k??d poji??tovny dohledan??ho podle jm??na, p????jmen?? a datumu narozen??: '" + VysledekKontroly.cisloPojistence + "'");
                    }

                    VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                        "Jm??no, p????jmen?? a datum narozen?? (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                        "V??sledek ov????en??: " + VysledekKontroly.shrnuti + "<br>" +
                        "????slo poji??t??nce: " + VysledekKontroly.cisloPojistence + "<br>" +
                        "Druh poji??t??n??: " + VysledekKontroly.druhPojisteni + "<br>" +
                        "Zdravotn?? poji????ovna: " + VysledekKontroly.zdravotniPojistovna + "<br>",
                        true
                    );
                } else {

                    VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                        "Jm??no, p????jmen?? a datum narozen?? (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                        "V??sledek ov????en??: " + VysledekKontroly.shrnuti + "<br>",
                        true
                    );
                }

                VysledekElement.setAttribute("id", VysledekKontrolyZdravotniPojistovnaElementId);
                VysledekNextElement.parentNode.insertBefore(VysledekElement, VysledekNextElement.nextElementSibling);
            } else {
                VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                    "Jm??no, p????jmen?? a datum narozen?? (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                    "Nebylo mo??n?? ov????it. Probl??m na stran?? zprost??edkovatele ov????en?? nebo poskytovatele ov????en?? VZP.",
                    true
                );
                VysledekElement.setAttribute("id", VysledekKontrolyZdravotniPojistovnaElementId);
                VysledekNextElement.parentNode.insertBefore(VysledekElement, VysledekNextElement.nextElementSibling);
            }
        });
    } else {
        const VysledekKontrolyZdravotniPojistovnaText = document.getElementById(VysledekKontrolyZdravotniPojistovnaElementId);
        if (VysledekKontrolyZdravotniPojistovnaText) {
            VysledekKontrolyZdravotniPojistovnaText.style.display = "none";
        }
    }
}

var KodPojistovnyPrintDiv = null;
var CisloPojistencePrintDiv = null;
var JmenoPrintDiv = null;
var PrijmeniPrintDiv = null;
var DatumNarozeniPrintDiv = null;
var NarodnostPrintDiv = null;

const printDiv = document.getElementById("printDiv");

if(printDiv && window.location.pathname == getRegistrCUDOvereniUrl()) {
    const KodPojistovnyElement = document.evaluate('//td[contains(text(), "Zdravotn?? poji????ovna")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    KodPojistovnyPrintDiv = KodPojistovnyElement.singleNodeValue.nextSibling.nextSibling;
    const CisloPojistenceElement = document.evaluate('//td[contains(text(), "????slo poji??t??nce")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    CisloPojistencePrintDiv = CisloPojistenceElement.singleNodeValue.nextSibling.nextSibling;
    const JmenoElement = document.evaluate('//td[contains(text(), "Jm??no")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    JmenoPrintDiv = JmenoElement.singleNodeValue.nextSibling.nextSibling;
    const PrijmeniElement = document.evaluate('//td[contains(text(), "P????jmen??")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    PrijmeniPrintDiv = PrijmeniElement.singleNodeValue.nextSibling.nextSibling;
    const DatumNarozeniElement = document.evaluate('//td[contains(text(), "Datum narozen??")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    DatumNarozeniPrintDiv = DatumNarozeniElement.singleNodeValue.nextSibling.nextSibling;
    const NarodnostElement = document.evaluate('//td[contains(text(), "St??tn?? p????slu??nost")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    NarodnostPrintDiv = NarodnostElement.singleNodeValue.nextSibling.nextSibling;
}

VysledekKontrolyZdravotniPojistovnaText();

function getRegistrCUDOvereniUrl() {
    return "/Registr/CUD/Overeni";
}