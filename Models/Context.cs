using Microsoft.EntityFrameworkCore;

namespace Deneme1.Models
{
    public class Context: DbContext
    {
        public DbSet<TableKayit> TableKayit { get; set; }
        public DbSet<TableCinsiyet> TableCinsiyet { get; set; }
        public DbSet<TableCografya> TableCografya { get; set; }
        public DbSet<TableMedya> TableMedya { get; set; }
        public DbSet<ParamOkulTipleri> ParamOkulTipleri { get; set; }
        public DbSet<TableKayitEgitimler> TableKayitEgitimler { get; set; }



        public Context(DbContextOptions<Context> options) : base(options) 
        { 
        } 

    }
}
