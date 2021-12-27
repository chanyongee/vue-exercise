<template>
  <div>
    <div>
      <ul>
        <li @click="changeMenu('Home')">Home</li>
        <li @click="changeMenu('About')">About</li>
        <li @click="changeMenu('Contact')">Contact</li>
      </ul>
    </div>

    <div>
      <keep-alive include="Home"> <!-- Home만 캐싱 -->
        <component :is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

export default {
  components: { Home, About, Contact },
  data() {
    return { currentView : 'Home'}
  }  ,
  methods: {
    changeMenu(view) {
      this.currentView = view;
    }
  },
}
</script>