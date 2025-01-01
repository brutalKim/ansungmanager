import bcrypt from 'bcryptjs'

//비밀번호 암호화
export async function hashPW(pw:string):Promise<string>{
    //salt횟수
    const saltRounds:number = 10;
    return await bcrypt.hash(pw,saltRounds);
}

//비밀번호 대조
export async function validPW(pw:string , hashedPW:string):Promise<boolean>{
    return await bcrypt.compare(pw,hashedPW);
}