const API =
"https://esanmember-api.onrender.com/api/coupons";

async function loadCoupons(){

    try{

        const response = await fetch(API);

        const coupons = await response.json();

        const list = document.getElementById("couponList");

        list.innerHTML = "";

        coupons.forEach(coupon=>{

            list.innerHTML += `
            <div class="card mb-3 shadow-sm">

                <div class="card-body">

                    <h5>🎟 ${coupon.title}</h5>

                    <p>${coupon.description}</p>

                    <p>
                        ⭐ ใช้ ${coupon.points_required} แต้ม
                    </p>

                    <small class="text-muted">
                        หมดอายุ : ${coupon.expire_date}
                    </small>

                </div>

            </div>
            `;

        });

    }catch(err){

        console.error(err);

    }

}

loadCoupons();