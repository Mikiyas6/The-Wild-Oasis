import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tyehehkndsmfxprggqxe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZWhlaGtuZHNtZnhwcmdncXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODQ0OTMsImV4cCI6MjA1Mjk2MDQ5M30.v4TiDoE2g8cZfOKCq3SE3xsDVnE__7WEaTVjxb1w9oM";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
