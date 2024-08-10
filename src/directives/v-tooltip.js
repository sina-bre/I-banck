export default {
  mounted(el, binding) {
    el.setAttribute('title', binding.value);
    el.style.position = 'relative';

    const tooltip = document.createElement('div');
    tooltip.innerText = binding.value;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'black';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.bottom = '100%';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.visibility = 'hidden';
    el.appendChild(tooltip);

    el.addEventListener('mouseenter', () => {
      tooltip.style.visibility = 'visible';
    });
    el.addEventListener('mouseleave', () => {
      tooltip.style.visibility = 'hidden';
    });
  }
};
