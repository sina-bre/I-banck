const importIcon = async (iconName) => {
  try {
    const module = await import(`@/components/icons/${iconName}.vue`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load icon: ${iconName}`, error);
    return null;
  }
};

export default importIcon;
