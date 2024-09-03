import { createClient } from "@supabase/supabase-js";

const ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

export const taco = createClient(URL, ANON_KEY);
