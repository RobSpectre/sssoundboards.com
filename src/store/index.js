import { defineStore } from 'pinia'

function state () {
  return {
    heroImage: '',
    name: '',
    sounds: []
  }
}

const getters = {
  getState (state) {
    return state
  }
}

const actions = {
  setState (name, heroImage, sounds) {
    this.heroImage = heroImage
    this.name = name
    this.sounds = sounds
  }
}

export const useStore = defineStore({
  id: 'soundboard',
  state: state,
  getters: getters,
  actions: actions,
  persist: true
})
