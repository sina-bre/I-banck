import { ref } from 'vue';

const text = ref('');
const type = ref('');
const visible = ref(false);
const show = ref(false);

export default function useToast() {
  const showToast = (state, message, duration = 3000) => {
    text.value = message;
    type.value = state;
    visible.value = true;
    show.value = true;
    setTimeout(() => {
      hideToast();
    }, duration);
  };

  const hideToast = () => {
    visible.value = false;
    setTimeout(() => {
      show.value = false;
    }, 700);
  };

  return {
    text,
    type,
    visible,
    show,
    showToast,
    hideToast
  };
}
