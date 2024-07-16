import { useRouter } from 'next/router';
import React, { useState } from 'react';
import data from '../../data/db.json';
import Link from 'next/link';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SidebarMenu from '../SidebarMenu';

export interface linksType {
   href: string;
   title: string;
}

const Header = () => {
   const router = useRouter();
   const { t } = useTranslation();
   const isEnLang = i18next.language === 'en';
   const [sidebarState, setSidebarState] = useState<boolean>();
   const [changeLanguage, setChangeLanguage] = useState<boolean>(false);
   const [linkActive, setLinkActive] = useState(0);

   return (
      <>
         {router.pathname !== '/login' && (
            <>
               <div className="w-full h-[101px] mb-[40px]"></div>

               <header
                  className={`fixed top-0 left-0 w-full z-[10] pt-[25px] text-black bg-white
                     ${
                        router.pathname.includes('map')
                           ? 'h-[7vh]'
                           : 'h-[120px]'
                     }  
                  `}
               >
                  {/* prettier-ignore */}
                  <div className={`w-[1200px] mx-auto flex justify-between items-center ${isEnLang ? 'flex-row' : 'flex-row-reverse'}`}>
                     <a
                        href="https://en.sharif.edu/"
                        target="_blank"
                        className={
                           'inline-block bg-[url(/images/sharif.png)] bg-cover bg-center ' +
                           (router.pathname.includes('map')
                              ? 'w-[45px] h-[45px]'
                              : 'w-[76px] h-[76px]')
                        }
                     ></a>

                     <nav
                        className={`hidden justify-center items-start gap-[40px] ___ sm:text-[22px] sm:flex
                           ${
                              isEnLang
                                 ? 'flex-row'
                                 : 'flex-row-reverse'
                           }
                        `}
                     >
                        {data.headerLinks.map(
                           ({ href, title }: linksType, index) => (
                              <Link
                                 href={href}
                                 key={index}
                                 onClick={() => setLinkActive(index)}
                                 // prettier-ignore
                                 className={`${index === linkActive && 'font-[700]'}`}
                              >
                                 {t(`${title}`)}
                                 <div
                                    // prettier-ignore
                                    className={`mt-[5px] w-[20px] h-[3px] rounded-[1000px] mx-auto ${index === linkActive && 'bg-[#58999F]'}`}
                                 ></div>
                              </Link>
                           )
                        )}

                        <button
                           onClick={() => {
                              setChangeLanguage(true);
                              setTimeout(() => setChangeLanguage(false), 200);
                              isEnLang
                                 ? i18next.changeLanguage('fa')
                                 : i18next.changeLanguage('en');
                           }}
                        >
                           {isEnLang ? 'فا' : 'En'}
                        </button>
                     </nav>

                     <button
                        className="inline-block mx-[20px] text-[30px] text-black ___ sm:hidden"
                        onClick={() => setSidebarState(true)}
                     >
                        <FontAwesomeIcon icon={faBars} />
                     </button>

                     <SidebarMenu
                        setSidebarState={setSidebarState}
                        sidebarState={sidebarState}
                        changeLanguage={changeLanguage}
                     />
                  </div>
               </header>
            </>
         )}
      </>
   );
};

export default Header;
