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

function VysledekKontrolyZdravotniPojistovnaText() {

    const VysledekKontrolyZdravotniPojistovnaElementId = "VysledekKontrolyZdravotniPojistovnaVZPPoint";

    // Vystavení žádanky
    const TestovanyJmenoElement = document.getElementById("TestovanyJmeno");
    const TestovanyPrijmeniElement = document.getElementById("TestovanyPrijmeni");
    const TestovanyDatumNarozeniElement = document.getElementById("TestovanyDatumNarozeni");
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
        (TestovanyCisloPojistence && TestovanyJmenoElement.value && TestovanyPrijmeniElement.value && TestovanyDatumNarozeniElement.value) || 
        (Pacient_CisloPojistenceLabelElement && DetailPacientJmeno && DetailPacientPrijmeni && DetailDatumNarozeni)
    ) {
        const CisloPojistence = DetailPacientCisloPojistence ? DetailPacientCisloPojistence : (TestovanyCisloPojistence ? TestovanyCisloPojistence.value : null)
        const VysledekNextElement = ZdravotniPojistovnaKod ? ZdravotniPojistovnaKod : Pacient_CisloPojistenceLabelElement.nextElementSibling;
        const Jmeno = DetailPacientJmeno ? DetailPacientJmeno : (TestovanyJmenoElement ? TestovanyJmenoElement.value : null);
        const Prijmeni = DetailPacientPrijmeni ? DetailPacientPrijmeni : (TestovanyPrijmeniElement ? TestovanyPrijmeniElement.value : null);
        const DatumNarozeni = DetailDatumNarozeni ? DetailDatumNarozeni : (TestovanyDatumNarozeniElement ? TestovanyDatumNarozeniElement.value : null);

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

const ZdravotniPojistovnaKod = document.getElementById("ZdravotniPojistovnaKod");

if(ZdravotniPojistovnaKod) {
    ZdravotniPojistovnaKod.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}


const TestovanyJmeno = document.getElementById("TestovanyJmeno");

if(TestovanyJmeno) {
    TestovanyJmeno.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const TestovanyPrijmeni = document.getElementById("TestovanyPrijmeni");

if(TestovanyPrijmeni) {
    TestovanyPrijmeni.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

const TestovanyDatumNarozeni = document.getElementById("TestovanyDatumNarozeni");

if(TestovanyDatumNarozeni) {
    TestovanyDatumNarozeni.addEventListener("change", () => {
        VysledekKontrolyZdravotniPojistovnaText();
    });
}

VysledekKontrolyZdravotniPojistovnaText();