<template lang="pug">
div#app.flex.flex-col.min-h-screen.min-w-7.max-w-lg.items-center.justify-start.bg-slate-600.p-6
  div.w-full.max-w-screen-md.flex.flex-col.items-center.mt-6
    Menu.relative.inline-block.text-left(as="div")
      div
        MenuButton(
          class="inline-flex items-center justify-center rounded-full px-5 py-3 bg-white bg-opacity-90 text-neutral-800 font-semibold text-lg shadow-md hover:bg-neutral-100 ring-1 ring-inset ring-neutral-200 focus:outline-none transition duration-200"
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
          class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white bg-opacity-95 shadow-lg ring-1 ring-black/5 focus:outline-none"
        )
          .py-1
            MenuItem(v-for="soundboard in soundboards" :key="soundboard.name" v-slot="{ active }")
              a(
                href="#"
                @click="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
                :class="'block px-4 py-2 text-base text-neutral-500 rounded hover:bg-neutral-500 transition', active ? 'bg-neutral-50 text-neutral-900' : 'text-white-700'"
) {{ soundboard.name }}
    div.mt-8.w-full.max-w-md.rounded-full.bg-white.bg-opacity-90.shadow-md.overflow-hidden
      img(
        v-if="state.heroImage"
        :src="state.heroImage"
        class="w-full h-full object-cover opacity-80"
        alt="Soundboard Hero Image"
      )

    div.flex.flex-col.items-center.justify-center.gap-4.mt-6(v-if="state.sounds")
      SoundboardButton(
        v-for="sound in state.sounds"
        :key="sound.path"
        :path="sound.path"
        :icon="sound.icon"
        :music="sound.music"
        :name="state.name"
      )

    div.mt-10(v-else)
      p.text-2xl.mb-3.text-neutral-800.font-semibold Select a Soundboard:
      div.flex.flex-wrap.items-center.justify-center.gap-6
        button(
          v-for="soundboard in soundboards"
          :key="soundboard.name"
          @click.prevent="selectSoundboard(soundboard)"
          class="relative w-32 h-32 rounded-lg overflow-hidden shadow-md bg-white hover:bg-neutral-50 focus:outline-none transition transform hover:scale-105"
        )
          img.absolute.inset-0.w-full.h-full.object-cover(
            :src="soundboard.heroImage"
            alt="{{ soundboard.name }} Image"
          )
          div.absolute.inset-0.bg-black/30.flex.items-center.justify-center.p-2
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
  @apply bg-slate-400;
  margin: 0;
  padding: 0;
}

.rounded-full, .rounded-lg, .rounded-xl {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}
</style>
