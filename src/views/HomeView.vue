<template>
  <header class="h-screen flex flex-col justify-around">
    <div></div>
    <div class="flex flex-col justify-center">
      <h1 class="text-5xl text-center text-pistachio-200 mb-4">Zach Lobato</h1>
      <h2 class="text-xl text-center text-pistachio-200 mb-20">Husband, Father, Software Engineer</h2>
      <p class="text-lg text-cadet-gray-200 text-base text-center">I make products customers love.</p>
    </div>
    <ul v-if="false">
      <li><a href="#Products">Products</a></li>
    </ul>
    <ul class="flex flex-row space-x-8 justify-center">
      <li><a target="_blank" href="https://bsky.app/profile/zachlobato.bsky.social" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconBlueSky></IconBlueSky></a></li>
      <li><a target="_blank" href="https://github.com/ZachLobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconGithub></IconGithub></a></li>
      <li><a target="_blank" href="https://www.instagram.com/zachlobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconInstagram></IconInstagram></a></li>
      <li><a target="_blank" href="https://www.linkedin.com/in/zachlobato" class="dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"><IconLinkedIn></IconLinkedIn></a></li>
    </ul>
  </header>
  <main>
    <div class="flex">
      <div class="m-auto min-h-screen">
        <h2 id="Products" class="flex flex-col px-4 justify-center grid-row text-3xl text-pistachio-800 dark:text-pistachio-200 mb-6 h-16 bg-cadet-gray-200 dark:bg-cadet-gray-800 mx-0">
          Products
        </h2>
        <h3 class="flex flex-col px-4 justify-center grid-row text-lg text-pistachio-800 dark:text-pistachio-200 mb-8 mx-0">Latest Updated</h3>
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
  </main>
</template>


<script setup>
import MaterialCard from '../components/MaterialCard.vue'
import { onMounted, reactive } from 'vue';
import IconBlueSky from '../components/icons/IconBlueSky.vue'
import IconGithub from '../components/icons/IconGithub.vue'
import IconInstagram from '../components/icons/IconInstagram.vue'
import IconLinkedIn from '../components/icons/IconLinkedIn.vue'


// Define reactive state to store API data and loading state
const data = reactive({
  info: null,
  isLoading: true,
});

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

// Call fetchData on component mount
onMounted(fetchData);
</script>