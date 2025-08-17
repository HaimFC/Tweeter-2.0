import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yerrqvbgxsamttmhftcu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcnJxdmJneHNhbXR0bWhmdGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzODQ3NzUsImV4cCI6MjA3MDk2MDc3NX0.8a6Q0w8fCahnLOXTmLnh4irThCJO8gmnWFvEaMxixXU"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
