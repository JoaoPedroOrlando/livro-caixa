import { StatusBar } from 'expo-status-bar';
import { SafeAreaView} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes';
import Colors from './assets/colors';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import ptBrTranslation from './locales/pt-br.json';
import esTranslation from './locales/es.json';

i18next.use(initReactI18next).init({
  compatibilityJSON:'v3',
  resources: {
    en: {
      translation: enTranslation,
    },
    ptBr: {
      translation: ptBrTranslation,
    },
    es: {
      translation: esTranslation,
    }
  },
  lng: 'ptBr', // Set the default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18next}>
        <SafeAreaView
          style={{
            flex: 1,
            // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            backgroundColor: Colors.primary.white
          }}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Routes/>
        </SafeAreaView>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}