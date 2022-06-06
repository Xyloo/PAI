document.addEventListener("DOMContentLoaded", function () {
    const arr = [document.getElementById("herbaty"), document.getElementById("boba"), document.getElementById("propozycja"), document.getElementById("propozycjamain"), document.getElementById("lista"), document.getElementById("galeriamenu"), document.getElementById("galeria")];
    const arr2 = ["pages/herbaty.html", "pages/boba.html", "pages/formularz.html", "pages/formularz.html", "pages/lista.html", "pages/galeria.html", "pages/galeria.html"]
    const arr3 = [function () {
    }, function () {
    }, function () {
        setTimeout(() => {
            ilosc(2);
        }, 200);
    }, function () {
        setTimeout(() => {
            ilosc(2);
        }, 200);
    }, function () {
        setTimeout(() => {
            pokaz();
        }, 200);
    }, function () {
        setTimeout(() => {
            galeriawypelnij();
        }, 200);
    }, function () {
        setTimeout(() => {
            galeriawypelnij();
        }, 200);
    }]
    for (let i = 0; i < arr.length; i++)
    {
        arr[i].addEventListener('click', function () {
                fetch(arr2[i])
                    .then(response => {
                        return response.text();
                    })
                    .then(dane => {
                        document.getElementById("mainPage").innerHTML = dane;
                    })
                arr3[i]()
            },
            false);
    }
})

function sprawdzPole(pole_id, obiektRegex)
{
    return obiektRegex.test(document.getElementById(pole_id).value);

}

function sprawdzRadio(nazwa_radio)
{
    let obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        let wybrany = obiekt[i].checked;
        if (wybrany) return true;
    }
    return false;
}

function sprawdzBox(box_id)
{
    return document.getElementById(box_id).checked;

}

function radioZaznaczInvalid(nazwa_radio)
{
    let obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        obiekt[i].classList.add("is-invalid");
    }
}

function radioZaznaczValid(nazwa_radio)
{
    let obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        obiekt[i].classList.remove("is-invalid");
        obiekt[i].classList.add("is-valid");
    }
}

function sprawdzCzyPowtorkaNazwa(pole_id)
{
    const obiektPole = document.getElementById(pole_id);
    let czyZnalazlo = false;
    const lista = JSON.parse(localStorage.getItem('lista'));
    if (lista != null)
    {
        for (let i = 0; i < lista.length; i++)
        {
            if (lista[i].nazwa === obiektPole.value)
            {
                czyZnalazlo = true;
                return false;
            }
        }
        if (czyZnalazlo === false)
        {
            return true;
        }
    }
    return true;
}

function ustawValid(id)
{
    document.getElementById(id).classList.remove("is-invalid");
    document.getElementById(id).classList.add("is-valid");
}

function ustawInvalid(id)
{
    document.getElementById(id).classList.add("is-invalid");
}

function sprawdzenie(edycja = false)
{
    let ok = true;
    let regexNazwa = /^\S{1,100}$/u;
    let regexEmail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    let regexLista = /^.+/;

    const arr = ["nazwa", "mail", "herbata", "syrop", "kulki", "cukier", "lod"]
    const arr2 = [regexNazwa, regexEmail, regexLista, regexLista, regexLista]
    for (let i = 0; i < arr.length - 2; i++)
    {
        if (!sprawdzPole(arr[i], arr2[i]))
        {
            ok = false;
            ustawInvalid(arr[i]);
        } else
        {
            ustawValid(arr[i])
        }
    }

    if (!edycja)
    {
        if (!sprawdzCzyPowtorkaNazwa("nazwa"))
        {
            ok = false;
            ustawInvalid("nazwa");
            alert("Taka nazwa znajduje się już w bazie!");
        } else
        {
            ustawValid("nazwa")
        }
    }

    for (let i = arr.length - 2; i < arr.length; i++)
    {
        if (!sprawdzRadio(arr[i]))
        {
            ok = false;
            radioZaznaczInvalid(arr[i]);
            document.getElementById(arr[i] + "-blad").classList.add("d-block");
        } else
        {
            radioZaznaczValid(arr[i]);
            document.getElementById(arr[i] + "-blad").classList.remove("d-block");
        }
    }

    ustawValid("uwagi")

    if (!sprawdzBox("zgoda"))
    {
        ok = false;
        ustawInvalid("zgoda")
        document.getElementById("potwierdzenie-blad").classList.add("d-block");
    } else
    {
        ustawValid("zgoda")
        document.getElementById("potwierdzenie-blad").classList.remove("d-block");
    }

    return ok !== false;
}

