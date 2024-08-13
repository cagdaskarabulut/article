// pages/api/revalidate-all.js
"use server";

const pagesToRevalidate = [
  "/", // Anasayfa
];

export default async function handler(req, res) {
  try {
    // Tüm sayfaları döngüye alarak cache'lerini temizliyoruz
    for (const page of pagesToRevalidate) {
      await res.revalidate(page);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidate error:", err);
    return res.status(500).send("Error revalidating");
  }
}
