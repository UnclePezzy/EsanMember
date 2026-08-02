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

    } catch (error) {
        console.error("LIFF ERROR:", error);

        document.getElementById("displayName").innerText =
            "ไม่สามารถโหลดข้อมูลสมาชิกได้";
    }
}

main();