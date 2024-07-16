import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import PageTitle from '@/components/PageTitle';

const About = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === 'en';

   return (
      <div>
         <div
            className={`w-[90%] mx-auto mb-[70px] ___ sm:w-[80%] ___ md:w-[1200px]
               ${isEnLang ? 'text-left' : 'text-right'}
            `}
         >
            <PageTitle title={t('AboutShowTitle')} />

            <h3 className="text-[24px] mb-[10px] font-[700] ___ sm:text-[30px] ___ lg:text-[35px]">
               {t('About_Title')}
            </h3>

            <p
               dir={isEnLang ? 'ltr' : 'rtl'}
               className="text-[24px] font-[400] text-justify mb-[30px] ___ sm:text-[20px] sm:leading-[35px] ___ lg:text-[25px] lg:leading-[40px]"
            >
               {t('About_desc')}
            </p>
         </div>
      </div>
   );
};

export default About;
