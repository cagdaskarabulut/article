# Proje hakkında: 
## Bu uygulama, birden fazla internet sitesi için şablon olarak kullanılır. 
## Her site farklı branch de tutulur. 
### Her branch altında çalışılırken o projeye ait env dosyası çekilir. Aktif internet sitesinin parametreleri bu env dosyasında ve istenirse kendi db sinde tutulur.
### Siteye özel dosyalar her branch altında onun içerisinden siteye ait bilgiler saklanabilir. (Logo , ads.txt , yandex_... gibi dosyalar)
## Ortak yapılacak değişiklikler main branch de yapılıp diğer branch'lerden "merge into current" yapılarak alınır