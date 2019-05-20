<template>
  <div class="home">
    <div class="content d-flex justify-content-between home_main pt-5">
      <div class="info-1">
        <img src="~@/assets/images/info-1.png" alt v-if="locale == 'zh'">
        <img src="~@/assets/images/info-1-en.png" alt v-else>
      </div>

      <div class="info-2" style="position: relative;">
        <div class="bg_pos"></div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="key in 5" :key="key">
            <img
              :src="require(`../assets/images/${locale == 'zh'? key+'.png': 'en-'+key+'.jpg'}`)"
              alt
            >
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- <div class="b-2 content">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfPNQ_gn3jDOYEjdc9fOSFkjY8-J58u6CizZUXDjnBs8J-AYQ/viewform"
        target="_bank"
      >
        <img  :src="require(`../assets/images/b-2${locale == 'zh'? '': '-en'}.png`)">
      </a>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  swiperOption: any = {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    autoplay: true,
    spaceBetween: 20,
    // autoplay: {
    //   disableOnInteraction: false,
    //   waitForTransition: false
    // },
    speed: 200,
    slidesPerView: 'auto'
  };

  get locale() {
    return this.$i18n.locale || 'en';
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/pc-banner.jpg");
  background-position: center top;
  background-size: cover;
  display: flex;
  align-items: center;
  // justify-content: center;
}
.info-1 {
  width: 594px;
  height: 383px;
}
.info-2 {
  width: 661px;
  height: 487px;
  margin-left: 50px;
  overflow: hidden;
}
.bg_pos {
  position: absolute;
  width: 247px;
  height: 472px;
  background: url("~@/assets/images/info-bg.png") no-repeat;
  left: 208px;
  top: 0;
  z-index: 99;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  margin-top: 27px;
  width: 208px !important;
  height: 425px !important;

  img {
    height: 100%;
    width: 100%;
  }
}
.home_main {
  // padding-top: 13%;
  // transform: scale(0.8)
  @media screen and (max-width: 1200px) {
    zoom: 0.9;
  }
  @media screen and (max-width: 1100px) {
    zoom: 0.8;
  }
  @media screen and (max-width: 1000px) {
    zoom: 0.7;
  }
  @media screen and (max-width: 900px) {
    zoom: 0.6;
  }
}
.b-2 {
  a {
    width: 160px;
    height: 40px;
    float: right;
    margin-top: 22px;
    margin-right: 242px;
  }
}
</style>

