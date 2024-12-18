
document.addEventListener("DOMContentLoaded", function(){
    if(document.URL.includes("Traduction.html")){
        const formTraduction = document.getElementById("traduction");

        formTraduction.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequence = document.getElementById("Sequence").value;
            let traduction = lire_sequence(sequence);
            document.getElementById("resultat").innerHTML = traduction;
            return false;
    
        })
    } else if(document.URL.includes("ReverseComplement.html")){
        const formRC = document.getElementById("reverseComplement");
    
        formRC.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequence = document.getElementById("Sequence").value;
            let reverseComplement = rc(sequence);
            document.getElementById("resultat").innerHTML = reverseComplement;
            return false;
        }) 
    } else if(document.URL.includes("GeneCodant.html")){
        const formGC = document.getElementById("geneCodant");

        formGC.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequenceADN = document.getElementById("SequenceADN").value;
            let sequenceProteine = document.getElementById("SequenceProteine").value;
            let resultat = trouve_proteine(sequenceADN,sequenceProteine);
            document.getElementById("resultat").innerHTML = resultat;
            return false;
        })
    } else if(document.URL.includes("HybridationAmorce.html")){
        const formHA = document.getElementById("hybridationAmorce");
    
        formHA.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequenceADN = document.getElementById("SequenceADN").value;
            let sequenceAmorce = document.getElementById("SequenceAmorce").value;
            let pourcentageRessemblance = document.getElementById("PourcentageRessemblance").value.replace(/\D/g, '');

            console.log(pourcentageRessemblance);
            if(pourcentageRessemblance == "" || pourcentageRessemblance == undefined){
                afficheErreurs("La case « pourcentage d'erreur » a été laissée vide ou est illisible. Une valeur par défaut de 80% a été attribué.", "HApourcentageVide");
                pourcentageRessemblance = 80;
            }

            let resultat = hybridation_amorce(sequenceAmorce, sequenceADN, pourcentageRessemblance);
            document.getElementById("resultat").innerHTML = resultat;
            return false;
        }) 
    } else if(document.URL.includes("NomenclatureUnTrois.html")){
        const formNomenclature = document.getElementById("nomenclature");

        formNomenclature.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequence = document.getElementById("Sequence").value;
            let sequenceTroisLettres = nomenclature_une_lettre(sequence);
            document.getElementById("resultat").innerHTML = sequenceTroisLettres;
            return false;

        })
    } else if(document.URL.includes("PrevalenceCodons.html")){
        const form = document.getElementById("PrevalenceCodons");

        form.addEventListener("submit", function (event) {
            event.preventDefault()
            let sequence = document.getElementById("Sequence").value;
            let dictPrevalence = recurrence_codons(sequence);
            let message = "";
            let objet;
            for(objet in dictPrevalence){
                message = message +objet + " " + dictPrevalence[objet] + "<br>";
            }
            document.getElementById("resultat").innerHTML = message;
            return false;

        })
    
    } /*else if(document.URL.includes("TrouveAA.html")){

    }*/
    
    
    
})



/********Initialisation de la bibliothèques d'acides aminés*********/
acides_amines = {}

acides_amines['TTT']='Phe'
acides_amines['TTC']='Phe'

acides_amines['TTA']='Leu'
acides_amines['TTG']='Leu'
acides_amines['CTT']='Leu'
acides_amines['CTC']='Leu'
acides_amines['CTA']='Leu'
acides_amines['CTG']='Leu'

acides_amines['ATT']='Ile'
acides_amines['ATC']='Ile'
acides_amines['ATA']='Ile'

acides_amines['ATG']='Met'

acides_amines['GTT']='Val'
acides_amines['GTC']='Val'
acides_amines['GTA']='Val'
acides_amines['GTG']='Val'

acides_amines['TCT']='Ser'
acides_amines['TCC']='Ser'
acides_amines['TCA']='Ser'
acides_amines['TCG']='Ser'

acides_amines['CCT']='Pro'
acides_amines['CCC']='Pro'
acides_amines['CCA']='Pro'
acides_amines['CCG']='Pro'

acides_amines['ACT']='Thr'
acides_amines['ACC']='Thr'
acides_amines['ACA']='Thr'
acides_amines['ACG']='Thr'

acides_amines['GCT']='Ala'
acides_amines['GCC']='Ala'
acides_amines['GCA']='Ala'
acides_amines['GCG']='Ala'

