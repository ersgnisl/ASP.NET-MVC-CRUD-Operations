using System.ComponentModel.DataAnnotations;

namespace Deneme1.Models
{
    public class TableMedya
    {
        [Key]
        public int idMedya { get; set; }
        public string urlMedya { get; set; }
        public string adMedya { get; set; } 
    }
}
