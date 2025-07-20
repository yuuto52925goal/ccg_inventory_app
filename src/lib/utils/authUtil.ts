import { NextRequest } from "next/server";
import { supabase } from "../supabase";

export default class AuthUtil{
  public static async isAuthorized(req: NextRequest){
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) return null;

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;

    return data.user;
  }
}