acides_amines['TAT']='Tyr'
acides_amines['TAC']='Tyr'

acides_amines['TAA']='_Stop_'
acides_amines['TAG']='_Stop_'

acides_amines['CAT']='His'
acides_amines['CAC']='His'

acides_amines['CAA']='Gln'
acides_amines['CAG']='Gln'

acides_amines['AAT']='Asn'
acides_amines['AAC']='Asn'

acides_amines['AAA']='Lys'
acides_amines['AAG']='Lys'

acides_amines['GAT']='Asp'
acides_amines['GAC']='Asp'

acides_amines['GAA']='Glu'
acides_amines['GAG']='Glu'

acides_amines['TGT']='Cys'
acides_amines['TGC']='Cys'

acides_amines['TGA']='_Stop_'

acides_amines['TGG']='Trp'

acides_amines['CGT']='Arg'
acides_amines['CGC']='Arg'
acides_amines['CGA']='Arg'
acides_amines['CGG']='Arg'

acides_amines['AGT']='Ser'
acides_amines['AGC']='Ser'

acides_amines['AGA']='Arg'
acides_amines['AGG']='Arg'

acides_amines['GGT']='Gly'
acides_amines['GGC']='Gly'
acides_amines['GGA']='Gly'
acides_amines['GGG']='Gly'

/***********Initialisation de la bibliothèque des acides aminés (écriture 3 lettres -> écriture 1 lettre)***************/

aa_nomenclature1 = {}

aa_nomenclature1['Ala']='A'
aa_nomenclature1['Gly']='G'
aa_nomenclature1['Ile']='I'
aa_nomenclature1['Leu']='L'
aa_nomenclature1['Pro']='P'
aa_nomenclature1['Val']='V'
aa_nomenclature1['Phe']='F'
aa_nomenclature1['Trp']='W'
aa_nomenclature1['Tyr']='Y'
aa_nomenclature1['Asp']='D'
aa_nomenclature1['Glu']='E'
aa_nomenclature1['Arg']='R'
aa_nomenclature1['His']='H'
aa_nomenclature1['Lys']='K'
aa_nomenclature1['Ser']='S'
aa_nomenclature1['Thr']='T'
aa_nomenclature1['Cys']='C'
aa_nomenclature1['Met']='M'
aa_nomenclature1['Asn']='N'
aa_nomenclature1['Gln']='Q'
aa_nomenclature1['_Stop_']='_STOP_'

/*********Initialisation de la bibliothèque des acides aminés (écriture 1 lettre -> écriture 3 lettres)*************/

aa_nomenclature2 = {}

aa_nomenclature2['A']='Ala'
aa_nomenclature2['G']='Gly'
aa_nomenclature2['I']='Ile'
aa_nomenclature2['L']='Leu'
aa_nomenclature2['P']='Pro'
aa_nomenclature2['V']='Val'
aa_nomenclature2['F']='Phe'
aa_nomenclature2['W']='Trp'
aa_nomenclature2['Y']='Tyr'
aa_nomenclature2['D']='Asp'
aa_nomenclature2['E']='Glu'
aa_nomenclature2['R']='Arg'
aa_nomenclature2['H']='His'
aa_nomenclature2['K']='Lys'
aa_nomenclature2['S']='Ser'
aa_nomenclature2['T']='Thr'
aa_nomenclature2['C']='Cys'
aa_nomenclature2['M']='Met'
aa_nomenclature2['N']='Asn'
aa_nomenclature2['Q']='Gln'
aa_nomenclature2['_STOP_']='_Stop_'

