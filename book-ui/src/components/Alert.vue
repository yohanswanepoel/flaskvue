<template>
  <div>
    <b-alert :variant="type" show dismissible fade>{{ message }}</b-alert>
    <br>
  </div>
</template>

<script>
export default {
  props: ['message', 'type'],
};
</script>
