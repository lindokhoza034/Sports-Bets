export interface Phone{
    dialingCode:string;
    number:string;
}
export interface User{
    email:string;
    firstNames:string;
    lastName:string;
    username:string;
    password: string;
    phone:Phone;
}