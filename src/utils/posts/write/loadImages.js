const imageImport = import.meta.glob('../../../assets/images/posts/write/feeling/*.png', { eager: true });

export const images = Object.keys(imageImport).reduce((acc, key) => {
    const path = key.replace('../../../assets/images/posts/write/feeling/', '').replace('.png', '');
    acc[path] = imageImport[key].default;
    return acc;
}, {});