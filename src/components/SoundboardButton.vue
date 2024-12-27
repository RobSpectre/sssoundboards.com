<template lang="pug">
button.push--skeuo(
  v-if='music'
  @click.prevent='playMusic(path)'
)
  .max-w-4xl.flex.items-center.justify-center
    Icon(:icon="icon" width="120" height="120" class="icon")
button.push--skeuo(
  v-else
  @click.prevent='playSound(path)'
)
  .max-w-4xl.flex.items-center.justify-center
    Icon(:icon="icon" width="120" height="120" class="icon")
</template>

<script>
import { Icon } from "@iconify/vue"

export default {
  name: 'SoundboardButton',
  components: {
    Icon
  },    
  props: {
    path: String,
    icon: String,
    name: String,
    music: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      audio: null
    }
  },
  methods: {
    playSound () {
      this.audio = new Audio(this.path)
      this.audio.play()

      this.$gtag.event('Sound', {
        event_category: this.name,
        event_label: this.path
      })
    },
    playMusic () {
      if (this.audio && !this.audio.paused && !this.audio.ended) {
        this.audio.load()

        this.$gtag.event('Music', {
          event_category: this.name,
          event_label: "Stop" 
        })
      } else {
        this.audio = new Audio(this.path)
        this.audio.play()

        this.$gtag.event('Music', {
          event_category: this.name,
          event_label: this.path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  @apply max-w-lg;
}
</style>
