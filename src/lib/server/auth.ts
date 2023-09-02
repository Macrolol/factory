import type { Cookies } from "@sveltejs/kit";


export function validate(cookies: Cookies): boolean {
    const userid = cookies.get('userid');
    if(userid === undefined) return false;
    return true;
}