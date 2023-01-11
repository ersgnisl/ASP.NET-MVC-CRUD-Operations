var silinecekPersonelEgitimId = [];
var varolanEgitimIdLer = [];


$(document).ready(function () {
    CinsiyetGetir();
    UlkeGetir();
    SehirGetir();
    GetData();


});

var id;
var query = (window.location).href;
id = query.substring(query.lastIndexOf('=') + 1);
var veriler = null;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/, ' '));
}

function GetData() {
    var id = getParameterByName("id");

    $.ajax({
        type: "Get",
        url: "/Home/GetData/" + id,
        dataType: "json",
        data: { id: id },
        async: false,
        success: function (result) {
            console.log(result);

            $("#isim").val(result.isim);
            $("#soyisim").val(result.soyisim);
            $("#kayıtTarihi").val(result.kayıtTarihi);
            $('#drdCinsiyet option:contains("' + result.idCinsiyet + '")').attr('selected', 'selected');
            $("#adres").val(result.adres);
            $('#drdCografya option:contains("' + result.idCografya + '")').attr('selected', 'selected');
            SehirGetir($('#drdSehir option:contains("' + result.idSehir + '")').val());
            $('#drdSehir option:contains("' + result.idSehir + '")').attr('selected', 'selected');
            $("#a_imgFile").attr("src", result.idMedya);





            for (var x = 0; x < result.tableKayitEgitimler.length; x++) {
                var y = result.tableKayitEgitimler[x].idEgitim;
                $('#okulTekrarliRow').append(`<div class="row" id='eklenenOkul${x}'">
                        <div class="col-md-3">
                        <label class="control-label">Okul Tipi</label>
                        <select id="OkulTipi${x}" class="form-select okul" selected="">
                        </select>
                        </div>
                        <div class="col-md-4">
                            <label class="control-label">Okul Adı</label>
                            <input class="form-control" name="OkulAdi" id="OkulAdi" placeholder="Seçiniz" value="${result.tableKayitEgitimler[x].okulAdi}">
                        </div>
                        <div class="col-md-4">
                            <label class="control-label">Mezuniyet Tarihi</label>
                            <input type="date"  class="form-control" name="MezuniyetTarihi"  id="MezuniyetTarihi" value="${result.tableKayitEgitimler[x].mezuniyetTarihi}">
                        </div>
                        <div class="col-md-1">
                            <label class="control-label"></label>
                            <button type="button" onclick="OkulEkle()" style="height:35px;width:35px">+</button>
                            <button type="button" onclick="OkulSil(${x})" style="height:35px;width:35px">-</button>
                        </div> 
                    </div>`
                )

                var nereyeBassilacak = `OkulTipi${x}`
                Okul(nereyeBassilacak);
                $('#OkulTipi' + x + ' option[value="' + result.tableKayitEgitimler[x].okulId + '"]').prop('selected', true);
                varolanEgitimIdLer.push(y);

            }


        }
    })
}



function Okul(x) {
    $.ajax({
        type: "Get",
        url: "/Home/OkulGetir",
        dataType: "json",
        async: false,
        success: function (result) {
            console.log(result);
            var myData = result;
            var myDesign = "<option value diasabled selected>Seçiniz.</option>";
            for (var i = 0; i < myData.length; i++) {
                myDesign += "<option value='" + myData[i].okulId + "'>" + myData[i].okulTipi + "</option>";
            }

            var nereyeBasilacak = "#" + x;
            $(nereyeBasilacak).html(myDesign);
        }
    })
}


function OkulSil(x) {

    var silinecek = '#eklenenOkul' + x;
    silinecekPersonelEgitimId.push(x);
    $(silinecek).remove();


};

var i = 0;
console.log(i);

