using System.ComponentModel.DataAnnotations;
namespace Deneme1.Models
{
    public class TableCografya
    {
        [Key]
        public int idCografya { get; set; }
        public string idYer { get; set; }
        public int ustId { get; set; }

    }
}

