const supabase = require("../config/supabase");

const getPromotions = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("promotions")
            .select("*")
            .order("id");

        if (error) throw error;

        res.json(data);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    getPromotions
};