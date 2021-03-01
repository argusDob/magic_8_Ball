<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Josefin Sans;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

p {
 font-size: 20px;
}

@media (min-width: 576px) {
  #app {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  #app {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  #app {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  #app {
    max-width: 1140px;
  }
}
</style>
