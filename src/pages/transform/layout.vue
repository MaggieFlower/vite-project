<template>
    <section>
        <div class="mg-transform">Normal</div>
        <div class="mg-transform mg-transform-rotated">Rotated</div>
    </section>
</template>
<style lang="scss">
@import '@/styles/bem.scss';
// 还未得出mdn上关于rotate的结论
@include b(transform) {
    width: 80px;
    height: 80px;
    background-color: skyblue;
    &-rotated {
        transform: rotate(45deg); /* Equal to rotateZ(45deg) */
        background-color: pink;
    }
}

// @include b(rotated) {
//   transform: rotate(45deg); /* Equal to rotateZ(45deg) */
//   background-color: pink;
// }
</style>
