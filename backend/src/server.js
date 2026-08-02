require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

console.log("SUPABASE_URL :", process.env.SUPABASE_URL ? "FOUND" : "NOT FOUND");
console.log("SUPABASE_KEY :", process.env.SUPABASE_KEY ? "FOUND" : "NOT FOUND");

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});