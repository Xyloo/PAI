function sprawdzPole(pole_id, obiektRegex) {
//Funkcja sprawdza czy wartość wprowadzona do pola tekstowego
//pasuje do wzorca zdefiniowanego za pomocą wyrażenia regularnego
//Parametry funkcji:
//pole_id - id sprawdzanego pola tekstowego
//obiektRegex - wyrażenie regularne
//---------------------------------
    var obiektPole = document.getElementById(pole_id);
    if (!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

function sprawdzBoxLubRadio(box_group_name) {
    //sprawdzamy czy co najmniej jeden checkbox/radio jest zaznaczony
    var obiekt = document.getElementsByName(box_group_name);
    for (i = 0; i < obiekt.length; i++) {
        wybrany = obiekt[i].checked;
        if (wybrany) return true;
    }
    return false;
}

function getValue(id)
{
    return document.getElementById(id).value;
}

function getCheckboxOrRadio(name)
{
    let obiekt = document.getElementsByName(name);
    let result = ""
    for (var i = 0; i < obiekt.length; i++) {
        if (obiekt[i].checked)
        {
            result += obiekt[i].value + " ";
        }
    }
    return result;
}

function sprawdz() { //Funkcja realizujaca sprawdzanie całego fomularza
//wykorzystując funkcje pomocnicze
//--------------------------------
    var ok = true; //zmienna informująca o poprawnym wypełnieniu formularza
//Definicje odpowiednich wyrażeń regularnych dla sprawdzenia
//poprawności danych wprowadzonych do pól tekstowych
    obiektNazw = /^[a-zA-Z]{2,20}$/; //wyrażenie regularne dla nazwiska
    obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    obiektWiek = /^[1-9][0-9]{1,2}$/;
//Sprawdzanie kolejnych pól formularza.
//w przypadku błędu - pojawia się odpowiedni komunikat
    if (!sprawdzPole("surname", obiektNazw)) {
        ok = false;
        document.getElementById("nazwisko_error").innerHTML =
            "Wpisz poprawnie nazwisko!";
    } else document.getElementById("nazwisko_error").innerHTML = "";
    if (!sprawdzPole("age", obiektWiek)) {
        ok = false;
        document.getElementById("wiek_error").innerHTML =
            "Wpisz poprawnie wiek!";
    } else document.getElementById("wiek_error").innerHTML = "";
    if (!sprawdzPole("email", obiektemail)) {
        ok = false;
        document.getElementById("email_error").innerHTML =
            "Wpisz poprawnie email!";
    } else document.getElementById("email_error").innerHTML = "";
    if (!sprawdzBoxLubRadio("language")) {
        ok = false;
        document.getElementById("produkt_error").innerHTML =
            "Zaznacz co najmniej jeden checkbox!";
    } else document.getElementById("produkt_error").innerHTML = "";
    if (!sprawdzBoxLubRadio("payment")) {
        ok = false;
        document.getElementById("zaplata_error").innerHTML =
            "Wybierz metodę płatności";
    } else document.getElementById("zaplata_error").innerHTML = "";
    let alertString = "Wprowadzone dane: \n Nazwisko: " + getValue("surname") + "\n Wiek: " + getValue("age") + "\n Państwo: " + getValue("country") + "\n Email: "+getValue("email") + "\n Produkty: " + getCheckboxOrRadio("language") + "\n Sposób płatności: " + getCheckboxOrRadio("payment");
    alert(alertString);
    return ok;
}
