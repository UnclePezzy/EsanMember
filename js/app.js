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

        document.getElementById("points").innerText =
            customer.points ?? 0;

        // ปุ่มโปรโมชั่น
        document.getElementById("promoBtn").addEventListener("click", () => {
            liff.openWindow({
                url: "https://line.me/R/ti/p/@043vfrqa",
                external: true
            });
        });

        // ปุ่มติดต่อร้าน
        document.getElementById("contactBtn").addEventListener("click", () => {
            liff.openWindow({
                url: "https://maps.app.goo.gl/SfdJ8RoyZwdgopEQ6?g_st=ic",
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