function lire_sequence(sequence){
    /* (str) -> str
    Cette fonction prend en entrée une séquence d'acides nucléiques et affiche
    la séquence d'acides aminés correspondante.
    retourne un string avec la séquence d'acide aminés.
    */

    sequence = sequence.toUpperCase()
    j = 0;
    aa = '';
    let sequenceAA = "";
    erreur = "";
    
    while (j < sequence.length) {
        aa = aa_nomenclature1[(acides_amines[sequence[j]+sequence[j+1]+sequence[j+2]])];
        if(aa == undefined){
            sequenceAA = sequenceAA + "?";
            erreur = erreur + "Erreur aux positions : " + j.toString() + "-" + (j+1).toString() + "-" + (j+2).toString() + " : ";
                if(sequence[j+2] == undefined){
                    erreur = erreur + "Codon incomplet <br>";
                } else if (sequence[j] != "A" && sequence[j] != "T" && sequence[j] != "C" && sequence[j] != "G") {
                    erreur = erreur + "Nucléotide #" + j.toString() + "[" + sequence[j].toString() + "] inconnu <br>";
                }else if (sequence[j+1] != "A" && sequence[j+1] != "T" && sequence[j+1] != "C" && sequence[j+1] != "G") {
                    erreur = erreur + "Nucléotide #" + (j+1).toString() + "[" + sequence[j+1].toString() + "] inconnu <br>";
                }else if (sequence[j+2] != "A" && sequence[j+2] != "T" && sequence[j+2] != "C" && sequence[j+2] != "G") {
                    erreur = erreur + "Nucléotide #" + (j+2).toString() + "[" + sequence[j+2].toString() + "] inconnu <br>";
                } else {
                    erreur = erreur + "Cause inconnue <br>";
                }
            j +=3
        } else {
            sequenceAA = sequenceAA + aa;
            j += 3;
        }
    }

    if (erreur != ""){
        afficheErreurs(erreur, "traductionErreurs");
    }

    return sequenceAA;     
}


function afficheErreurs(txtErreurs, id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML = txtErreurs;
}

        function rc(sequence) {
            /* (str) -> str
            Cette fonction prend en entrée une séquence d'ADN et retourne son "reverse-complement",
            c'est-à-dire la séquence correspondante sur son brin complémentaire, lu de 5' en 3'.
            */

            sequence = sequence.toUpperCase();

            let complement = "";
            let resultat = "";
            let erreurs = "";
            let i = 0;
            
            while (i<sequence.length) {
                if(sequence[i] == "A") {
                    complement = complement + "T";
                }
                else if (sequence[i] == "T") {
                    complement = complement + "A";
                }
                else if (sequence[i] == "C") {
                    complement = complement + "G";
                }
                else if (sequence[i] == "G") {
                    complement = complement + "C";
                }
                else {
                    erreurs = erreurs + "Caractère non reconnu à la position " + (i+1).toString() + " : " + sequence[i].toString() + "<br>"
                    complement = complement + "N";
                }
                    
                i = i + 1;
            }

            let j = 0;
            
            while (j < sequence.length) {
                resultat = resultat + complement[sequence.length-1-j];
                j = j + 1;
            }

            if(erreurs != ""){
                afficheErreurs(erreurs, "rcErreurs");
            }

            return resultat;
        }
function nomenclature_une_lettre(sequence) {
        /*(str) -> list
        Cette fonction prend en entrée une séquence d'acide aminées sous leur
        nomenclature à une lettre (p.ex. A,R,F,K, etc.) et retourne la séquence
        d'acides aminés sous leur nomenclature à 3 lettres (p.ex. Ala, Arg, Phe, Lys, etc.)
        */
        sequence = sequence.toUpperCase();
        resultat = "";
        erreurs = "";
        i = 0;
        while (i<sequence.length) {
            if(aa_nomenclature2[sequence[i]] == undefined){
                erreurs = erreurs + "Caractère non reconnu à la position " + (i+1).toString() + " : " + sequence[i].toString() + "<br>";
                resultat = resultat + "?";
            } else {
                resultat = resultat + (aa_nomenclature2[sequence[i]]);
            }
            i = i+1;
        }

        if(erreurs != ""){
            afficheErreurs(erreurs, "nomenclatureErreurs");
        }

        return resultat;
}

