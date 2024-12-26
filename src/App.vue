<template lang="pug">
div#app.min-h-screen.bg-gradient-to-b.from-blue-100.to-purple-100.p-6
  div.container.mx-auto(v-if='state.name')
    Menu.relative.inline-block.text-left(as='div')
      div
        MenuButton.relative.px-4.py-2.bg-white.rounded-full.shadow-lg.transition-shadow.duration-200.flex.items-center.gap-2.text-purple-700.font-semibold(class='howver:shadow-xl gap-x-1.5 hover:bg-gray-50')
          | Options
          Icon.-mr-1.size-5.text-gray-400(aria-hidden='true' icon='mdi:chevron-down')
      transition(
        enter-active-class='transition ease-out duration-100'
        enter-from-class='transform opacity-0 scale-95'
        enter-to-class='transform opacity-100 scale-100'
        leave-active-class='transition ease-in duration-75'
        leave-from-class='transform opacity-100 scale-100'
        leave-to-class='transform opacity-0 scale-95'
      )
        MenuItems.absolute.right-0.z-50.mt-2.w-56.origin-top-right.rounded-md.bg-white.shadow-lg.ring-1.flex.flex-col.items-center.justify-center(
          class='ring-black/5 focus:outline-none'
        )
          .py-1
            MenuItem(v-for="soundboard in soundboards" v-slot='{ active }')
              a(
                href='#'
                :class="active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm'"
                @click="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
              ) {{ soundboard.name }} 
    .max-w-sm.bg-white.border.border-gray-200.rounded-lg(class='dark:bg-gray-800 dark:border-gray-700')
      img.m-0.p-0.w-full.rounded-t-lg.clear-reveal.object-cover(
        v-if='state.heroImage'
        :src='state.heroImage'
      )
    .flex.flex-col.items-center.justify-center
      SoundboardButton(
        v-if='state.sounds'
        v-for='sound in state.sounds'
        :path='sound.path'
        :icon='sound.icon'
        :music='sound.music'
      )
  div.container.mx-auto(v-else)
    button(
      v-for="soundboard in soundboards"
      @click.prevent="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
    )
      img.max-w-lg(:src='soundboard.heroImage')
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
  }
}
</script>

<style lang="scss">
html, body {
  @apply bg-darkgray;
}
</style>
