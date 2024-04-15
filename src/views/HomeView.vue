<template>
  <div class="lg:grid lg:grid-cols-6">
    <header class="lg:col-start-2 lg:col-span-2 h-screen flex flex-col justify-around lg:justify-between lg:mt-20 lg:fixed lg:right-1/2 lg:w-1/3">
      <div v-if="!isLargeScreen"></div>
      <div class="flex flex-col justify-center">
        <h1 class="text-5xl text-center lg:text-left dark:text-pistachio-200 text-pistachio-800 mb-4 lg:mb-6">Zach Lobato</h1>
        <h2 class="text-xl text-center lg:text-left dark:text-pistachio-200 text-pistachio-800 mb-20 lg:mb-6">Husband, Father, Software Engineer</h2>
        <p class="text-lg dark:text-cadet-gray-200 text-cadet-gray-800 text-base text-center lg:text-left lg:mb-32">I make products customers love.</p>
      </div>
      <ul v-if="isLargeScreen" class="dark:text-cadet-gray-200 text-cadet-gray-800 ">
        <li><a href="#products">Products</a></li>
        <li><a href="#experience">Experience</a></li>
      </ul>
      <ul class="flex flex-row space-x-8 justify-center lg:justify-start lg:content-end lg:mb-40">
        <li><a target="_blank" href="https://bsky.app/profile/zachlobato.bsky.social" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconBlueSky></IconBlueSky></a></li>
        <li><a target="_blank" href="https://github.com/ZachLobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconGithub></IconGithub></a></li>
        <li><a target="_blank" href="https://www.instagram.com/zachlobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconInstagram></IconInstagram></a></li>
        <li><a target="_blank" href="https://www.linkedin.com/in/zachlobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconLinkedIn></IconLinkedIn></a></li>
      </ul>
    </header>
    <main class="lg:col-start-4 lg:col-span-2">
      <div class="flex" id="products">
        <div class="block m-auto min-h-screen w-full">
          <h2 v-show="!isLargeScreen"
            :class="{
              'bg-cadet-gray-200': true,
              'dark:bg-cadet-gray-800': true,
              'dark:text-pistachio-200': true,
              'flex-col': true,
              'flex': true,
              'grid-row': true,
              'h-16': true,
              'justify-center': true,
              'mx-0': true,
              'px-4': true,
              'sticky': true,
              'text-3xl': true,
              'text-pistachio-800': true,
              'top-0': true,
              'z-10': true,
            }"
          >
            Products
          </h2>
          <h3 class="flex flex-col px-4 justify-center grid-row text-lg text-pistachio-800 dark:text-pistachio-200  mt-6 lg:mt-20 mb-8 mx-0">Latest Updated</h3>
          <div class="flex justify-center gap-4 flex-wrap">
            <div v-if="data.isLoading">Loading...</div>
            <MaterialCard v-else v-for="(card, index) in data.info" :key="index"
              :banner-video-url="card.banner_video_url"
              :banner-dark-video-url="card.banner_dark_video_url"
              :launch-url="card.launch_url"
              :github-url="card.github_url"
              :notion-url="card.notion_url"
              :under-construction="card.under_construction"
              :title="card.title"
              :updated-at="card.updated_at"
              :sub-title="card.sub_title"></MaterialCard>
          </div>
        </div>
      </div>
      <div class="flex w-full" id="experience">
        <div class="block m-auto min-h-screen w-full">
          <h2 v-show="!isLargeScreen" class="sticky top-0 flex flex-col px-4 justify-center grid-row text-3xl text-pistachio-800 dark:text-pistachio-200 mb-6 h-16 w-full bg-cadet-gray-200 dark:bg-cadet-gray-800 mx-0">
            Experience
          </h2>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import MaterialCard from '../components/MaterialCard.vue'
import { onMounted, onUnmounted, reactive, ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import IconBlueSky from '../components/icons/IconBlueSky.vue'
import IconGithub from '../components/icons/IconGithub.vue'
import IconInstagram from '../components/icons/IconInstagram.vue'
import IconLinkedIn from '../components/icons/IconLinkedIn.vue'

const route = useRoute();
const showProducts = ref(false);
const showExperience = ref(false);

function scrollToElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

watchEffect(() => {
  const hash = route.hash;
  showProducts.value = hash.includes('#products');
  showExperience.value = hash.includes('#experience');

  if (showProducts.value) {
    nextTick(() => {
      scrollToElementById('products');
    });
  } else if (showExperience.value) {
    nextTick(() => {
      scrollToElementById('experience');
    });
  }
});

// Define reactive state to store API data and loading state
const data = reactive({
  info: null,
  isLoading: true,
});

const isLargeScreen = ref(false);

function checkScreenSize() {
  const query = window.matchMedia('(min-width: 1024px)');
  isLargeScreen.value = query.matches;
  query.addEventListener('change', (e) => {
    isLargeScreen.value = e.matches;
  });

  // Clean-up function to remove event listener when component unmounts
  onUnmounted(() => {
    query.removeEventListener('change', (e) => {
      isLargeScreen.value = e.matches;
    });
  });
}

// Function to fetch data from an API
const fetchData = async () => {

  try {
    // todo: connect to real api
    // const response = await fetch('https://api.example.com/data');
    // const jsonData = await response.json();
    data.info = [
      {
        banner_video_url: 'https://i.imgur.com/BB7MgdJ.mp4',
        banner_dark_video_url: "https://i.imgur.com/rlIj59R.mp4",
        launch_url: "https://zachlobato.com",
        github_url: "https://github.com/ZachLobato/zachlobato.com-website",
        notion_url: "https://riticulous.notion.site/Zach_Lobato_Website_a1e47722d50a44688f6ff9211d7d25cb",
        title: "Personal Website",
        sub_title: "For the latest on me",
        updated_at: "2024-04-05",
      },
      {
        banner_video_url: 'https://i.imgur.com/N1tahcD.mp4',
        banner_dark_video_url: 'https://i.imgur.com/N1tahcD.mp4',
        under_construction: true,
        title: 'Oracle: A Lab Time Ago',
        sub_title: 'A time and space adventure',
        updated_at: "2024-02-18",
      }
    ]
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    data.isLoading = false; // Update loading state
  }
};

onMounted(() => {
  fetchData();
  checkScreenSize();
  nextTick(() => {
    const hash = window.location.hash;
    showProducts.value = hash.includes('#products');
    showExperience.value = hash.includes('#experience');
    if (showProducts.value) {
      scrollToElementById('products');
    } else if (showExperience.value) {
      scrollToElementById('experience');
    }
  });
});

</script>