
function autocomplete(inp, arr) {

    var currentFocus;

    inp.addEventListener("input", function (e) {
        var j, a, b, i, val = this.value;
        var aux = [];
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);
        var counter1 = 0;

        for (i = 0; i < arr.length; i++) {
            if (arr[i].toUpperCase().includes(val.toUpperCase())) {
                aux[i] = arr[i].toUpperCase().indexOf(val.toUpperCase());
            }
            else {
                aux[i] = -1;
            }
        }
        for (j = 0; j < 20; j++) {
            for (i = 0; i < arr.length; i++) {
                if (aux[i] == j && counter1 < 8) {
                    counter1++;
                    b = document.createElement("DIV");
                    var re = new RegExp(val, "g");
                    var nomeproduto = arr[i].toLowerCase().replace(re, "<strong>" + val + "</strong>");

                    b.innerHTML = nomeproduto;

                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                    b.addEventListener("click", function (e) {

                        inp.value = this.getElementsByTagName("input")[0].value;
                        var prodt = inputHeader.value;
                        var linkper = prodt.split('- ').join('');
                        var linkperfinal = linkper.split(' ').join('-');
                        closeAllLists();
                        window.location.href = "https://leveloja.com.br/?s=" + inputHeader.value + "&post_type=product";
                    });
                    a.appendChild(b);
                }
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

            currentFocus++;

            addActive(x);
        } else if (e.keyCode == 38) { //up

            currentFocus--;

            addActive(x);
        } else if (e.keyCode == 13) {

            e.preventDefault();
            if (currentFocus > -1) {

                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {

        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {

        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
