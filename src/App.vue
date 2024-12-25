<template lang="pug">
div#app.bg-darkgray.relative
  div.container.mx-auto(v-if='state.name')
    Menu.relative.inline-block.text-left(as='div')
      div
        MenuButton.inline-flex.w-full.justify-center.rounded-md.bg-white.px-3.py-2.text-sm.font-semibold.text-gray-900.shadow-sm.ring-1.ring-inset.ring-gray-300(class='gap-x-1.5 hover:bg-gray-50')
          | Options
          ChevronDownIcon.-mr-1.size-5.text-gray-400(aria-hidden='true')
      transition(
        enter-active-class='transition ease-out duration-100'
        enter-from-class='transform opacity-0 scale-95'
        enter-to-class='transform opacity-100 scale-100'
        leave-active-class='transition ease-in duration-75'
        leave-from-class='transform opacity-100 scale-100'
        leave-to-class='transform opacity-0 scale-95'
      )
        MenuItems.absolute.right-0.z-50.mt-2.w-56.origin-top-right.rounded-md.bg-white.shadow-lg.ring-1(
          class='ring-black/5 focus:outline-none'
        )
          .py-1
            MenuItem(v-for="soundboard in soundboards" v-slot='{ active }')
              a(
                href='#'
                :class="active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm'"
                @click.prevent="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
              ) {{ soundboard.name }} 
    .max-w-sm.bg-white.border.border-gray-200.rounded-lg(class='dark:bg-gray-800 dark:border-gray-700')
      img.m-0.p-0.w-full.rounded-t-lg.clear-reveal.object-cover(
        v-if='state.heroImage'
        :src='state.heroImage'
      )
    button.push--skeuo(
      v-if='state.sounds'
      v-for='sound in state.sounds'
      @click.prevent='playSound(sound.path)'
    )
      .max-w-32.mx-auto
        component(:is='icons[sound.icon]')
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
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import * as Icons from '@heroicons/vue/24/outline'

import soundboards from '@/assets/data/soundboards.json'

export default {
  name: 'App',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon
  },
  data () {
    return {
      soundboards: soundboards,
      icons: Icons
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
    playSound () {
      var audio = new Audio('/sounds/les_toreadors.mp3')
      audio.play()
    }
  }
}
</script>

<style lang="scss">
html, body {
  @apply bg-darkgray;
}
</style>
