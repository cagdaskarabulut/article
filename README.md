# Genel Mimari: 
## Bu uygulama, birden fazla internet sitesi için şablon olarak kullanılır. 
## Her projesinin dosyaları aws de kendi ismiyle oluşturulmuş klasör altında tutulur.
## Her projesinin değişkenleri ve parametreleri postgresql'de ve vercel'in env dosyasında tutulur
## Her site farklı branch de tutulur ve bu branchler üzerinden vercel'e yayınlanmak üzere bağlanır. (Deploy bu branchler üzerinden çıkılır.)

# Yeni Websitesi Eklerken;
## Her eklenen yeni proje için api dosyaları içerisine if koşulu ile o siteye uygun olarak değiştirilmiş yeni scriptler eklenir
## Her branch altında çalışılırken o projeye ait env dosyası çekilir 

