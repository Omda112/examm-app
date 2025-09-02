
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}, 
      },
      authorize: async(credentials)=> {
        console.log(credentials);
        
        const response = await fetch(process.env.SIGNIN_API!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const payload:ApiResponse<LoginResponse> = await response.json();
        
        if('code' in payload){
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // <--- هذا السطر هو مفتاح الحل
  },
  callbacks:{
    jwt:({token,user})=>{
        if (user) {
            token = {
              ...token,
              ...user, // Spread the user properties into the token
            }
          }          
        return token;
    },
    session:({session,token})=>{
        session._id = token.id ;
        session.email = token.email || "" ;
        session.username = token.username ;
        session.firstName = token.firstName ;
        session.lastName = token.lastName ;
        session.phone = token.phone ;
        session.role = token.role ;
        session.isVerified = token.isVerified;
        session.createdAt = token.createdAt ;



        return session;
    }
  },
};
