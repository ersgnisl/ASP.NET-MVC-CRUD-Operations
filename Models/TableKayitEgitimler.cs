using System.ComponentModel.DataAnnotations;

namespace Deneme1.Models
{
    public class TableKayitEgitimler
    {

        [Key]
        public int idEgitim { get; set; }
        public int id { get; set; }
        public int OkulId { get; set; }
        public string okulAdi { get; set; }
        public string MezuniyetTarihi { get; set; }

    }
}
