import Link from 'next/link';
import data from '../data/db.json';
import { linksType } from './layout/Header';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface sidebarType {
   setSidebarState: React.Dispatch<React.SetStateAction<boolean | undefined>>;
   sidebarState: boolean | undefined;
   changeLanguage: boolean;
}

export default function SidebarMenu({
   setSidebarState,
   sidebarState,
   changeLanguage,
}: sidebarType) {
   const { t } = i18next;
   const isEnLang = i18next.language === 'en';

   return (
      <div
         className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.9)] z-[999] text-white transition duration-[0.7s]
            ${
               sidebarState
                  ? 'translate-x-0'
                  : changeLanguage
                  ? isEnLang
                     ? 'translate-x-[100%] transition-none'
                     : 'translate-x-[-100%] transition-none'
                  : isEnLang
                  ? 'translate-x-[100%]'
                  : 'translate-x-[-100%]'
            }
         `}
      >
         <button
            className={`text-[30px] my-[30px] px-[35px] w-full flex
          ${isEnLang ? 'justify-end' : 'justify-start'}
        `}
            onClick={() => setSidebarState(false)}
         >
            <FontAwesomeIcon
               icon={faClose}
               className="transition duration-[0.4s] ___ hover:text-[red]"
            />
         </button>

         <nav className="grid text-[21px] px-[40px] mt-[30px]">
            <button
               onClick={() => {
                  setSidebarState(false);
                  isEnLang
                     ? i18next.changeLanguage('fa')
                     : i18next.changeLanguage('en');
               }}
               className={`text-left px-[15px] h-[60px] flex items-center transition duration-[0.5s] ___ hover:bg-[#FFF3]
                  ${isEnLang ? 'justify-start' : 'justify-end'}  
               `}
            >
               {isEnLang ? 'فا' : 'En'}
            </button>

            {data.headerLinks.map(({ href, title }: linksType, index) => (
               <Link
                  href={href}
                  key={index}
                  className={`px-[15px] h-[60px] flex justify-start items-center transition duration-[0.5s] ___ hover:bg-[#FFF3]
                     ${isEnLang ? 'justify-start' : 'justify-end'}  
                  `}
                  onClick={() => setSidebarState(false)}
               >
                  {t(`${title}`)}
               </Link>
            ))}
         </nav>
      </div>
   );
}
