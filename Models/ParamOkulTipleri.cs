
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Deneme1.Models
{
    public class ParamOkulTipleri
    {
        [Key]
        public int OkulId { get; set; }
        public string OkulTipi { get; set; }    
    }
}
