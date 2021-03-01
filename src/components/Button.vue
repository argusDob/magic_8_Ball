<template>
  <div>
    <button :class="theClass" :id="id" :disabled="disabled">{{ name }}</button>
  </div>
</template>

<script>
export default {
  props: {
    theClass: { type: String },
    id: { type: String },
    name: { type: String },
    disabled:{ type: String }
  }
};
</script>


<style scoped>
.btn {
  padding: 0.5em 1em;
  background-color: #8eb5e0;
  border: 2px solid blue;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

.btn:hover {
  background-color: #585858;
}

.btn:hover {
  background-color: #585858;
}

#submitBtn {
  width: 100%;
}
</style>