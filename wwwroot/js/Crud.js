
$(document).ready(function () {
    CinsiyetGetir();
    UlkeGetir();
    Okul("OkulTipi0");


});

function fnInsert() {
    var TableKayitEgitimler = [];
    var isim = $("#isim").val();
    var soyisim = $("#soyisim").val();
    var kayıtTarihi = $("#kayıtTarihi").val();
    var adres = $("#adres").val();
    var drdCinsiyet = $("#drdCinsiyet").val();
    var drdCografya = $("#drdCografya").val();
    var drdSehir = $("#drdSehir").val();
    var idMedya = $("#imgFile").attr("mediaId");

    var TableKayitEgitimlerIlk = {};
    TableKayitEgitimlerIlk["OkulId"] = $("#OkulTipi0").val();;
    TableKayitEgitimlerIlk["okulAdi"] = $("#OkulAdi0").val();;
    TableKayitEgitimlerIlk["MezuniyetTarihi"] = $("#MezuniyetTarihi0").val();
    
    TableKayitEgitimler.push(TableKayitEgitimlerIlk);


    for (var x = 1; x <= i; x++) {
        var a = "#" + "OkulTipi" + x + " option:selected";
        var okulTipId = $(`${a}`).val();
        var b = "#" + "OkulAdi" + x;
        var okulAdi = $(b).val();
        var MezuniyetTarihi = $(`#MezuniyetTarihi${x}`).val();
        var tableKayitEgitimler = {};
        tableKayitEgitimler["OkulId"] = okulTipId;
        tableKayitEgitimler["okulAdi"] = okulAdi;
        tableKayitEgitimler["MezuniyetTarihi"] = MezuniyetTarihi;

        TableKayitEgitimler.push(tableKayitEgitimler);


    }

    console.log(TableKayitEgitimler);


    var worker = ({

        isim: isim,
        soyisim: soyisim,
        kayıtTarihi: kayıtTarihi,
        adres: adres,
        idCinsiyet: drdCinsiyet,
        idCografya: drdCografya,
        idSehir: drdSehir,
        idMedya: idMedya,
        TableKayitEgitimler: TableKayitEgitimler

    })

    $.ajax({

        type: "POST",
        url: "/Home/InsertCustomer",
        dataType: "json",
        data: { worker: worker },
        success: function () {
            alert("Kayıt Başarılı");
            location.reload();
        },
        error: function () {
            alert("Lütfen eksik bilgileri giriniz.");
        }
    });
     
};


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
            $(nereyeBasilacak).html(myDesign);        }
    })
}

var i = 0;
function OkulEkle() {
    i++;

    $('#okulTekrarliRow').append(`<div class="row mt-4" id='eklenenOkul${i}'">
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
                        <button type="button" onclick="OkulSil(eklenenOkul${i})" style="height:35px;width:35px">-</button>
                        </div></div>`)

    var nereyeBassilacak = `OkulTipi${i}`
    Okul(nereyeBassilacak);

};


function OkulSil(x) {

    $(x).remove();
    i--;

};
function CinsiyetGetir() {

    $.ajax({

        type: "Get",
        url: "/Home/InsertCinsiyet",
        dataType: "json",

        async: false,
        success: function (data) {

            var myData = data;
            var myDesign = "<option value disabled selected > Seçiniz.</option>";
            cinsiyet = data;
            for (var i = 0; i < myData.length; i++) {

                myDesign += "<option value='" + myData[i].idCinsiyet + "'>" + myData[i].cinsiyet + "</option>";
            }
            $("#drdCinsiyet").html(myDesign);
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
            var myDesign = "<option value disabled selected > Seçiniz.</option>";
            ulke = data1
            for (var k = 0; k < myData.length; k++) {

                myDesign += "<option value='" + myData[k].idCografya + "'>" + myData[k].idYer + "</option>";
            }
            $("#drdCografya").append(myDesign);
        }
    });

}

function SehirGetir() {

    $.ajax({

        type: "Get",
        url: "/Home/InsertSehir/" + $("#drdCografya").val(),
        dataType: "json",

        async: false,
        success: function (data2) {

            var myData = data2;
            var myDesign = "<option value disabled selected > Seçiniz.</option>";
            sehir = data2;

            for (var j = 0; j < myData.length; j++) {

                myDesign += "<option value='" + myData[j].idCografya + "'>" + myData[j].idYer + "</option>";
            }
            $("#drdSehir").html(myDesign);

        }
    });

}
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
            console.log(result);
            if (result != 0) {
                $("#" + id).attr("mediaid", result);
                $("#mediaId").val(result);
            }
        }
    });
}