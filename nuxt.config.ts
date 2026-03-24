// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css:[
    '~/assets/styles/main.css',
  ],
  components:[
    {
      path:'~/components',
    },
    {
      path:'~/features/snake/components',
      prefix:'Snake',
      pathPrefix:true,
    }
  ],
})