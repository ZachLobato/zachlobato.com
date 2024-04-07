<template>
  <article role="article" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @touchend="isHovered = !isHovered" class="card rounded-lg bg-cadet-gray-100 dark:bg-cadet-gray-900 w-80 h-64 drop-shadow-[0_0_4px_rgba(0,0,0,0.75)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]">
    <section class="w-80 h-64 overflow-hidden">
      <header class="drop-shadow-[0_4px_2px_rgba(255,255,255,0.25)] dark:drop-shadow-[0_4px_2px_rgba(0,0,0,0.75)]">
        <img
          v-if="(bannerImageUrl || bannerDarkImageUrl) && !bannerVideoUrl" :aria-expanded="!isHovered" :alt="`Banner for ${title}`" :class="{
          'card-image': true,
          'rounded-lg': true,
          'object-center': true,
          'object-cover': true,
          'w-full': true,
          'h-32': isHovered,
          'h-48': !isHovered,
          'transition-all': true,
        }" :src="prefersDark ? bannerDarkImageUrl : bannerImageUrl" />
        <video
          tabindex="-1"
          v-if="bannerVideoUrl"
          :aria-expanded="!isHovered"
          :class="{
            'card-video': true,
            'rounded-lg': true,
            'object-center': true,
            'object-cover': true,
            'w-full': true,
            'h-32': isHovered,
            'h-48': !isHovered,
            'transition-all': true,
          }"
          :src="prefersDark ? bannerDarkVideoUrl : bannerVideoUrl"
          loop
          autoplay
          muted
          playsinline>
        </video>
      </header>
      <div class="card-content px-4 py-2 flex flex-col justify-between h-32">
        <div>
          <h3 class="card-title text-2xl font-semibold dark:text-prussian-blue-200 text-prussian-blue-800">{{ title }}</h3>
          <p class="card-subtitle text-xs text-cadet-gray-500"> {{ subTitle }}</p>
        </div>
        <footer class="grid grid-cols-2 content-around">
          <section class="icons grid grid-cols-3 gap-2 content-around">
            <span v-if="underConstruction" :title="`Under Construction (${title})`">
              <ConstructionWorker
                class="construction"
                tabindex="-1"
                @focus="isHovered = true"
                @blur="isHovered = false"
                :alt="`${title} is still under construction`"
                :aria-label="`${title} is still under construction`"></ConstructionWorker>
            </span>
            <a class="inline-block dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"
              v-if="launchUrl"
              :href="launchUrl"
              target="_blank"
              rel="noopener noreferrer"
              :alt="`Launch link to ${title} project`"
              :aria-label="`Launch link to ${title} project`"
              :title="`Launch (${title})`">
              <MaterialRocketLaunchOutline class="launch" tabindex="0" @focus="isHovered = true" @blur="isHovered = false"></MaterialRocketLaunchOutline>
            </a>
            <a class="inline-block dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"
              v-if="githubUrl"
              :href="githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              :alt="`GitHub link to ${title} project`"
              :aria-label="`GitHub link to ${title} project`"
              :title="`GitHub (${title})`">
              <BiGithub class="github" tabindex="0" @focus="isHovered = true" @blur="isHovered = false"></BiGithub>
            </a>
            <a class="inline-block dark:text-prussian-blue-200 text-prussian-blue-800 hover:text-mint-green-800 dark:hover:text-mint-green-200"
              v-if="notionUrl"
              :href="notionUrl"
              target="_blank"
              rel="noopener noreferrer"
              :alt="`Notion link to ${title} project`"
              :aria-label="`Notion link to ${title} project`"
              :title="`Notion (${title})`">
              <CibNotion class="notion" tabindex="0" @focus="isHovered = true" @blur="isHovered = false"></CibNotion>
            </a>
          </section>
          <div class="text-xs dark:text-prussian-blue-200 text-prussian-blue-800 place-self-end">{{updatedAt}}</div>
        </footer>
      </div>
    </section>
  </article>
</template>

<script setup>
import CibNotion from './icons/IconCibNotion.vue'
import BiGithub from './icons/IconBiGithub.vue'
import MaterialRocketLaunchOutline from './icons/IconMaterialRocketLaunchOutline.vue'
import ConstructionWorker from './icons/IconEmConstructionWorker.vue'
import { watchEffect, onUnmounted } from 'vue';

const isHovered = ref(false);
const prefersDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

watchEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  /* v8 ignore next */
  const handler = (e) => {
    /* v8 ignore next */
    prefersDark.value = e.matches;
  };
  // Listen for changes
  mediaQuery.addEventListener('change', handler);

  // Cleanup on component unmount
  /* v8 ignore next */
  onUnmounted(() => {
    /* v8 ignore next */
    mediaQuery.removeEventListener('change', handler);
  });
});

</script>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
    bannerImageUrl: {
      type: String,
      required: false,
    },
    bannerDarkImageUrl: {
      type: String,
      required: false,
    },
    bannerVideoUrl: {
      type: String,
      required: false,
    },
    bannerDarkVideoUrl: {
      type: String,
      required: false,
    },
    launchUrl: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: false,
    },
    notionUrl: {
      type: String,
      required: false,
    },
    underConstruction: {
      type: Boolean,
      required: false,
    },
  },
});
</script>
