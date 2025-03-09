// For each of our tables in our database, we create one service
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  /*
  This is an asynchronous operation that returns a promise which resolves to an object containing two properties:
  
  // Success case:
{
  data: [
    { id: 1, name: "Cabin 1", price: 100, ... },
    { id: 2, name: "Cabin 2", price: 150, ... },
    // ... more cabins
  ],
  error: null
}

// Error case:
{
  data: null,
  error: {
    message: "Error message here",
    details: "...",
    hint: "...",
    code: "..."
  }
}
  */

  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  // https://tyehehkndsmfxprggqxe.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  /*
- supabaseUrl: URL of your Supabase instance 
- /storage/v1/object/public/: Standard Supabase storage path
- cabin-images/: The bucket name where images are stored
- ${imageName}: The unique name generated for the new image
Example:
https://tyehehkndsmfxprggqxe.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
*/

  // 1. Create/edit cabin
  let query = supabase.from("cabins");
  /*
 returns a query builder object that points to cabins table. The query is only executed when you call a terminating method like:
.select()
.insert()
.update()
.delete()
.upsert()
  */
  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
    /*
    - Now query stores a Supabase query builder object that points to the cabins table has been configured for an insert operation
    - It hasn't executed the query yet - it's just holding the configuration of what we want to do.
    - Configuration:
      1. The target table ("cabins")
      2. The operation type (insert)
      3. The data to insert ([{...newCabin, image: imagePath}])
    */
  }
  // The Immediate chain of the select method will be the difference between getting {data, error} or query builder object. Meaning, If we chain the select  method to supabase.from("cabins"), it will return a {data, error} object. But if we don't chain the slelect method to it, it will return a query builder object.

  /*
  - let query = supabase.from("cabins") - returns a query builder object that points to cabins table.
  - query = query.insert([{ ...newCabin, image: imagePath }]) - returns a query builder object that points to cabins table has been configured for an insert operation  
  - const { data, error } = await query.select().single();- triggers the actual execution of the query and returns a promise with the data

   */

  // B) EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    throw new Error("Cabin could not be created");
  }
  if (hasImagePath) return data;
  // uploads the image to the supabase storage bucket named cabin-images with the name of the image (imageName) and the image file (newCabin.image)
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabin image could not be uploaded");
  }
  return data;
}
