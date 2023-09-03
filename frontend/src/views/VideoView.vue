<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'

const videoOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: 'https://streamingappbucket.s3.ap-south-1.amazonaws.com/movies/Dark_Haired_Girl_Pensive_Looks_at_Camera.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCmFwLXNvdXRoLTEiRjBEAiAbLXetNov7OUYBRpk0P3ERuYhjQnyDAzg7KSvID4lTBQIgOmbJuSniTGBMYHq%2BK0sJfjeOHarigv55BPG6TMR8BXkq5AIIGRAAGgwwNjcyNzA5MTU2MTkiDFJ2Nrp%2FTOSdlrZTairBAheGqXY8S%2B5%2Bftq%2BWzXUYGwUOIqlCV8%2FPKVPdDsbcIaU5C75UntK9QaXKJhrZ67Bc4UU%2BWJtpM%2BaMO3%2FOhHzuNhGandQFWy6NwNDBCyG6CfZnhxwKGaWb%2BKLR8Rwj9ZofLEmmqNN2UVwlHZNkYCtcz1Ofna4G750GULX2%2FzvCxCGRul0u6Khf7zdh1sz5DBjqPx%2B2iWsaYk6jnqJKrAC5CMd8RVFq16gLgGQ54%2BBxUXfQ0d46B41qd6w5kijaE4yd0uP%2B1kEVYQBFcFbgFhxJLQNP3BUYAgwpAL26FiYIVnvlx4WXj54pz2p4D1FHLrExtSqCo7oMmKVgJwaBW499ZS%2BTEpQo3t1HGTwBg%2BErDQuXv5Kgt9Fl2O448sApl2Wb9JXNCR5%2FgyH6Is05zeWmOZg0omTlXFHlrLGNqGSjP7UXTDpus2nBjq0AiVAv4NvI5OwGd2500vfyF6Gd6W0Qk%2F5T89OwBvGQPvL%2BmHXaRyouGIWSSUk60b5FFVrOqpZjtm1SF5cOfhqw2b9qPMMmtzkH07C%2BTxov9TnGL2dxIKPzBrF7f3s%2FOJVMt4NnwpaQCztpRI5zUbb1MWzF6BGDnnrJYk8QmWzwUHgEM0hSVC9l%2FTd2rvTOqT%2BX05xUaefRj7cFcZM3KjeFoX2jhdnNNEDMRsQC9JsiTLyLo1F8fqcr1sXuXxQn8oLc0g0JBJ3XkZ81xYZ7pVYy8gEGUid6KVkoklqlGVUbCyXUbHV5KtL0XsKzYsy3osTh%2F%2BJo5nc%2BBDgiTKIwrf2%2FawPgNu66f1g%2BEANTRUY1kCxM%2F11QONy40i18JHJ9e1EvelxPzWsam8RAMsW%2FZD5x%2FV2rWYb&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230902T164042Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAQ7KNIWYR2JSN2BXI%2F20230902%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c2b8c60462e683386471b237e2e46803ae0e7620335e84d47948cb0cc971a813',
      type: 'video/mp4'
    }
  ]
}
</script>

<template>
  <VideoPlayer :options="videoOptions" />
</template>
