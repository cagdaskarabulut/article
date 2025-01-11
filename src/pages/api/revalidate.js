export default async function handler(req, res) {
  const { path } = req.query; // Hangi sayfanın yeniden oluşturulacağını alıyoruz

  if (!path) {
    return res.status(400).json({ message: "Path parametresi eksik" });
  }

  try {
    // Path'i yeniden oluştur
    // curl -X GET "https://www.cnmautoparts.com/api/revalidate?path=i%CC%87leti%C5%9Fim"
    // curl -X GET "https://www.cnmautoparts.com/api/revalidate?path=isuzu-disli-kutu-kapak-conta-4jj1-4jk1-939686063360"
    await res.revalidate(`/${decodeURIComponent(path)}`); // Path'i çözerek ISR'yi tetikle
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Yeniden oluşturma hatası:", err);
    return res.status(500).send("Yeniden oluşturma başarısız");
  }
}
