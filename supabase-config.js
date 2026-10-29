
const SUPABASE_URL = "https://evrpvjaynqzaqzrsbqvr.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_GvNArbgFvHfWipogNJezfQ_jy3QEBVQ";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
