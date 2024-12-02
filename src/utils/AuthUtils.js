import { useRouter } from "next/navigation";

// Backend için Yetkilendirme
export async function checkAuthorizationServer(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return { isAuthorized: false };
    }

    // Mock veritabanı doğrulama: E-posta adresi burada örnek olarak düz bir string kullanılmıştır
    const userEmail = "test@example.com"; // Örnek e-posta, gerçek doğrulama eklenmeli
    const isSuperAdmin = isEmailInList(
      userEmail,
      process.env.PROJECT_SUPER_ADMIN_USER
    );
    const isAdmin = isEmailInList(userEmail, process.env.PROJECT_ADMIN_USER);

    return {
      isAuthorized: isSuperAdmin || isAdmin,
      isSuperAuthorizedUser: isSuperAdmin,
    };
  } catch (error) {
    console.error("Authorization check failed on server:", error);
    return { isAuthorized: false };
  }
}

// Frontend için Yetkilendirme
export async function checkAuthorizationClient(router) {
  try {
    const res = await fetch("/api/auth/whoAmI/email");
    const data = await res.json();

    const isSuperAdmin = isEmailInList(
      data.email,
      process.env.PROJECT_SUPER_ADMIN_USER
    );
    const isAdmin = isEmailInList(data.email, process.env.PROJECT_ADMIN_USER);

    if (isSuperAdmin) {
      return { isAuthorized: true, isSuperAuthorizedUser: true };
    } else if (isAdmin) {
      return { isAuthorized: true, isSuperAuthorizedUser: false };
    } else {
      router.push("/api/auth/signin", { scroll: false });
      return { isAuthorized: false, isSuperAuthorizedUser: false };
    }
  } catch (error) {
    console.error("Authorization check failed on client:", error);
    router.push("/api/auth/signin", { scroll: false });
    return { isAuthorized: false, isSuperAuthorizedUser: false };
  }
}

// E-posta Doğrulama Yardımcı Fonksiyonu
function isEmailInList(email, emailListString) {
  const emailArray = emailListString.split(",");
  return emailArray.includes(email);
}
