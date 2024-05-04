# Genel Mimari: 
## Bu uygulama, birden fazla internet sitesi için şablon olarak kullanılır. 
## Her projesinin dosyaları aws de kendi ismiyle oluşturulmuş klasör altında tutulur.
## Her projesinin değişkenleri ve parametreleri postgresql'de ve vercel'in env dosyasında tutulur

# Yeni Websitesi Eklerken;
## Her eklenen yeni proje için api dosyaları içerisine if koşulu ile o siteye uygun olarak değiştirilmiş yeni scriptler eklenir
## Sitenin özel alanları db ve env dosyalarına eklenir
## colors.scss dosyasına sitenin ana renkleri eklenir