const imageImport = import.meta.glob('../../assets/images/posts/write/*.png', { eager: true });

export const images = Object.keys(imageImport).reduce((acc, key) => {
    const path = key.replace('../../assets/images/posts/write/', '').replace('.png', '');
    acc[path] = imageImport[key].default;
    return acc;
}, {});