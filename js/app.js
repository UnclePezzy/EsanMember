const LIFF_ID = "2010938431-JUZLRPFk";

async function main() {
    try {
        await liff.init({
            liffId: LIFF_ID
        });

        if (!liff.isLoggedIn()) {
            liff.login();
            return;
        }

        const profile = await liff.getProfile();

        console.log("LINE Profile:", profile);

        // รูปโปรไฟล์
        document.getElementById("profilePic").src =
            profile.pictureUrl || "";

        // ชื่อสมาชิก
        document.getElementById("displayName").innerText =
            `สวัสดี คุณ ${profile.displayName}`;

        // บันทึกสมาชิกลง Backend
        const response = await fetch("https://esanmember-api.onrender.com/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl || null
            })
        });

        const customer = await response.json();

        console.log("Customer:", customer);

        // แต้มสะสม
        const points = customer.points ?? 0;
        document.getElementById("points").innerText = points;

        // ระดับสมาชิก
        let level = "🌱 สมาชิกใหม่";

        if (points >= 10)
            level = "🥢 ลูกค้าประจำ";

        if (points >= 30)
            level = "🌶 แฟนประจำ";

        if (points >= 50)
            level = "👑 VIP";

        if (points >= 100)
            level = "🔥 ตำนานร้านอีสานรักบ้านเกิด";

        document.getElementById("memberLevel").innerText = level;

        // โปรโมชั่น
        document.getElementById("promoBtn").addEventListener("click", () => {
            liff.openWindow({
                url: "https://line.me/R/ti/p/@043vfrqa",
                external: true
            });
        });

    } catch (error) {

        console.error("LIFF ERROR:", error);

        document.getElementById("displayName").innerText =
            "ไม่สามารถโหลดข้อมูลสมาชิกได้";
    }
}

main();