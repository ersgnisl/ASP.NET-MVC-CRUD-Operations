using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deneme1.Models

{
    public class TableKayit
    {
        [Key]
        public int id { get; set; }   
        public string isim { get; set; }
        public string soyisim { get; set; }
        public string kayıtTarihi { get; set; }
        public string adres { get; set; }
        public string idCinsiyet { get; set; }
        public string idCografya { get; set; }
        public string idSehir { get; set; }
        public string idMedya { get; set; }
        [NotMapped]

        public List<TableKayitEgitimler> TableKayitEgitimler { get; set; }


    }
}
