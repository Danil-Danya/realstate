import { createStore } from 'vuex';
import admimLinks from './adminLinks/admimLinks';
import appartamets from './appartaments/appartamets';
import requests from './requests/requests';
import post from './posts/post';

export default createStore({
  modules: {
    admimLinks,
    explore: appartamets(),
    sliderHomePage: appartamets(),
    bestOffer: appartamets(),
    appartaments: appartamets(),
    requests,
    post,
  }
})
