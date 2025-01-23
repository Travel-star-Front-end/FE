const imageImport = import.meta.glob('../../../assets/images/posts/edit/*.png', { eager: true });

export const images = Object.keys(imageImport).reduce((acc, key) => {
    const path = key.replace('../../../assets/images/posts/edit/', '').replace('.png', '');
    acc[path] = imageImport[key].default;
    return acc;
}, {});