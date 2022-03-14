const TestovanyNarodnostElement = document.getElementById("TestovanyNarodnost");

if(TestovanyNarodnostElement) {
    TestovanyNarodnostElement.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const ZdravotniPojistovnaKodElement = document.getElementById("ZdravotniPojistovnaKod");

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

function getVysledekKontrolyZdravotniPojistovnaTextElement(id, text) {
    var VysledekKontrolyZdravotniPojistovnaTextElement = document.getElementById(id);

    if(!VysledekKontrolyZdravotniPojistovnaTextElement) {
        VysledekKontrolyZdravotniPojistovnaTextElement = document.createElement("div");
        VysledekKontrolyZdravotniPojistovnaTextElement.setAttribute("class", "textField");
    } else {
        VysledekKontrolyZdravotniPojistovnaTextElement.style.display = "block";
    }
    VysledekKontrolyZdravotniPojistovnaTextElement.innerHTML = text;

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

function VysledekKontrolyZdravotniPojistovnaText() {

    const VysledekKontrolyZdravotniPojistovnaElementId = "VysledekKontrolyZdravotniPojistovnaVZPPoint";

    // Vystavení žádanky
    const TestovanyCisloPojistence = document.getElementById("TestovanyCisloPojistence");

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

    if(
        (
            ZdravotniPojistovnaKodElement && 
            (
                ZdravotniPojistovnaKod.value == "111" ||
                ZdravotniPojistovnaKod.value == "201" ||
                ZdravotniPojistovnaKod.value == "205" ||
                ZdravotniPojistovnaKod.value == "207" ||
                ZdravotniPojistovnaKod.value == "209" ||
                ZdravotniPojistovnaKod.value == "211" ||
                ZdravotniPojistovnaKod.value == "213"
            ) &&
            (TestovanyJmenoElement.value && TestovanyPrijmeniElement.value && TestovanyDatumNarozeniElement.value) &&
            TestovanyNarodnostElement && TestovanyNarodnostElement.value != "CZ" 
        ) ||
        (
            Pacient_CisloPojistenceLabelElement && DetailPacientJmeno && DetailPacientPrijmeni && DetailDatumNarozeni
        )
    ) {
        const CisloPojistence = DetailPacientCisloPojistence ? DetailPacientCisloPojistence : (TestovanyCisloPojistence ? TestovanyCisloPojistence.value : null)
        const VysledekNextElement = ZdravotniPojistovnaKod ? ZdravotniPojistovnaKod : Pacient_CisloPojistenceLabelElement.nextElementSibling;
        const Jmeno = DetailPacientJmeno ? DetailPacientJmeno : (TestovanyJmenoElement ? TestovanyJmenoElement.value : null);
        const Prijmeni = DetailPacientPrijmeni ? DetailPacientPrijmeni : (TestovanyPrijmeniElement ? TestovanyPrijmeniElement.value : null);
        const DatumNarozeni = DetailDatumNarozeni ? DetailDatumNarozeni : (TestovanyDatumNarozeniElement ? getDateDDdotMMdotYYYY(TestovanyDatumNarozeniElement.value) : null);

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

                    if(ZdravotniPojistovnaKod && ZdravotniPojistovnaVysledekKod != ZdravotniPojistovnaKod.value) {
                        const ZdravotniPojistovnaKodText = ZdravotniPojistovnaKod.value ? ZdravotniPojistovnaKod.value : " ";
                        alert("Neshoduje se kód pojišťovny na žádance: '" + ZdravotniPojistovnaKodText + "' a kód pojištovny dohledaného podle jména, příjmení a datumu narození: '" + ZdravotniPojistovnaVysledekKod + "'");
                    }

                    if(CisloPojistence && VysledekKontroly.cisloPojistence != CisloPojistence) {
                        alert("Neshoduje se číslo pojištěnce na žádance: '" + CisloPojistence + "' a kód pojištovny dohledaného podle jména, příjmení a datumu narození: '" + VysledekKontroly.cisloPojistence + "'");
                    }

                    VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                        "Jméno, příjmení a datum narození (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                        "Výsledek ověření: " + VysledekKontroly.shrnuti + "<br>" +
                        "Číslo pojištěnce: " + VysledekKontroly.cisloPojistence + "<br>" +
                        "Druh pojištění: " + VysledekKontroly.druhPojisteni + "<br>" +
                        "Zdravotní pojišťovna: " + VysledekKontroly.zdravotniPojistovna + "<br>",
                    );
                } else {

                    VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                        "Jméno, příjmení a datum narození (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                        "Výsledek ověření: " + VysledekKontroly.shrnuti + "<br>"
                    );
                }

                VysledekElement.setAttribute("id", VysledekKontrolyZdravotniPojistovnaElementId);
                VysledekNextElement.parentNode.insertBefore(VysledekElement, VysledekNextElement.nextElementSibling);
            } else {
                VysledekElement = getVysledekKontrolyZdravotniPojistovnaTextElement(VysledekKontrolyZdravotniPojistovnaElementId,
                    "Jméno, příjmení a datum narození (" + Jmeno + ", " + Prijmeni + " a " + DatumNarozeni + "):" + "<br><br>" +
                    "Nebylo možné ověřit. Problém na straně zprostředkovatele ověření nebo poskytovatele ověření VZP."
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

VysledekKontrolyZdravotniPojistovnaText();