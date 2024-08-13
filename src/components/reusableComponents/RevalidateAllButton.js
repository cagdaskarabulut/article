// components/RevalidateAllButton.js
"use client";

import { useState } from "react";

export default function RevalidateAllButton() {
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleRevalidateAll = async () => {
    setIsRevalidating(true);
    try {
      const res = await fetch("/api/revalidate-all", {
        method: "POST",
      });
      if (res.ok) {
        alert(
          "Tüm sayfaların cache'i temizlendi ve sayfalar yeniden oluşturulacak!"
        );
      } else {
        alert("Cache temizleme sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Cache temizleme hatası:", error);
    } finally {
      setIsRevalidating(false);
      // Opsiyonel: Sayfanın yeniden yüklenmesi için bir yönlendirme ekleyebilirsiniz
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleRevalidateAll}
      disabled={isRevalidating}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {isRevalidating
        ? "Yeniden Yükleniyor..."
        : "Tüm Cache'i Temizle ve Yeniden Yükle"}
    </button>
  );
}
