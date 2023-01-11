using Deneme1.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;


namespace Deneme1.Controllers
{
    public class HomeController : Controller
    {


        public readonly Context _context;
        private readonly IWebHostEnvironment _webHostEnvironment;



        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, Context context, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _context = context;
            _webHostEnvironment = webHostEnvironment;

        }

        public IActionResult Guncelle(int id)
        {

            return View();

        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();

        }
        public IActionResult Listeleme()
        {

            var data3 = _context.TableKayit.FromSqlRaw(@"Select k.id,k.isim,k.soyisim,k.kayıtTarihi,k.adres,c.cinsiyet as idCinsiyet, a.idYer as idCografya,b.idYer as idSehir, d.urlMedya as idMedya 
                                        FROM Kayit1.dbo.TableKayit k
										LEFT JOIN Kayit1.dbo.TableCografya a ON a.idCografya=k.idCografya 
										LEFT JOIN Kayit1.dbo.TableCografya b ON b.idCografya=k.idSehir
										LEFT JOIN Kayit1.dbo.TableCinsiyet c ON c.idCinsiyet=k.idCinsiyet
                                        LEFT JOIN Kayit1.dbo.TableMedya d ON d.idMedya = k.idMedya    ").ToList();


            // var data3 = _context.TableKayit.FromSqlRaw(@"Select * FROM [Kayit1].[dbo].[TableKayit]").ToList();

            return View(data3);

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public TableKayit InsertCustomer(TableKayit worker)
        {
            TableKayit form = new TableKayit()

            {
                isim = worker.isim,
                soyisim = worker.soyisim,
                kayıtTarihi = worker.kayıtTarihi,
                adres = worker.adres,
                idCinsiyet = worker.idCinsiyet,
                idCografya = worker.idCografya,
                idSehir = worker.idSehir,
                idMedya = worker.idMedya,

            };
            var result = _context.TableKayit.Add(form);
            _context.SaveChanges();

            for (int items = 0; items < worker.TableKayitEgitimler.Count; items++)
            {
                var ekleOkul = new TableKayitEgitimler()
                {
                    id = form.id,
                    OkulId = worker.TableKayitEgitimler[items].OkulId,
                    okulAdi = worker.TableKayitEgitimler[items].okulAdi,
                    MezuniyetTarihi = worker.TableKayitEgitimler[items].MezuniyetTarihi

                };
                _context.TableKayitEgitimler.Add(ekleOkul);
                _context.SaveChanges();

            }

            return worker;



        }

        public List<TableCinsiyet> InsertCinsiyet()
        {

            var data = _context.TableCinsiyet.FromSqlRaw(@"Select * FROM [Kayit1].[dbo].[TableCinsiyet]").ToList();
            return data;
        }
        [HttpGet]
        public List<TableCografya> InsertCografya()
        {

            // var data1 = _context.TableCografya.FromSqlRaw(@"Select * FROM [Kayit1].[dbo].[TableCografya] where ustId=0").ToList();
            var data1 = _context.TableCografya.Where(x => x.ustId == 0).ToList();
            return data1;
        }
        [HttpGet]
        [Route("/Home/InsertSehir/{value}")]
        public List<TableCografya> InsertSehir(string value)
        {

            var data2 = _context.TableCografya.FromSqlRaw(@"Select * FROM [Kayit1].[dbo].[TableCografya] where ustId=" + value).ToList();
            // var data2 = _context.TableCografya.Where(x => x.ustId != 0).ToList();


            return data2;
        }

        public ActionResult Sil(int id)
        {

            var silinecek = _context.TableKayit.Find(id);
            _context.TableKayit.Remove(silinecek);
            _context.SaveChanges(); 
            return RedirectToAction("Listeleme");

        }

        public TableKayit GetData(int id)
        {
            var data = _context.TableKayit.FromSqlRaw(@"Select k.id,k.isim,k.soyisim,k.kayıtTarihi,k.adres,c.cinsiyet as idCinsiyet, a.idYer as idCografya,b.idYer as idSehir, d.urlMedya as idMedya
                                        FROM Kayit1.dbo.TableKayit k
										LEFT JOIN Kayit1.dbo.TableCografya a ON a.idCografya=k.idCografya 
										LEFT JOIN Kayit1.dbo.TableCografya b ON b.idCografya=k.idSehir
										LEFT JOIN Kayit1.dbo.TableCinsiyet c ON c.idCinsiyet=k.idCinsiyet
                                        LEFT JOIN Kayit1.dbo.TableMedya d ON d.idMedya = k.idMedya  where k.id=" + id + "").FirstOrDefault();

            var egitim = _context.TableKayitEgitimler.Where(x => x.id == id).ToList();
            data.TableKayitEgitimler = egitim;

            return data;
        }

        [Route(" /TableKayit/Update/{id}")]
        public IActionResult Update(int id)
        {
            return View();
        }

        [HttpPost]
        [Route("/Home/KayıtGuncelle")]
        public void KayıtGuncelle(TableKayit update)
        {

            var model = new TableKayit()
            {
                id = update.id,
                isim = update.isim,
                soyisim = update.soyisim,
                kayıtTarihi = update.kayıtTarihi,
                adres = update.adres,
                idCinsiyet = update.idCinsiyet,
                idCografya = update.idCografya,
                idSehir = update.idSehir,
                idMedya = update.idMedya,


            };
            _context.TableKayit.Update(model);
            _context.SaveChanges();

            List<TableKayitEgitimler> TableKayitEgitim2 = _context.TableKayitEgitimler.Where(x => x.id == model.id).ToList();

            List<TableKayitEgitimler> tableKayitEgitimlers = new();


            for (int items = 0; items < update.TableKayitEgitimler.Count; items++)
            {

                if (update.TableKayitEgitimler[items].OkulId != 0)
                {
                    tableKayitEgitimlers.Add(update.TableKayitEgitimler[items]);


                }
            }

            for (int items = 0; items < TableKayitEgitim2.Count; items++)
            {
                var silinecekCalisan = _context.TableKayitEgitimler.Find(TableKayitEgitim2[items].idEgitim);
                _context.TableKayitEgitimler.Remove(silinecekCalisan);
                _context.SaveChanges();

            }

            for (int items = 0; items < tableKayitEgitimlers.Count; items++)
            {
                var ekleOkul = new TableKayitEgitimler()
                {
                    id = model.id,
                    OkulId = tableKayitEgitimlers[items].OkulId,
                    okulAdi = tableKayitEgitimlers[items].okulAdi,
                    MezuniyetTarihi = tableKayitEgitimlers[items].MezuniyetTarihi

                };
                _context.TableKayitEgitimler.Add(ekleOkul);
                _context.SaveChanges();
            }
        }
    
        [HttpPost]
        [Route("Home/MedyaOlustur/")]

        public int MedyaOlustur(IFormFile iFormFile) {

            int id = 0;
            string fileName = null;
            string wwwRootPath = null;
            string path = null;
            string url = null;
            if (iFormFile != null) {


                wwwRootPath = _webHostEnvironment.WebRootPath;
                fileName = Path.GetFileNameWithoutExtension(iFormFile.FileName);
                string extension = Path.GetExtension(iFormFile.FileName);
                fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
                path = Path.Combine(wwwRootPath + "/Medya/", fileName);
                url = Path.Combine("/../Medya/", fileName);
                using (FileStream fileStream = new FileStream(path, FileMode.Create))
                {
                    iFormFile.CopyTo(fileStream);
                }
                var model2 = new TableMedya()
                {
                    adMedya = fileName,
                    urlMedya = url,

                };
                _context.TableMedya.Add(model2);
                _context.SaveChanges();
                id = model2.idMedya;


            }

            return id;
        }

        [HttpGet]
        public List<ParamOkulTipleri> OkulGetir()
        {
            //var data = _context.ParamOkulTipleri.ToList();
            var data = _context.ParamOkulTipleri.Where(x => x.OkulId != 0).ToList();

            return data;
        }


    }

}
