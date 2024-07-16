import PageTitle from '@/components/PageTitle';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
   const { t } = useTranslation();
   const isEnLang = i18next.language === 'en';

   return (
      <div>
         <div
            dir={`${isEnLang ? 'ltr' : 'rtl'}`}
            className="w-[90%] mx-auto mb-[70px] ___ sm:w-[80%] ___ md:w-[1200px]"
         >
            <PageTitle title={t('ContactShowTitle')} />

            <h3 className="text-[21px] font-[700] ___ sm:text-[30px] ___ lg:text-[24px]">
               {t('Contact_Title')}
            </h3>

            <p className="text-[18px] font-normal text-justify leading-[40px] mb-[40px] ___ sm:text-[20px] sm:leading-[35px] ___ lg:text-[24px] lg:leading-[40px]">
               {t('Contact_desc1')} <br />
               {t('Contact_desc2')} <br />
               {t('Contact_desc3')} <br />
            </p>
         </div>
      </div>
   );
};

export default Contact;
