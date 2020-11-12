<template>
    <div class='logo'>
        <a href="#">
            <img :src="LogoImg" />
        </a>
    </div>
</template>

<script>
import LogoImg from '../public/fort.png';

export default {
  name: 'logo',
  data() {
    return {
      LogoImg,
    };
  },
};
</script>
