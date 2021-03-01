<template>
  <div class="home">
    <div id="theTitle">
      <strong>{{ theTitle }}</strong>
    </div>
    <img style="margin-top:10px" src="@/assets/header-image.jpg" id="headerImage">
    <notifier></notifier>
    <div v-if="hasHistory" class="answerItems" style="margin-top:10px">
      <p v-if="isNewResponse"><strong>{{ theAnswer }}</strong></p>
      <spinner class="spinner" v-if="isLoading"></spinner>
      <viewHistory-btn theClass="btn" id="histryBtn" name="View History" @click.native="showHistory"></viewHistory-btn>
    </div>
    <div v-else  style="margin-top:10px">
      <spinner class="spinner" v-if="isLoading"></spinner>
    </div>
    <form class="questionForm" @submit.prevent>
      <input-text
        v-model="theQuestion"
        label="Question"
        hint="Please, type your question..."
        placeholder="Please, type your question..."
        color="blue"
        style="margin-top:20px"
      />
      <submit-btn theClass="btn" id="submitBtn" name="Submit" @click.native="submit"></submit-btn>
    </form>
    <answers-history-modal ref="historyDialogue"></answers-history-modal>
  </div>
</template>

<script>
import InputText from "@/components/InputText";
import Modal from "@/components/Modal/ModalContent";
import Notifier from "@/components/Notifier.vue";
import Spinner from "@/components/Spinner.vue";
import Button from "@/components/Button.vue";


import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    "input-text": InputText,
    "answers-history-modal": Modal,
    "notifier": Notifier,
    "spinner": Spinner,
    "submit-btn": Button,
    "viewHistory-btn": Button
  },
  data() {
    return {
      theTitle: "Magic 8-Ball",
      theQuestion: undefined,
      theAnswer: undefined,
      isLoading: false,
      isNewResponse: false,
      hasHistory: false,
    };
  },
  computed: {
    ...mapGetters("appState", ["getTheAnswer", "getTheLastTenAnswers"])
  },
  methods: {
    ...mapMutations("notification", ["NOTIFY", "SET_STATUS"]),
    submit() {
      this.isNewResponse = false;
      const theQuestion = this.theQuestion;
      const isQuestion = this.isQuestion(theQuestion);
      const questionInputHasLength = this.checkQuestionInputLength(theQuestion)
      if ((isQuestion) && (questionInputHasLength)) {
        this.isLoading = true;
        this.doRequest(theQuestion);
      } else if((!isQuestion) && (questionInputHasLength)) {
        this.showNotifications( "Our robot respond only to questions.", "warning");
      } else if(!questionInputHasLength) {
        this.showNotifications( "Please, do a question.", "warning");
      }
    },
    doRequest(pQuestion) {
      if(typeof(pQuestion) !== "undefined"){
      this.$store.dispatch("appState/getTheAnswer", pQuestion).then(
        response => {
          console.log(response);
          if (response.status === 200) {
            this.returnTheAnwer();
            this.showNotifications("Our robot has responded to your question:","success");
            this.isLoading = false;
            this.isNewResponse = true;
            this.hasHistory = true;
          }
        },
        error => { this.showNotifications(error, "danger"); }
      );
      }
    },
    returnTheAnwer() {
      this.theAnswer = this.getTheAnswer;
    },
    isQuestion(pTheQuestion) {
      let isQuestion;
      if (typeof pTheQuestion !== "undefined") { isQuestion = pTheQuestion.substr(-1) === "?"; }
      if (isQuestion) { return true; } else { return false; }
    },
    checkQuestionInputLength(pTheQuestion){
      if(typeof(pTheQuestion) === "undefined") { return false; } else { return true; }
    },
    showHistory() {
      const listIsEmpty = 0;
      const fillInModal = this.returnModalContext();
      if (this.getTheLastTenAnswers.length !== listIsEmpty) {
        this.$refs.historyDialogue.show(fillInModal);
      } else {
        this.showNotifications("Your history is empty. Please, type a question first","warning");
      }
    },
    showNotifications(pMsg, pType) {
      this.NOTIFY({ msg: pMsg, type: pType });
    },
    returnModalContext() {
      const modalContext = {
        title: "The last ten answers.",
        message: "Here you can see the last 10 responses:",
        lastTenAnswers: this.getTheLastTenAnswers
      };
      return modalContext;
    }
  }
};
</script>

<style scoped>
#theTitle {
  font-size: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
}

#headerImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.answerItems {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.spinner {
  margin-left: 50% 
}

.answerItems, .questionForm {
  margin-top: 10px;
    border: 2px solid #f25f25;
    border-radius: 5px;
    padding: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
