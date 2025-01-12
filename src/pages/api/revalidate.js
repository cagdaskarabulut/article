// export default async function handler(req, res) {
//   const { path } = req.query; // Hangi sayfanın yeniden oluşturulacağını alıyoruz

//   if (!path) {
//     return res.status(400).json({ message: "Path parametresi eksik" });
//   }

//   try {
//     // Path'i yeniden oluştur
//     // curl -X GET "https://www.cnmautoparts.com/api/revalidate?path=i%CC%87leti%C5%9Fim"
//     // curl -X GET "https://www.cnmautoparts.com/api/revalidate?path=isuzu-disli-kutu-kapak-conta-4jj1-4jk1-939686063360"
//     await res.revalidate(`/${decodeURIComponent(path)}`); // Path'i çözerek ISR'yi tetikle
//     return res.json({ revalidated: true });
//   } catch (err) {
//     console.error("Yeniden oluşturma hatası:", err);
//     return res.status(500).send("Yeniden oluşturma başarısız");
//   }
// }

/********** */

// export default async function handler(req, res) {
//   const { path } = req.query;

//   if (path === undefined || path === null || path === "") {
//     return res.status(400).json({ message: "Path parametresi eksik" });
//   }

//   try {
//     const decodedPath = `/${decodeURIComponent(path).replace(/^\/+/, "")}`; // Çift "/" durumunu engelle
//     //curl -X GET "http://localhost:3000/api/revalidate?path=isaac-newton-the-genius-who-transformed-science-and-mathematics-html-copy-code-831919006350"
//     console.log(`Revalidating: ${decodedPath}`);
//     await res.revalidate(decodedPath); // Belirtilen path'i yeniden oluştur

//     return res.json({
//       revalidated: true,
//       path: decodedPath,
//     });
//   } catch (error) {
//     console.error("Revalidate error:", error.message);
//     return res
//       .status(500)
//       .json({ error: `Failed to revalidate ${path}: ${error.message}` });
//   }
// }

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ message: "Path parametresi eksik." });
  }

  try {
    const decodedPath = `/${decodeURIComponent(path).replace(/^\/+/, "")}`; // Çift "/" durumlarını temizle
    console.log(`Revalidating: ${decodedPath}`);

    // Belirtilen path için önbelleği sıfırla
    await res.revalidate(decodedPath);

    return res.json({
      revalidated: true,
      path: decodedPath,
    });
  } catch (error) {
    console.error("Revalidate error:", error.message);
    return res.status(500).json({
      error: `Failed to revalidate ${path}: ${error.message}`,
    });
  }
}
