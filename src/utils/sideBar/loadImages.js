const imageImport = import.meta.glob('../../assets/images/sideBar/*.png', { eager: true });

export const images = Object.keys(imageImport).reduce((acc, key) => {
    const path = key.replace('../../assets/images/sideBar/', '').replace('.png', '');
    acc[path] = imageImport[key].default;
    return acc;
}, {});