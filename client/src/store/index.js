import { createStore } from 'vuex';
import admimLinks from './adminLinks/admimLinks';
import appartamets from './appartaments/appartamets';
import requests from './requests/requests';
import post from './posts/post';
import users from './users/users';
import reviews from './reviews/reviews';

export default createStore({
  modules: {
    admimLinks,
    explore: appartamets(),
    sliderHomePage: appartamets(),
    bestOffer: appartamets(),
    appartaments: appartamets(),
    requests,
    post,
    users,
    reviews
  }
})