function wartoscRadio(nazwa_radio)
{
    const obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        if (obiekt[i].checked)
        {
            return obiekt[i].value;
        }
    }
}

function resetRadio(nazwa_radio)
{
    const obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        if (obiekt[i].checked)
        {
            obiekt[i].checked = false;
        }
    }
}

function usuniecie()
{
    document.getElementById("nazwa").value = "";
    document.getElementById("herbata").value = "";
    document.getElementById("kulki").value = "";
    document.getElementById("syrop").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("uwagi").value = "";
    resetRadio("cukier");
    resetRadio("lod");
    document.getElementById("zgoda").checked = false;
}

function przeslij(edycja = false, i)
{
    let x = false;
    if (edycja) x = true;
    if (sprawdzenie(x))
    {
        let kompozycja = {};
        kompozycja.nazwa = document.getElementById("nazwa").value;
        kompozycja.herbata = document.getElementById("herbata").value;
        kompozycja.syrop = document.getElementById("syrop").value;
        kompozycja.kulki = document.getElementById("kulki").value;
        kompozycja.cukier = wartoscRadio("cukier");
        kompozycja.lod = wartoscRadio("lod");
        kompozycja.uwagi = document.getElementById("uwagi").value;
        kompozycja.email = document.getElementById("mail").value;

        let lista = JSON.parse(localStorage.getItem('lista'));
        if (lista === null) lista = [];
        if (edycja)
        {
            lista[i] = kompozycja;
            localStorage.setItem('lista', JSON.stringify(lista));
            document.getElementById("FormularzEdycji").innerHTML = "";
            pokaz();
            alert("Kompozycja została zedytowana!")
        } else
        {
            lista.push(kompozycja);
            localStorage.setItem('lista', JSON.stringify(lista));
            alert("Kompozycja została przesłana!");
            ilosc();
            usuniecie();
        }
    }
}

function pokaz()
{
    const lista = JSON.parse(localStorage.getItem('lista'));
    const tabela = document.getElementById('listaKompozycji');
    if (lista === null) tabela.innerHTML = "<h6 class='font-weight-light'>Brak propozycji kompozycji w bazie</h6>";
    else
    {
        let str = "<table class='table'><thead><tr><th scope='col'>#</th><th scope='col'>Nazwa</th><th scope='col'>Herbata</th><th scope='col'>Syrop</th><th scope='col'>Kulki</th><th scope='col'>Cukier</th><th scope='col'>Lód</th><th scope='col'>Email</th></tr></thead>";
        str += "<tbody>";
        for (let i = 0; i < lista.length; i++)
        {
            str += "<tr><th scope='row'>" + i + "</th><td>" + lista[i].nazwa + "</td><td>" + lista[i].herbata + "</td><td>" + lista[i].syrop + "</td><td>" + lista[i].kulki + "</td><td>" + lista[i].cukier + "</td><td>" + lista[i].lod + "</td><td>" + lista[i].email + "</td></tr>";
            if (lista[i].uwagi.length !== 0)
            {
                str += "<tr><td colspan='8'>Uwagi: " + lista[i].uwagi + "</td></tr>";
            }
            str += "<tr><td colspan='3'><button class='btn btn-secondary' style='width:100%;' onclick='usunKompozycje(" + i + ")'>Usuń kompozycję</button></td><td colspan='4'><button class='btn btn-secondary' onclick='edytujKompozycjeStart(" + i + ")' style='width:100%;'>Edytuj kompozycję</td></tr>";
        }
        str += "</tbody></table>";
        tabela.innerHTML = str;
        document.getElementById("usuniecie").innerHTML = "<button class='btn btn-primary' onclick='usunWszystkieKompozycje()'>Usunięcie wszystkich kompozycji</button>";
    }

}

