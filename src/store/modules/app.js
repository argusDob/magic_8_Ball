import axios from "axios";

const state = {
  theAnswer: undefined,
  theLastTenAnswersList: []
};

const mutations = {
  SET_ANSWER: (state, payload) => {
    state.theAnswer = payload;
  },
  SET_LAST_TEN_ANSWERS: (state, payload) => {
    const theLastTenAnswersListLength = 10;
    if (state.theLastTenAnswersList.length === theLastTenAnswersListLength) {
      state.theLastTenAnswersList.shift();
    }
    state.theLastTenAnswersList.push(payload);
  },
  EMPTY_LAST_TEN_ANSWERS_LIST: (state, payload) => {
    state.theLastTenAnswersList = payload;
  }
};

const getters = {
  getTheAnswer: state => {
    return state.theAnswer;
  },
  getTheLastTenAnswers: state => {
    return state.theLastTenAnswersList;
  }
};

const actions = {
  getTheAnswer(context, payload) {
    const theQuestion = payload, url = "https://8ball.delegator.com/magic/JSON/" + theQuestion;
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(function(response) {
          context.commit("SET_ANSWER", response.data.magic.answer);
          context.commit("SET_LAST_TEN_ANSWERS", response.data.magic);
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
          console.log(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
