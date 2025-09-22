import { supabase } from "../config/supabaseClient.js";

export const MedicationModel = {
  async getAll(limit = 10, offset = 0) {
    // ambil total count
    const { count, error: countError } = await supabase
      .from("medications")
      .select("*", { count: "exact", head: true });
    if (countError) throw countError;

    // ambil data sesuai range
    const { data, error } = await supabase
      .from("medications")
      .select(
        "id, sku, name, description, price, quantity, category_id, supplier_id"
      )
      .range(offset, offset + limit - 1);
    if (error) throw error;

    return { data, total: count };
  },

  async search(query) {
    // Supabase pencarian case-insensitive
    const { data, error } = await supabase
      .from("medications")
      .select("id, sku, name, description, price, quantity, category_id, supplier_id")
      .ilike("name", `%${query}%`); // cari berdasarkan nama

    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("medications")
      .select(
        `
        id, sku, name, description, price, quantity,
        categories ( id, name ),
        suppliers ( id, name, email, phone ),
      `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("medications")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("medications")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("medications").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
};
