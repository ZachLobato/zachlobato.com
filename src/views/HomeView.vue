<template>
  <main>
    <div class="flex">
      <div class="m-auto">
        <h2 class="text-2xl text-prussian-blue-700 dark:text-prussian-blue-300 text-center mb-4">Portfolio</h2>
        <div class="flex justify-center gap-4 flex-wrap">
          <MaterialCard
            banner-video-url="https://i.imgur.com/BB7MgdJ.mp4"
            banner-dark-video-url="https://i.imgur.com/rlIj59R.mp4"
            github-url="https://www.github.com"
            notion-url="https://riticulous.notion.site/Zach-Lobato-Website-a1e47722d50a44688f6ff9211d7d25cb"
            title="Personal Website"
            sub-title="For the latest on me"></MaterialCard>
          <MaterialCard
            banner-video-url="https://i.imgur.com/N1tahcD.mp4"
            banner-dark-video-url="https://i.imgur.com/N1tahcD.mp4"
            github-url="https://www.github.com"
            title="Oracle: A Lab Time Ago"
            sub-title="A time and space adventure"></MaterialCard>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import MaterialCard from '../components/MaterialCard.vue'
</script>