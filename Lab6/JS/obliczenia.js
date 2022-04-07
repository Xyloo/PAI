function oblicz()
{
    var kwota = parseFloat(document.getElementById("kwota").value);
    var iloscRat = parseFloat(document.getElementById("ilosc").value);
    var procent = parseFloat(document.getElementById("procent").value) / 100;
    var procent_miesiac = procent / 12;
    var rata = (kwota * procent_miesiac) / (1 - (1 / Math.pow(1 + procent_miesiac, iloscRat)));
    if (isNaN(rata) || !isFinite(rata) || rata <= 0)
    {
        document.getElementById("rata").value = "Niepoprawne dane";
        document.getElementById("total").value = "Niepoprawne dane";
    } else
    {
        document.getElementById("rata").value = rata.toFixed(2);
        document.getElementById("total").value = (rata * iloscRat).toFixed(2);
    }
}

function kalkulator()
{
    var x = parseFloat(document.getElementById("firstNumber").value);
    var y = parseFloat(document.getElementById("secondNumber").value);
    var operators = document.getElementsByName("operator");
    var op;
    for (let i = 0; i < operators.length; i++)
    {
        if (operators[i].checked)
        {
            op = i;
        }
    }
    var result;
    switch (op)
    {
        case 0:
            result = x + y;
            break;
        case 1:
            result = x - y;
            break;
        case 2:
            result = x * y;
            break;
        case 3:
            result = x / y;
            break;
    }
    if (isNaN(result) || !isFinite(result))
    {
        document.getElementById("result").value = "Niepoprawne dane";
    } else
    {
        document.getElementById("result").value = result;
    }
}