function trouve_proteine(sequenceADN, sequenceAA) {
    /*(str, str) -> int
    Cette fonction prend en entrée une séquence d'acides nucléiques et une séquence d'acides
    aminés sur sa nomenclature à une lettre (p.ex. G ou Y) et retourne
    la position de la première apparition de cette séquence d'acides aminés, peu importe le
    cadre de lecture.
    */
    sequenceADN = sequenceADN.toUpperCase();
    sequenceAA = sequenceAA.toUpperCase();

    let sequenceSimple = false;
    if(sequenceAA.length == 1){
        sequenceSimple = true;
    }
    
    let i = 0
    
    while (i<(sequenceADN.length-2)){
        aa = aa_nomenclature1[acides_amines[sequenceADN[i] + sequenceADN[i+1] + sequenceADN[i+2]]]
        if(aa == undefined){
            afficheErreurs("Erreur. La séquence de nucléotides est invalide", "erreursGC");
            return "";
        }
        console.log(aa == sequenceAA[0])
        if(aa == sequenceAA[0]){ 
            if(sequenceSimple){
                return ("Séquence trouvée. Positions : " + i.toString() + " à " + (i+3).toString());
            }
            
            let positionAA = 1 ;
            let positionADN = i+3;
            let bonneSequence = true;
            while(positionAA<sequenceAA.length){
                let prochainAA = aa_nomenclature1[acides_amines[sequenceADN[positionADN] + sequenceADN[positionADN+1] + sequenceADN[positionADN+2]]]
                if(prochainAA != sequenceAA[positionAA]){
                    bonneSequence = false;
                    break;
                }
                
                positionAA += 1;
                positionADN += 3;
            }
            if(bonneSequence){
                return ("Séquence trouvée. Positions : " + i.toString() + " à " + (i+sequenceAA.length*3).toString());
            }
        }
        i += 1;
    }

    afficheErreurs("Séquence non trouvée", "erreursGC");
    return ""

    // Ça serait beaucoup plus efficace avec une fonction récursive...
}

function recurrence_codons(sequence) {
    /*(str) -> dict
    Cette fonction prend en entrée une séquence de nucléotides et affiche la
    récurrence de chaque codon. Elle suit le cadre de lecture donné.
    */

    sequence = sequence.toUpperCase();

    dictionnaire = {} ;
    j = 0 ;
    while (j <= sequence.length-2) {
        if (sequence[j].toString()+sequence[j+1].toString()+sequence[j+2].toString() in dictionnaire) {
            dictionnaire[sequence[j].toString()+sequence[j+1].toString()+sequence[j+2].toString()] = dictionnaire[sequence[j].toString()+sequence[j+1].toString()+sequence[j+2].toString()]+1;
        }else {
            dictionnaire[sequence[j].toString()+sequence[j+1].toString()+sequence[j+2].toString()] = 1;
        }
        j += 3;
    }
    return(dictionnaire);
}

function hybridation_amorce(sequenceAmorce, sequenceADN, pourcentageRessemblance) {
        /*(str, str, double) -> None
        Cette fonction prend en entrée la séquence d'une amorce, une séquence d'ADN
        et un pourcentage de ressemblance (par défaut 80%) et affiche l'ensemble des
        emplacements dans la séquence d'ADN qui possède au moins le pourcentage de
        ressemblance avec l'amorce.
        */

        let longueurAmorce = sequenceAmorce.length
        let longueurADN = sequenceADN.length

        sequenceAmorce = rc(sequenceAmorce.toUpperCase());
        sequenceADN = sequenceADN.toUpperCase();

        let resultat = "";

        let i = 0 ;
        let ressemblance = 0 ;
        let test = 0 ;
        let trouve = 0 ;

        while (i <= longueurADN-longueurAmorce) {
            j = 0
            while (j < sequenceAmorce.length) {
                if(sequenceADN[j+i] == sequenceAmorce[j]){
                    ressemblance = ressemblance + 1
                }
                j = j + 1
            }
            if(ressemblance/longueurAmorce >= pourcentageRessemblance/100){
                trouve = trouve + 1
                resultat = resultat + ("Solution             # " + trouve.toString() + "<br>")
                resultat = resultat + ("Sequence de l'amorce : " + sequenceAmorce + "<br>")
                resultat = resultat + ("Sequence d'ADN       : " + rc(sequenceADN.substring(i,i+j)) + "<br>")
                resultat = resultat + ("Ressemblance         : " + ressemblance*100/longueurAmorce.toString() + "%" + "<br>")
                resultat = resultat + ("Position (matrice)   : " + (i+1).toString() + "<br>")
                resultat = resultat + ("<br>")
                j = j + 1
            }
            test = test + 1
            ressemblance = 0
            i = i + 1
        }

        resultat = resultat + ("Tests effectués : " + test.toString() + "<br>")
        resultat = resultat + ("Solutions trouvées : " + trouve.toString())

        if(trouve == 0){
            afficheErreurs(resultat, "HAerreurs");
            return "";
        }

        return resultat;
}