export default async function handler(req, res) {
  const { path } = req.query; // Hangi sayfanın yeniden oluşturulacağını alıyoruz

  if (!path) {
    return res.status(400).json({ message: "Path parametresi eksik" });
  }

  try {
    if (path === "homepage") {
      console.log("Ana sayfa yeniden oluşturuluyor...");
      await res.revalidate(`/`);
      console.log("Ana sayfa başarıyla yeniden oluşturuldu.");
    } else {
      // Diğer sayfalar için yeniden oluşturma
      await res.revalidate(`/${decodeURIComponent(path)}`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Yeniden oluşturma hatası:", err);
    return res.status(500).send("Yeniden oluşturma başarısız");
  }
}
