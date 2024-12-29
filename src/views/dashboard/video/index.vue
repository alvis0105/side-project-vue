<template>
  <div>
    <!-- 添加視頻播放器 -->
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    >
      <source
        src="https://www.w3schools.com/html/movie.mp4"
        type="video/mp4"
      >
      <source
        src="https://www.w3schools.com/html/movie.ogg"
        type="video/ogg"
      >
      你的瀏覽器不支援 video 標籤。
    </video>

    <video
      ref="videoPlayer2"
      class="video-js vjs-default-skin ms-5"
      width="800"
      height="600"
      controls
      preload="auto"
    >
      <source
        src="https://www.w3schools.com/html/movie.mp4"
        type="video/mp4"
      >
      <source
        src="https://www.w3schools.com/html/movie.ogg"
        type="video/ogg"
      >
      你的瀏覽器不支援 video 標籤。
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import 'video.js/dist/video-js.css'
import videoJs from 'video.js'

// 使用 ref 來引用 video 元素
const videoPlayer = ref(null)
const videoPlayer2 = ref(null)

onMounted(() => {
  nextTick(() => {
    // 初始化 video.js 播放器
    const player = videoJs(videoPlayer.value, {
      controls: true,
      autoplay: false, // 防止自動播放
      preload: 'auto',
      fluid: false, // 禁用 fluid，避免自適應尺寸
    })

    // 監聽播放結束事件
    player.on('ended', function() {
      alert('視頻播放完成！')
    })

        // 初始化 video.js 播放器
    const player2 = videoJs(videoPlayer2.value, {
      controls: true,
      autoplay: false, // 防止自動播放
      preload: 'auto',
      width: '800',
      height: '600',
      fluid: false, // 禁用 fluid，避免自適應尺寸
    })

    // 監聽播放結束事件
    player2.on('ended', function() {
      alert('視頻播放完成！')
    })
  })
})
</script>