function OkulEkle() {
    i = $('#okulTekrarliRow').find('[id^="eklenenOkul"]')['length'];
    i++;
    console.log(i)
    $('#okulTekrarliRow').append(`<div class="row" id='eklenenOkul${i}'">
                        <div class="col-md-3">
                        <label class="control-label">Okul Tipi</label>
                        <select id="OkulTipi${i}" class="form-select okultipi">
                        <option value="0">Seçiniz</option>
                        </select> 
                        </div>
                        <div class="col-md-4">
                        <label class="control-label">Okul Adı</label> 
                        <input type="text" class="form-control" name="OkulAdi" id="OkulAdi${i}">
                        </div>
                        <div class="col-md-4">
                        <label class="control-label">Mezuniyet Tarihi</label> 
                        <input type="date" class="form-control" name="MezuniyetTarihi" id="MezuniyetTarihi${i}">
                        </div>
                        <div class="col-md-1">
                        <label class="control-label"> </label>
                        <button type="button" onclick="OkulEkle()" style="height:35px;width:35px">+</button>
                        <button type="button" onclick="OkulSil(${i})" style="height:35px;width:35px">-</button>
                        </div></div>`)

    var nereyeBassilacak = `OkulTipi${i}`
    Okul(nereyeBassilacak);

};






function MedyaOlustur(id) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("a_" + id);
        preview.src = src;
        preview.style.display = "block";
    }
    console.log(id);
    var fdata = new FormData();
    var fileInput = $('#' + id)[0];
    var file = fileInput.files[0];
    fdata.append("iFormFile", file);


    $.ajax({
        type: "POST",
        url: "/Home/MedyaOlustur/",
        data: fdata,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result != 0) {
                $("#" + id).attr("mediaid", result);
                $("#medyaid").val(result);
            }
        }
    });
}


function KayıtGuncelle() {
    var TableKayitEgitimler = [];
    var isim = $("#isim").val();
    var soyisim = $("#soyisim").val();
    var kayıtTarihi = $("#kayıtTarihi").val();
    var adres = $("#adres").val();
    var idCinsiyet = $("#drdCinsiyet").val();
    var idCografya = $("#drdCografya option:selected").val();
    var idSehir = $("#drdSehir option:selected").val();
    var idMedya = $("#imgFile").attr("mediaId");

    var myRows = $('#okulTekrarliRow').find('[id^="eklenenOkul"]');
    $.each(myRows, function (x, y) {
        var TableKayitEgitimIlk = {};

        TableKayitEgitimIlk["OkulId"] = $(y).find('[id^="OkulTipi"]').val();
        TableKayitEgitimIlk["okulAdi"] = $(y).find('[id^="OkulAdi"]').val();
        TableKayitEgitimIlk["MezuniyetTarihi"] = $(y).find('[id^="MezuniyetTarihi"]').val();
        TableKayitEgitimler.push(TableKayitEgitimIlk);
        console.log[TableKayitEgitimler];

    })

    var update = {

        id: id,
        isim: isim,
        soyisim: soyisim,
        kayıtTarihi: kayıtTarihi,
        adres: adres,
        idCinsiyet: idCinsiyet,
        idCografya: idCografya,
        idSehir: idSehir,
        idMedya: idMedya,
        TableKayitEgitimler: TableKayitEgitimler,


    }
    $.ajax({
        type: "POST",
        url: "/Home/KayıtGuncelle/",
        dataType: "json",
        data: { update: update },
        async: false,
        success: function () {

        }

    });
    window.location.href = "/../Home/Listeleme";


}



function SehirGetir() {

    $.ajax({

        type: "Get",
        url: "/Home/InsertSehir/" + $("#drdCografya").val(),
        dataType: "json",

        async: false,
        success: function (data2) {

            var myData = data2;
            var myDesign = "";
            sehir = data2;

            for (var j = 0; j < myData.length; j++) {

                myDesign += "<option value='" + myData[j].idCografya + "'>" + myData[j].idYer + "</option>";
            }
            $("#drdSehir").html(myDesign);

        }
    });

}




function UlkeGetir() {

    $.ajax({

        type: "Get",
        url: "/Home/InsertCografya",
        dataType: "json",

        async: false,
        success: function (data1) {

            var myData = data1;
            var myDesign = "";

            for (var k = 0; k < myData.length; k++) {

                myDesign += "<option value='" + myData[k].idCografya + "'>" + myData[k].idYer + "</option>";
            }
            $("#drdCografya").append(myDesign);
        }
    });

}





function CinsiyetGetir() {

    $.ajax({

        type: "Get",
        url: "/Home/InsertCinsiyet",
        dataType: "json",

        async: false,
        success: function (data) {

            var myData = data;
            var myDesign = "";
            for (var i = 0; i < myData.length; i++) {

                myDesign += "<option value='" + myData[i].idCinsiyet + "'>" + myData[i].cinsiyet + "</option>";
            }
            $("#drdCinsiyet").html(myDesign);
        }
    });

}
