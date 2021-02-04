const Avatar = require('avatar-builder');
const {promises: fsPromises} = require('fs');
const path = require('path');

async function createAvatar(){
    const avatar = Avatar.female8bitBuilder(128);
    const avatarIcon = avatar.create('gabriel');
    const avatarName = `${Date.now().png}`;
    const avatarPath = path.join('tmp', avatarName);
    const finalAvatarPath = path.join('public', 'images', avatarName); 
    await fs.Promises.writeFile(avatarPath, avatarIcon); //записывыаем файл(куда? что?)
    await fs.Promises.copyFile(avatarPath, finalAvatarPath) //копируем(откуда? куда?)
    await fs.Promises.unlink(avatarPath) //очищаем tmp
    return avatarName;
}

module.exports = {createAvatar};
