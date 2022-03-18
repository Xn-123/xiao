import { v4 as uuidv4 } from 'uuid';

export const getUUID = () =>{
   // 本地读取游客临时身份
   let uuid_token = localStorage.getItem('UUIDTOKEN')   
   //  身份不存在 》 创建   
   if(!uuid_token){
     //个人游客临时身份
     uuid_token = uuidv4();
     //本地存储  
     localStorage.setItem('UUIDTOKEN',uuid_token)
   }
   return uuid_token
}
