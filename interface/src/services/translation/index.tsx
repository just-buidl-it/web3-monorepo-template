import i18next from 'i18next';
import { Trans, initReactI18next, useTranslation } from 'react-i18next';

import en from './strings/en.json';

const init = async (): Promise<typeof i18next> => {
  await i18next.use(initReactI18next).init({
    ns: ['components'],
    resources: {
      en: {
        components: en.components,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
  });
  await i18next.loadNamespaces('errors');
  return i18next;
};

export { Trans, useTranslation };

export default init();
