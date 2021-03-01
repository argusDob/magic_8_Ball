<template>
  <popup-modal ref="popup">
    <div class="title-items">
      <h2 style="margin-top: 0">{{ title }}</h2>
      <p>{{ message }}</p>
    </div>
    <ul>
      <li v-for="(theResponse, index) in theLastTenAnswers" :key="index">
        {{++index}}.
        <strong>Question:</strong>
        {{ theResponse.question }}?
        <strong>Answer:</strong>
        {{ theResponse.answer }}
      </li>
    </ul>
    <div class="btns">
      <close-btn theClass="btn" name="Close" @click.native="cancel"></close-btn>
      <reset-btn theClass="btn" name="Reset" @click.native="reset"></reset-btn>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from "@/components/Modal/Modal.vue";
import Button from "@/components/Button.vue";

import { mapMutations } from "vuex";

export default {
  name: "ConfirmDialogue",
  components: {
    "popup-modal": PopupModal,
    "reset-btn": Button,
    "close-btn": Button
  },

  data() {
    return {
      title: undefined,
      message: undefined,
      theLastTenAnswers: []
    };
  },
  methods: {
    ...mapMutations("appState", ["EMPTY_LAST_TEN_ANSWERS_LIST"]),
    show(theModalContent = {}) {
      this.title = theModalContent.title;
      this.message = theModalContent.message;
      this.theLastTenAnswers = theModalContent.lastTenAnswers;
      this.$refs.popup.open();
    },
    confirm() {
      this.$refs.popup.close();
    },
    cancel() {
      this.$refs.popup.close();
    },
    reset() {
      const emtyLastAnswersList = [];
      this.EMPTY_LAST_TEN_ANSWERS_LIST(emtyLastAnswersList);
      this.theLastTenAnswers = [];
      this.message = "You have reseted the history.";
    }
  }
};
</script>

<style scoped>
li {
  font-size: 20px;
}

ul {
  list-style-type: none;
}

p {
  font-size: 20px;
}

.title-items {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>