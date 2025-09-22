import { supabase } from "../config/supabaseClient.js";

export const reportsModel = {
    async getAll() {
    const { count, error } = await supabase
      .from("medications")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return count; // akan mengembalikan jumlah total row
  },
};