function pokaz(id) {
    var tresc = "";
    switch (id) {
        case 2:
            tresc += pokazGalerie();
            break;
        case 3:
            tresc += pokazPost();
            break;
        case 4:
            tresc += pokazKontakt();
            break;
        default:
            tresc += pokazO();
    }
    document.getElementById('blok').innerHTML = tresc;
}

function pokazO()
{
    var tresc = '<h2><br />Pierwsze kroki</h2> ';
    tresc += '<p> W aplikacjach typu SPA (ang. Single Page Application) po przesłaniu pierwszego żądania również dochodzi do odesłania początkowego dokumentu HTML do przeglądarki, jednak po zakończeniu inicjalizacji wszelkie działania użytkownika prowadzą tylko do wysłania żądań asynchronicznie (w tle za pomocą AJAX). Odpowiedziami na te żądania zwykle są tylko fragmenty kodu HTML (zamiast całych dokumentów), a niekiedy wyłącznie dane, które następnie są wstawiane/zamieniane w ramach istniejących elementów dokumentu HTML. Nigdy nie dochodzi do zamiany całego dokumentu HTML. </p>' +
        '<p class="srodek"><img src="../Lab5/images/baner.jpg" alt="Zdjęcie" /></p>' +
        '<article><h2>Wady SPA</h2><p>' +
        ' Czas wytworzenia oraz nakład pracy włożony w stworzenie aplikacji jest o wiele większy, co wiąże za sobą dodatkowe koszta, dlatego tworzenie małych stron jest nieopłacalne - efekt dla strony z jedną zakładką jest niezauważalny. Pozycjonowanie stron wymaga większego nakładu pracy. Obecnie roboty indeksujące Google nie radzą sobie ze stronami tego typu, co wiąże się z koniecznością tworzenia rozwiązań przystosowanych dla robotów. </p></article>';
    return tresc;
}

function pokazGalerie()
{
    var tresc='<h2><br />Moja galeria</h2>';
    tresc+=' <div class="galeria">';
    for(i=1;i<10;i++)
    {
        tresc+='<div class="slajd"><a href="../Lab3/zdjecia/obraz'+i+'.JPG" target="_blank"> <img src="../Lab3/miniaturki/obraz'+i+'.JPG" alt="Zdjęcie '+i+'"></a></div>';
    }
    return tresc+'</div>';
}

function pokazKontakt()
{
    var tresc='<h2><br />Kontakt</h2>';
    tresc+='<p class="srodek">Email: <a href="mailto:s95408@pollub.edu.pl">s95408@pollub.edu.pl</a><br>Telefon: <a href="tel:0048500500500">+48 500 500 500</a></p>'
    return tresc;
}

function pokazPost()
{
    tresc='<h2><br />Dodaj post</h2>';
    tresc+='<article class="srodek" ><form action="mailto:s95408@pollub.edu.pl" method="post" onsubmit="return pokazDane();"> <label for="email">Twój email</label><br><input type="email" name="email" id="email" placeholder="jan@kowalski.pl" required><br> <label for="name">Twoje imię i nazwisko</label><br><input type="text" pattern="^[^\d]*$" placeholder="Jan Kowalski" name="name" id="name" required><br> <label for="tel">Numer telefonu</label><br><input type="number" name="tel" placeholder="123456789" id="tel" required><br><br> <span>Zainteresowania</span><br> <input type="checkbox" name="zainteresowania" id="sport" value="Sport"> <label for="sport">Sport</label> <input type="checkbox" name="zainteresowania" id="muzyka" value="Muzyka"><label for="muzyka">Muzyka</label> <input type="checkbox" name="zainteresowania" id="film" value="Film"> <label for="film">Film</label> <input type="checkbox" name="zainteresowania" id="inne" value="Inne"> <label for="inne">Inne</label><br><br> <span>Wiek</span><br> <input type="radio" name="wiek" id="wiek10" value="Mniej niż 10"><label for="wiek10">Mniej niż 10</label> <input type="radio" name="wiek" id="wiek1020" value="10-20"><label for="wiek1020">10-20</label> <input type="radio" name="wiek" id="wiek2130" value="21-30"><label for="wiek2130">21-30</label> <input type="radio" name="wiek" id="wiek3140" value="31-40"><label for="wiek3140">31-40</label> <input type="radio" name="wiek" id="wiek4150" value="41-50"><label for="wiek4150">41-50</label> <input type="radio" name="wiek" id="wiek50" value="Więcej niż 50"><label for="wiek50">Więcej niż 50</label><br><br> <label for="wiadomosc">Wiadomość</label><br> <textarea rows="3" cols="20" id="wiadomosc" name="wiadomosc" required></textarea><br> <input type="submit" name="wyslij" value="Wyślij" /> </form>';
    return tresc;
}

function pokazDane()
{
    var checkboxy_res="";
    var checkboxy = ["sport", "muzyka", "film", "inne"];
    for (var j = 0; j<checkboxy.length; j++)
    {
        if (document.getElementById(checkboxy[j]).checked === true) {
            checkboxy_res += document.getElementById(checkboxy[j]).value+" ";
        }
    }

    var radios = document.getElementsByTagName('input');
    var zazn_radio;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            zazn_radio = radios[i].value;
        }
    }
    var dane="Następujące dane zostaną wysłane:\n";
    dane+="Email: "+document.getElementById('email').value+"\n"+"Imię i nazwisko: "+document.getElementById('name').value+"\n"+"Telefon: "+document.getElementById('tel').value+"\n"+"Zainteresowania: "+checkboxy_res+"\n"+"Wiek: "+zazn_radio+"\n"+"Wiadomość: "+document.getElementById('wiadomosc').value;
    return window.confirm(dane);
}
