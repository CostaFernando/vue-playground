import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import pt from 'vuetify/es5/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#00695C",
        secondary: "#FFCC00",
        success: "#4CAF50",
        error: "#FF5252",
        warning: "#FFC107",
        background_color: "#FAFAFA",
        arrow: "#FF6F00",
        selected: "#E6561E",
        background_card: "#F9F9F9",
        grey_title: "#373737",
        blue_header: "#2C6796",
        yellow_button: "#edbe23",
      },
    },
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
