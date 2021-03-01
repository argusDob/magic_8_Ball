<template>
  <div class="inputContainer">
    <div :class="'inputEffect ' + filled">
      <input
        type="text"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input',$event.target.value)"
        class="effect"
        @focus="show=!show"
        @blur="show=!show"
      >
      <label style="font-size:20px" :style="{color:color}">{{label}}</label>
      <span class="focusBorder" :style="focusBorder"></span>
    </div>
    <span class="inputHint" v-if="show">{{hint}}</span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: { type: String, required: false, default: "" },
    label: { type: String, required: false, default: "" },
    hint: { type: String, required: false, default: "hint" },
    placeholder: { type: String, required: false, default: "" },
    color: { type: String, required: false, default: "white" }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    filled() {
      if (!this.show && this.value) {
        return "has__content";
      }
      return "";
    },
    focusBorder() {
      return {
        "background-color": this.color
      };
    }
  }
};
</script>

<style scoped>

::placeholder {
  opacity: 0.4;
}

input[type="text"] {
  color: #555;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  outline: none;
  font-size: 20px;
  margin-top: 20px;
}

.inputContainer {
  width: 100%;
  padding: 0.5rem 0.5rem 0 0;
}

.inputEffect {
  float: left;
  width: 100%;
  margin: 1.5rem 0rem 1.5rem 0;
  position: relative;
}

.inputHint {
  float: left;
  width: 100%;
  margin: -1.2rem 0 0 0;
  position: relative;
  font-size: 0.8rem;
  opacity: 0.6;
}

.effect {
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}

.effect ~ .focusBorder {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: indigo;
  transition: 0.4s;
}

.effect:focus ~ .focusBorder,
.has-content.effect ~ .focusBorder {
  width: 100%;
  transition: 0.4s;
}

.effect ~ label {
  position: absolute;
  left: 0;
  width: 100%;
  top: -1.3rem;
  color: #aaa;
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
}

.effect:focus ~ label,
.hasContent.effect ~ label {
  top: -1rem;
  font-size: 12px;
  color: indigo;
  transition: 0.3s;
}
</style>