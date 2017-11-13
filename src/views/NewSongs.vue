<template>
    <div class="new-song">
      <div class="slide">
        <SlideShow></SlideShow>
      </div>
    </div>
</template>

<script>
  import SlideShow from '../components/SlideShow'
    export default {
        data() {
            return {

            }
        },
      components:{SlideShow},

    }
</script>

<style>
.slide{
  width: 100%;
  height:auto;
}

</style>
