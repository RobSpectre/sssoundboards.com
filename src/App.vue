<template lang="pug">
div#app.flex.flex-col.min-h-screen.items-center.justify-start.bg-sky-100.p-4
  div.w-full.max-w-screen-md.flex.flex-col.items-center.mt-4
    Menu.relative.inline-block.text-left(as="div")
      div
        MenuButton(
          class="inline-flex items-center justify-center rounded-full px-4 py-2 bg-white text-sky-800 font-semibold text-lg shadow-md hover:bg-sky-50 ring-1 ring-inset ring-sky-200 focus:outline-none transition"
        )
          | Choose a Soundboard
          Icon(icon="mdi:chevron-down" width="24" height="24")
      transition(
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      )
        MenuItems(
          class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        )
          .py-1
            MenuItem(v-for="soundboard in soundboards" :key="soundboard.name" v-slot="{ active }")
              a(
                href="#"
                @click="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
                :class="['block px-4 py-2 text-base', active ? 'bg-sky-50 text-sky-900 outline-none' : 'text-gray-700']"
              ) {{ soundboard.name }}
    div.mt-6.w-full.max-w-md.rounded-xl.bg-white.shadow-md.overflow-hidden
      img(
        v-if="state.heroImage"
        :src="state.heroImage"
        class="w-full h-48 object-cover"
      )
    div.flex.flex-col.items-center.justify-center.gap-4.mt-4(
      v-if="state.sounds"
    )
      SoundboardButton(
        v-for="sound in state.sounds"
        :key="sound.path"
        :path="sound.path"
        :icon="sound.icon"
        :music="sound.music"
        :name="state.name"
      )
    div.mt-8(v-else)
      p.text-lg.mb-2.text-sky-800.font-semibold Select a Soundboard:
      div.flex.flex-wrap.items-center.justify-center.gap-4
        button(
          v-for="soundboard in soundboards"
          :key="soundboard.name"
          @click.prevent="selectSoundboard(soundboard)"
          class="relative w-32 h-32 rounded-lg overflow-hidden shadow-md bg-white hover:bg-sky-50 focus:outline-none transition"
        )
          img.absolute.inset-0.w-full.h-full.object-cover(
            :src="soundboard.heroImage"
          )
          div.absolute.inset-0.bg-black/20.flex.items-center.justify-center.p-2
            span.text-white.font-semibold.text-center {{ soundboard.name }}
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useStore } from '@/store/index.js'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Icon } from '@iconify/vue'

import soundboards from '@/assets/data/soundboards.json'

import SoundboardButton from '@/components/SoundboardButton.vue'

export default {
  name: 'App',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    SoundboardButton,
    Icon
  },
  data () {
    return {
      soundboards: soundboards
    }
  },
  computed: {
    ...mapGetters(useStore, ['getState']),
    state () {
      return this.getState
    }
  },
  methods: {
    ...mapActions(useStore, ['setState']),
    selectSoundboard (soundboard) {
      this.setState(soundboard.name, soundboard.heroImage, soundboard.sounds)

      this.$gtag.event('Select Soundboard', {
        event_category: soundboard.name,
      })
    }
  }
}
</script>

<style lang="scss">
html, body {
  @apply bg-darkgray;
  margin: 0;
  padding: 0;
}

.bg-sky-100 {
  background-color: #e0f2fe; // Light pastel sky color
}

.rounded-full, .rounded-lg, .rounded-xl {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}
</style>
