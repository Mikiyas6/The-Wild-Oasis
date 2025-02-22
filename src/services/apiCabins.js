// For each of our tables in our database, we create one service
import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // https://tyehehkndsmfxprggqxe.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create/edit cabin
  let query = supabase.from("cabins");
  // A) CREATE
  if (!id) {
    query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B) EDIT
  const { data, error } = await query.select().single();
  if (id) {
    if (error) {
      throw new Error("Cabin could not be created");
    }
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded");
  }
  return data;
}
