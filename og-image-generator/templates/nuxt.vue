<!-- templates/nuxt.vue -->
<!-- Copy to your Nuxt 3 project. Requires nuxt-og-image module. -->
<!-- Installation: npm install nuxt-og-image -->
<!--
  This template is a basic starting point. For richer visual styles, adapt
  the Satori JSX from og-image-generator/templates/{style}.tsx — all 6 styles
  (terminal, magazine, swiss, pixel, brutalist, newspaper) are Satori-compatible.
  See og-image-generator/references/style-system.md for full specs.
-->

<!-- Option A: Use defineOgImage composable (per-page) -->

<script setup lang="ts">
// pages/blog/[slug].vue
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`);

defineOgImage({
  title: post.value?.title ?? 'Blog',
  description: post.value?.excerpt,
  // nuxt-og-image renders this page's component as the OG image
});
</script>

<!-- Option B: Custom template component (global) -->

<!--
  Create components/OgImage/MyTemplate.vue.
  Rendered by Satori when generating OG images.
  Same Satori CSS constraints apply (flexbox only, no grid, no gap).

  For the 6 visual styles, adapt the JSX from og-image-generator/templates/
  to Vue's :style binding syntax. Example for Swiss Minimal below:
-->

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#fafafa',
      fontFamily: 'Inter, sans-serif',
      color: '#0a0a0a',
      padding: '80px 100px',
    }"
  >
    <!-- Swiss Minimal: light display title -->
    <div
      :style="{
        fontSize: '80px',
        fontWeight: '300',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }"
    >
      {{ title }}
    </div>

    <!-- Subtitle -->
    <div
      v-if="description"
      :style="{
        fontSize: '28px',
        fontWeight: '400',
        color: '#666',
        lineHeight: 1.5,
        marginTop: '20px',
        maxWidth: '750px',
      }"
    >
      {{ description }}
    </div>

    <!-- Accent rule -->
    <div
      :style="{
        width: '900px',
        height: '2px',
        background: '#0033ff',
        marginTop: '36px',
        marginBottom: '36px',
      }"
    />

    <!-- Spacer -->
    <div :style="{ flex: 1 }" />

    <!-- Domain -->
    <div
      :style="{
        fontSize: '24px',
        fontWeight: '500',
        color: '#bbb',
        textAlign: 'right',
      }"
    >
      yoursite.com
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<!--
  nuxt.config.ts:
  export default defineNuxtConfig({
    modules: ['nuxt-og-image'],
    ogImage: {
      fonts: ['Inter:400', 'Inter:700'],
      defaults: {
        component: 'MyTemplate',
        width: 1200,
        height: 630,
      },
    },
  })
-->
