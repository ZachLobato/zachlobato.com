<template>
  <main>
    <div class="flex">
      <div class="m-auto">
        <h2 class="text-2xl text-prussian-blue-700 dark:text-prussian-blue-300 text-center mb-4">Portfolio</h2>
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
            :sub-title="card.sub_title"></MaterialCard>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import MaterialCard from '../components/MaterialCard.vue'
import { onMounted, reactive } from 'vue';

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
      },
      {
        banner_video_url: 'https://i.imgur.com/N1tahcD.mp4',
        banner_dark_video_url: 'https://i.imgur.com/N1tahcD.mp4',
        under_construction: true,
        title: 'Oracle: A Lab Time Ago',
        sub_title: 'A time and space adventure',
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