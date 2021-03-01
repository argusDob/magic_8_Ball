<template>
  <div id="messages" v-if="message" :class="[alertClass]">
    <p style="margin-left:5px;">{{ message }}</p>
    <a href="#" class="close" @click="REMOVE"></a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("notification", ["message", "alertClass"])
  },
  methods: {
    ...mapMutations("notification", ["REMOVE"])
  }
};
</script>


<style scoped>
.warning {
  background-color: #f0ad4e;
}

.danger {
  background-color: #d9534f;
}

.success {
  background-color: #5cb85c;
}

#messages {
  display: flex;
  justify-content: space-between;
  height: 2em;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.close {
  width: 32px;
  height: 32px;
  opacity: 0.3;
}

.close:hover {
  opacity: 1;
}

.close:before,
.close:after {
  position: absolute;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
}
</style>