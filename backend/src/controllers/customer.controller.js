const supabase = require("../config/supabase");

// ======================
// ดึงสมาชิกทั้งหมด
// ======================

const getCustomers = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("customers")
            .select("*")
            .order("id");

        if (error) throw error;

        res.json(data);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ======================
// เพิ่มสมาชิก
// ======================

const saveCustomer = async (req, res) => {

    try {

        const {

            userId,
            displayName,
            pictureUrl

        } = req.body;

        const { data: exist } = await supabase
            .from("customers")
            .select("*")
            .eq("line_user_id", userId)
            .single();

        if (exist) {

            return res.json(exist);

        }

        const { data, error } = await supabase
            .from("customers")
            .insert({

                line_user_id: userId,
                display_name: displayName,
                picture: pictureUrl

            })
            .select()
            .single();

        if (error) throw error;

        res.json(data);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getCustomers,
    saveCustomer

};