function usunKompozycje(i)
{
    const lista = JSON.parse(localStorage.getItem('lista'));
    if (confirm("Usunąć kompozycję o id: " + i + "?"))
    {
        lista.splice(i, 1);
    }
    localStorage.setItem('lista', JSON.stringify(lista));
    pokaz();
}

function usunWszystkieKompozycje()
{
    if (confirm("Czy na pewno chcesz usunąć całą listę kompozycji?"))
    {
        localStorage.removeItem('lista');
    }
    pokaz();
}

function wartoscRadioZaznacz(nazwa_radio, elementListy)
{
    const obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i < obiekt.length; i++)
    {
        if (obiekt[i].value === elementListy)
        {
            obiekt[i].checked = true;
        }
    }
}

function edytujKompozycjeStart(i)
{
    fetch("pages/formularzDoEdycji.html")
        .then(response => {
            return response.text();
        })
        .then(dane => {
            document.getElementById("FormularzEdycji").innerHTML = dane + "<br><div class='my-3'><input type='button' class='btn btn-primary col-lg-6' value='Edytuj' onclick='przeslij(true," + i + ")'><input type='button' class='btn btn-secondary col-lg-6' value='Reset' onclick='usuniecie()''></div></div>";
        })
    setTimeout(() => {
        document.getElementById("ktora").innerHTML = "<h5 class='font-weight-light'>Kompozycja id: " + i + "</h5>";
    }, 100);

    setTimeout(() => {
        wypelnij(i);
    }, 200);
}

function wypelnij(i)
{
    const lista = JSON.parse(localStorage.getItem('lista'));

    document.getElementById("nazwa").value = lista[i].nazwa;
    document.getElementById("herbata").value = lista[i].herbata;
    document.getElementById("syrop").value = lista[i].syrop;
    document.getElementById("kulki").value = lista[i].kulki;
    wartoscRadioZaznacz("cukier", lista[i].cukier);
    wartoscRadioZaznacz("lod", lista[i].lod);
    document.getElementById("uwagi").value = lista[i].uwagi;
    document.getElementById("mail").value = lista[i].email;
}

function wyszukiwanie()
{
    const lista = JSON.parse(localStorage.getItem('lista'));
    let alercik = document.getElementById("odpowiedz");
    let czy_znaleziono = false;
    for (let i = 0; i < lista.length; i++)
    {
        if (lista[i].nazwa.toLowerCase() === document.getElementById("wyszukiwarka").value.toLowerCase())
        {
            alercik.classList.remove("alert-danger");
            alercik.classList.add("alert-success");
            alercik.innerHTML = "Dana kompozycja znajduje się na pozycji: " + i;
            czy_znaleziono = true;
        }
    }
    if (czy_znaleziono === false)
    {
        alercik.classList.remove("alert-success");
        alercik.classList.add("alert-danger");
        alercik.innerHTML = "Danej kompozycji nie ma w bazie";
    }
}

function ilosc(i)
{
    let dane;
    const lista = JSON.parse(localStorage.getItem('lista'));
    if (lista != null)
    {
        if (i === 1)
        {
            dane = "<h5>Ilość kompozycji w bazie: " + lista.length + "</h5>";
        } else
        {
            dane = "<h2>Ilość kompozycji w bazie: " + lista.length + "</h2>"
        }
        document.getElementById("ilosc").innerHTML = dane;
    } else
    {
        if (i === 1)
        {
            dane = "<h5>Ilość kompozycji w bazie: " + 0 + "</h5>";
        } else
        {
            dane = "<h2>Ilość kompozycji w bazie: " + 0 + "</h2>"
        }
        document.getElementById("ilosc").innerHTML = dane;
    }
}

function galeriawypelnij()
{

    let galeria = "<h1 class='font-weight-light'>Galeria bubbletea.io</h1>";
    for (let i = 1; i <= 12; i++)
    {
        galeria += "<a href='assets/gallery/picture" + [i] + ".jpg' data-lightbox='gallery' data-title='Obraz " + [i] + "'><img class='p-2 col-lg-3 col-md-4 col-sm-12 col-12 img-thumbnail shadow' src='assets/gallery/thumbnails/picture" + [i] + "_t.JPG' alt='obraz" + [i] + "'/></a>";
    }
    document.getElementById("galeriawyp").innerHTML = galeria;
}