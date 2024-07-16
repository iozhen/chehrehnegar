const Login = () => {
   return (
      <div className="flex p-[30px] items-center gap-[120px]">
         {/* image */}
         <div className="w-[656px] h-[960px] bg-[url(/images/loginBack.png)]">
            <div className="w-full h-full bg-[url(/images/loginBackFade.png)]"></div>
         </div>

         {/* login form */}
         <div className="w-[525px] h-[504px]">
            <h1 className="text-[48px] font-[700] text-center mb-[30px]">
               Login
            </h1>
            <div className="flex flex-col gap-[15px] mb-[20px]">
               <label htmlFor="emailInput" className="font-[700] text-[18px]">
                  Email
               </label>
               <input
                  type="text"
                  id="emailInput"
                  placeholder="Enter your email"
                  className="w-[525px] h-[64px] rounded-[100px] border-[1px] border-[#CBCBCB] px-[25px]"
               />
            </div>
            <div className="flex flex-col gap-[15px]">
               <label htmlFor="emailInput" className="font-[700] text-[18px]">
                  Password
               </label>
               <input
                  type="password"
                  id="emailInput"
                  placeholder="Enter your email"
                  className="w-[525px] h-[64px] rounded-[100px] border-[1px] border-[#CBCBCB] px-[25px]"
               />
            </div>
            <a
               href="#"
               className="text-[#58999F] text-[16px] font-[400] mt-[15px] mx-[25px] block"
            >
               Forget your password?
            </a>
            <button className="w-full h-[64px] bg-[#58999F] rounded-[1000px] text-white mt-[35px]">
               Log in
            </button>
            <p className="text-[16px] font-[400] text-center mt-[15px]">
               Dont have an account?{' '}
               <a href="#" className="text-[#58999F]">
                  Sign up
               </a>
            </p>
         </div>
      </div>
   );
};

export default Login;
