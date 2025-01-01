<template lang="pug">
Drawer(v-if="state.name")
  Container
    Card(
      class="flex flex-col min-h-screen min-w-7 max-w-lg items-center py-6"
      :class="cn('w-[380px]', $attrs.class ?? '')"
    )
      CardHeader(v-if='state.name')
        CardTitle
          DrawerTrigger(class='text-3xl flex items-center justify-center')
            Icon.mr-5(
              icon='mdi:hamburger-menu'
              width="32"
              height="32"
            )
            Avatar(class='w-32 h-32')
              AvatarImage(:src='state.heroImage')
            span.ml-5.uppercase {{ state.name }}
        CardContent
          div.flex.flex-col.items-center.justify-center.gap-4.mt-6(v-if="state.sounds")
            SoundboardButton(
              v-for="sound in state.sounds"
              :key="sound.path"
              :path="sound.path"
              :icon="sound.icon"
              :music="sound.music"
              :name="state.name"
            )
  DrawerContent
    .mx-auto.w-full
      DrawerHeader
        DrawerTitle(class="flex items-center justify-center")
          span.uppercase Choose your soundboard
      Carousel(class='mx-16')
        CarouselContent
          CarouselItem(
            v-for="soundboard in soundboards"
            :key='soundboard.name'
            class="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            @click="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
          )
            .p-1.flex.items-center.justify-center
              DrawerClose
                Card(class='max-w-sm')
                  CardContent(class='flex flex-col aspect-square content-start p-3')
                    Avatar(class='w-64 h-64')
                      AvatarImage(:src='soundboard.heroImage')
                    h2.text-3xl.text-bold.uppercase {{ soundboard.name }}
        CarouselPrevious
        CarouselNext
Container(v-else)
  .max-w-sm
    .flex-flex-col.items-center.justify-center
      Card(class='max-w-sm p-6' v-for="soundboard in soundboards")
        CardContent(class='flex flex-col aspect-square items-center justify-center p-3')
          a(
            href="#"
            @click.prevent="setState(soundboard.name, soundboard.heroImage, soundboard.sounds)"
            class='flex flex-col items-center justify-center'
          )
            Avatar(class='w-64 h-64')
              AvatarImage(:src='soundboard.heroImage')
            h2.text-3xl.text-bold.uppercase {{ soundboard.name }}
</template>

<script>
import { mapGetters, mapActions } from 'pinia'
import { useStore } from '@/store/index.js'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { Icon } from '@iconify/vue'

import soundboards from '@/assets/data/soundboards.json'

import SoundboardButton from '@/components/SoundboardButton.vue'
import Container from '@/components/Container.vue'


export default {
  name: 'App',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    SoundboardButton,
    Icon,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Container,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
  },
  setup () {
    return {
      cn
    }
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
