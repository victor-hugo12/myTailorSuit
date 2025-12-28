// src/config/supabase.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wuuvabqdylmzdxumbrns.supabase.co"; // tu Project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dXZhYnFkeWxtemR4dW1icm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTkwMDUsImV4cCI6MjA3OTc3NTAwNX0.LiKg7Tr_zVEUYFKZ6Q_czWozEfSDy7XjR0NS58WScb0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
