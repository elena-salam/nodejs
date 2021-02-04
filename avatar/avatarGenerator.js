const Avatar = require('avatar-builder');
const {promises: fsPromises} = require('fs');
const path = require('path');

async function createAvatar(){
    const avatar = Avatar.squareBuilder(128);
    const avatarIcon = await avatar.create('gabriel');
    const avatarName = `${Date.now()}.png`;
    const avatarPath = path.join('tmp', avatarName);
    const finalAvatarPath = path.join('public', 'images', avatarName); 
    await fsPromises.writeFile(avatarPath, avatarIcon); //записывыаем файл(куда? что?)
    await fsPromises.copyFile(avatarPath, finalAvatarPath) //копируем(откуда? куда?)
    await fsPromises.unlink(avatarPath) //очищаем tmp
    return avatarName;
}

module.exports = createAvatar;
